import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Simple UUID generator using crypto.randomUUID() which is standard in modern browsers/node.

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
};

interface ChatState {
  chats: Chat[];
  activeChatId: string | null;
  createChat: () => void;
  selectChat: (id: string) => void;
  addMessage: (
    chatId: string,
    content: string,
    role: 'user' | 'assistant'
  ) => void;
  deleteChat: (id: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      chats: [],
      activeChatId: null,

      createChat: () => {
        const newChat: Chat = {
          id: crypto.randomUUID(),
          title: 'New Chat',
          messages: [],
          createdAt: Date.now(),
        };
        set((state) => ({
          chats: [newChat, ...state.chats],
          activeChatId: newChat.id,
        }));
      },

      selectChat: (id) => {
        set({ activeChatId: id });
      },

      addMessage: (chatId, content, role) => {
        const newMessage: Message = {
          id: crypto.randomUUID(),
          role,
          content,
          createdAt: Date.now(),
        };

        set((state) => ({
          chats: state.chats.map((chat) => {
            if (chat.id === chatId) {
              // Update title if it's the first user message and title is default
              let title = chat.title;
              if (chat.messages.length === 0 && role === 'user') {
                title =
                  content.slice(0, 30) + (content.length > 30 ? '...' : '');
              }
              return {
                ...chat,
                title,
                messages: [...chat.messages, newMessage],
              };
            }
            return chat;
          }),
        }));
      },

      deleteChat: (id) => {
        set((state) => {
          const newChats = state.chats.filter((c) => c.id !== id);
          return {
            chats: newChats,
            activeChatId:
              state.activeChatId === id
                ? newChats.length > 0
                  ? newChats[0].id
                  : null
                : state.activeChatId,
          };
        });
      },
    }),
    {
      name: 'chat-storage',
    }
  )
);
