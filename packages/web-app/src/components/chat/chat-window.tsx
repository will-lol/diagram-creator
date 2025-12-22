import { useRef, useEffect } from 'react';
import { useChatStore } from '@/store/chat-store';
import { ChatMessage } from '@/components/chat/chat-message';
import ChatInput, { ChatInputProps } from './input/chat-input';
import { useChat, useCreateChat, useSendMessage } from '@/hooks/use-chat-query';

export function ChatWindow() {
  const { activeChatId, selectChat } = useChatStore();
  const { data: activeChat } = useChat(activeChatId);

  const createChatMutation = useCreateChat();
  const sendMessageMutation = useSendMessage();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const handleSubmit: ChatInputProps['onSubmit'] = async (data) => {
    const prompt = data.value.prompt.trim();
    if (prompt === '' && Object.keys(data.value.attachments).length === 0)
      return;

    data.formApi.reset();

    let chatId = activeChatId;

    if (!chatId) {
      chatId = await createChatMutation.mutateAsync('New Chat');
      selectChat(chatId);
    }

    // Convert Record<string, File> to File[]
    const attachments = Object.values(data.value.attachments);

    await sendMessageMutation.mutateAsync({
      chatId,
      content: prompt,
      role: 'user',
      attachments,
    });

    // Simulate bot response
    setTimeout(() => {
      sendMessageMutation.mutate({
        chatId: chatId!,
        content: 'This is a simulated response.',
        role: 'assistant',
      });
    }, 1000);
  };

  return (
    <div className="flex h-full w-full flex-col bg-background">
      <div className="flex-1 overflow-auto p-1">
        <div className="mx-auto max-w-2xl space-y-4">
          {activeChat &&
            activeChat.messages &&
            activeChat.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="bg-background p-1">
        <div className="mx-auto max-w-2xl">
          <ChatInput
            onSubmit={handleSubmit}
            history={undefined} // Types mismatch with simple string/file arrays, leaving undefined for now
          />
        </div>
      </div>
    </div>
  );
}
