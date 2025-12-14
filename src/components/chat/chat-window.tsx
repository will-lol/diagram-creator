import { useRef, useEffect } from 'react';
import { useChatStore } from '@/store/chat-store';
import { ChatMessage } from '@/components/chat/chat-message';
import ChatInput, { ChatInputType, ChatInputProps } from './input/chat-input';

export function ChatWindow() {
  const { chats, activeChatId, addMessage, createChat } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const handleSubmit: ChatInputProps['onSubmit'] = (data) => {
    let chatId = activeChatId;
    data.formApi.reset();

    if (data.value.prompt.trim() === '') return;
    if (!chatId) {
      chatId = createChat();
    }

    addMessage(chatId, data.value.prompt, 'user');

    // Simulate bot response
    setTimeout(() => {
      addMessage(chatId, 'This is a simulated response.', 'assistant');
    }, 1000);
  };

  return (
    <div className="flex h-full w-full flex-col bg-background">
      <div className="flex-1 overflow-auto p-1">
        <div className="mx-auto max-w-2xl space-y-4">
          {activeChat &&
            activeChat.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="bg-background p-1">
        <div className="mx-auto max-w-2xl">
          <ChatInput onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
