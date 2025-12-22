import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatState {
  activeChatId: string | null;
  selectChat: (id: string | null) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      activeChatId: null,
      selectChat: (id) => set({ activeChatId: id }),
    }),
    {
      name: 'chat-ui-storage', // Changed name to avoid conflict/loading old big state
    }
  )
);
