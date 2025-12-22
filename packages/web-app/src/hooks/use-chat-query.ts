import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db, Role } from '@/lib/db';
import { fileStorage } from '@/lib/storage';

export const chatKeys = {
  all: ['chats'] as const,
  lists: () => [...chatKeys.all, 'list'] as const,
  detail: (id: string) => [...chatKeys.all, 'detail', id] as const,
  messages: (chatId: string) =>
    [...chatKeys.detail(chatId), 'messages'] as const,
};

// --- Queries ---

export function useChats() {
  return useQuery({
    queryKey: chatKeys.lists(),
    queryFn: () => db.getChats(),
    staleTime: 0, // Ensure client refetches from IDB immediately after SSR mock
  });
}

export function useChat(chatId: string | null) {
  return useQuery({
    queryKey: chatKeys.detail(chatId || ''),
    queryFn: async () => {
      if (!chatId) return null;
      const chat = await db.getChat(chatId);
      if (!chat) return null;
      const messages = await db.getMessages(chatId);
      return { ...chat, messages };
    },
    enabled: !!chatId,
    staleTime: 0, // Ensure client refetches from IDB immediately after SSR mock
  });
}

export function useFileUrl(fileId?: string) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!fileId) {
      setUrl(null);
      return;
    }

    let active = true;
    let objectUrl: string | null = null;

    fileStorage.getFileUrl(fileId).then((u) => {
      if (active) {
        objectUrl = u;
        setUrl(u);
      } else {
        URL.revokeObjectURL(u);
      }
    });

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [fileId]);

  return url;
}

// --- Mutations ---

export function useCreateChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title?: string) => db.createChat(title || 'New Chat'),
    onSuccess: (newChatId) => {
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() });
      return newChatId;
    },
  });
}

export function useDeleteChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (chatId: string) => db.deleteChat(chatId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chatKeys.all });
    },
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      chatId,
      role,
      content,
      attachments = [],
    }: {
      chatId: string;
      role: Role;
      content: string;
      attachments?: File[];
    }) => {
      // 1. Upload files to OPFS
      const storedAttachments = await Promise.all(
        attachments.map((file) => fileStorage.saveFile(file))
      );

      // 2. Save message to IDB
      await db.addMessage({
        chatId,
        role,
        content,
        attachments: storedAttachments,
      });

      return chatId;
    },
    onSuccess: (chatId) => {
      queryClient.invalidateQueries({ queryKey: chatKeys.detail(chatId) });
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() }); // To update "last updated" order
    },
  });
}

export function useUpdateChatTitle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) =>
      db.updateChatTitle(id, title),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: chatKeys.lists() });
      queryClient.invalidateQueries({ queryKey: chatKeys.detail(id) });
    },
  });
}
