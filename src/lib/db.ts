import { DBSchema, openDB, IDBPDatabase } from 'idb';
import { StoredFile, fileStorage } from './storage';

// Re-defining types locally to decouple from the old store eventually
export type Role = 'user' | 'assistant';

export interface Attachment extends StoredFile {
  // We can extend the base StoredFile with any DB-specific metadata if needed
}

export interface DBChat {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number; // Important for sorting
}

export interface DBMessage {
  id: string;
  chatId: string;
  role: Role;
  content: string;
  createdAt: number;
  attachments?: Attachment[];
}

interface ChatDBSchema extends DBSchema {
  chats: {
    key: string;
    value: DBChat;
    indexes: { 'by-date': number; 'by-created': number };
  };
  messages: {
    key: string;
    value: DBMessage;
    indexes: { 'by-chat': string };
  };
}

const DB_NAME = 'diagram-creator-db';
const DB_VERSION = 3; // Incrementing from the previous file's version 1

export interface ChatDB {
  getChats(): Promise<DBChat[]>;
  getChat(id: string): Promise<DBChat | undefined>;
  createChat(title?: string): Promise<string>;
  updateChatTitle(id: string, title: string): Promise<void>;
  deleteChat(id: string): Promise<void>;
  getMessages(chatId: string): Promise<DBMessage[]>;
  addMessage(message: Omit<DBMessage, 'id' | 'createdAt'>): Promise<string>;
}

class DBService implements ChatDB {
  private dbPromise: Promise<IDBPDatabase<ChatDBSchema>>;

  constructor() {
    this.dbPromise = openDB<ChatDBSchema>(DB_NAME, DB_VERSION, {
      upgrade(db, _oldVersion, _newVersion, transaction) {
        // Create object stores if they don't exist
        if (!db.objectStoreNames.contains('chats')) {
          const chatStore = db.createObjectStore('chats', { keyPath: 'id' });
          chatStore.createIndex('by-date', 'updatedAt');
          chatStore.createIndex('by-created', 'createdAt');
        } else {
          // Upgrade existing store
          const chatStore = transaction.objectStore('chats');
          if (!chatStore.indexNames.contains('by-created')) {
            chatStore.createIndex('by-created', 'createdAt');
          }
        }

        if (!db.objectStoreNames.contains('messages')) {
          const messageStore = db.createObjectStore('messages', {
            keyPath: 'id',
          });
          messageStore.createIndex('by-chat', 'chatId');
        }
      },
    });
  }

  // --- Chats ---

  async getChats(): Promise<DBChat[]> {
    const db = await this.dbPromise;
    // Return chats sorted by creation time (descending)
    return (await db.getAllFromIndex('chats', 'by-created')).reverse();
  }

  async getChat(id: string): Promise<DBChat | undefined> {
    const db = await this.dbPromise;
    return db.get('chats', id);
  }

  async createChat(title: string = 'New Chat'): Promise<string> {
    const db = await this.dbPromise;
    const id = crypto.randomUUID();
    const now = Date.now();

    await db.add('chats', {
      id,
      title,
      createdAt: now,
      updatedAt: now,
    });

    return id;
  }

  async updateChatTitle(id: string, title: string): Promise<void> {
    const db = await this.dbPromise;
    const chat = await db.get('chats', id);
    if (chat) {
      chat.title = title;
      chat.updatedAt = Date.now(); // Also update timestamp
      await db.put('chats', chat);
    }
  }

  async deleteChat(id: string): Promise<void> {
    // 1. Get messages to find files to delete
    const messages = await this.getMessages(id);
    const fileIds: string[] = [];

    for (const msg of messages) {
      if (msg.attachments) {
        for (const att of msg.attachments) {
          fileIds.push(att.id);
        }
      }
    }

    // 2. Delete files from OPFS (non-blocking for UX, but awaited for safety)
    if (fileIds.length > 0) {
      await Promise.all(fileIds.map((fid) => fileStorage.deleteFile(fid)));
    }

    // 3. Delete from IDB
    const db = await this.dbPromise;
    const tx = db.transaction(['chats', 'messages'], 'readwrite');

    // Delete the chat
    await tx.objectStore('chats').delete(id);

    // Delete all messages associated with this chat
    const messageIndex = tx.objectStore('messages').index('by-chat');
    const msgKeys = await messageIndex.getAllKeys(id);

    // We can delete them efficiently
    await Promise.all([
      ...msgKeys.map((msgId) => tx.objectStore('messages').delete(msgId)),
      tx.done,
    ]);
  }

  // --- Messages ---

  async getMessages(chatId: string): Promise<DBMessage[]> {
    const db = await this.dbPromise;
    const messages = await db.getAllFromIndex('messages', 'by-chat', chatId);
    return messages.sort((a, b) => a.createdAt - b.createdAt);
  }

  async addMessage(
    message: Omit<DBMessage, 'id' | 'createdAt'>
  ): Promise<string> {
    const db = await this.dbPromise;
    const id = crypto.randomUUID();
    const now = Date.now();

    const newMessage: DBMessage = {
      ...message,
      id,
      createdAt: now,
    };

    const tx = db.transaction(['chats', 'messages'], 'readwrite');

    // Add message
    await tx.objectStore('messages').add(newMessage);

    // Update chat's "updatedAt"
    const chat = await tx.objectStore('chats').get(message.chatId);
    if (chat) {
      chat.updatedAt = now;
      await tx.objectStore('chats').put(chat);
    }

    await tx.done;
    return id;
  }
}

class ServerDBService implements ChatDB {
  async getChats(): Promise<DBChat[]> {
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getChat(_id: string): Promise<DBChat | undefined> {
    return undefined;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createChat(_title?: string): Promise<string> {
    return 'server-mock-id';
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateChatTitle(_id: string, _title: string): Promise<void> {
    // No-op
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async deleteChat(_id: string): Promise<void> {
    // No-op
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getMessages(_chatId: string): Promise<DBMessage[]> {
    return [];
  }
  async addMessage(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _message: Omit<DBMessage, 'id' | 'createdAt'>
  ): Promise<string> {
    return 'server-mock-id';
  }
}

export const db: ChatDB =
  typeof window === 'undefined' ? new ServerDBService() : new DBService();
