import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@/store/chat-store';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex w-full items-start gap-3 p-4',
        message.role === 'user' ? 'bg-muted' : 'bg-transparent'
      )}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center border',
          message.role === 'user'
            ? 'bg-background text-foreground'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {message.role === 'user' ? (
          <User className="h-5 w-5" />
        ) : (
          <Bot className="h-5 w-5" />
        )}
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="prose max-w-none text-sm leading-relaxed break-words text-foreground dark:prose-invert">
          {message.content}
        </div>
      </div>
    </div>
  );
}
