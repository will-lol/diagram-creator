import { Bot, User, FileIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DBMessage } from '@/lib/db';
import { useFileUrl } from '@/hooks/use-chat-query';

interface ChatMessageProps {
  message: DBMessage;
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
        <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed break-words text-foreground">
          {message.content}
        </div>

        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.attachments.map((attachment) => (
              <AttachmentPreview key={attachment.id} attachment={attachment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AttachmentPreview({
  attachment,
}: {
  attachment: { id: string; originalName: string; type: string };
}) {
  const url = useFileUrl(attachment.id);

  if (!url) {
    return (
      <div className="flex items-center gap-2 rounded border bg-background p-2 text-xs">
        <FileIcon className="h-4 w-4 animate-pulse" />
        <span>Loading {attachment.originalName}...</span>
      </div>
    );
  }

  const isImage = attachment.type.startsWith('image/');

  if (isImage) {
    return (
      <div className="group relative overflow-hidden rounded-md border bg-background">
        <img
          src={url}
          alt={attachment.originalName}
          className="h-20 w-auto object-cover transition-transform group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <a
      href={url}
      download={attachment.originalName}
      className="flex items-center gap-2 rounded border bg-background p-2 text-xs hover:bg-muted"
    >
      <FileIcon className="h-4 w-4" />
      <span>{attachment.originalName}</span>
    </a>
  );
}
