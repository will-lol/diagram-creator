import { useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';
import { useChatStore } from '@/store/chat-store';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChatMessage } from '@/components/chat/chat-message';

export function ChatWindow() {
  const { chats, activeChatId, addMessage } = useChatStore();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find((c) => c.id === activeChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const handleSend = () => {
    if (!input.trim() || !activeChatId) return;

    addMessage(activeChatId, input, 'user');
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      addMessage(activeChatId, 'This is a simulated response.', 'assistant');
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!activeChat) {
    return (
      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
        Select a chat or create a new one to start.
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-background">
      <div className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-2xl space-y-4">
          {activeChat.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="border-t bg-background p-4">
        <div className="mx-auto max-w-2xl">
          <div className="relative flex items-end gap-2 border bg-background p-2 focus-within:ring-1 focus-within:ring-ring">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="min-h-[60px] w-full resize-none border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button size="icon" onClick={handleSend} disabled={!input.trim()}>
              <SendHorizontal className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
