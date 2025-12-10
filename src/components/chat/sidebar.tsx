import {
  Plus,
  MessageSquare,
  Trash2,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { useChatStore } from '@/store/chat-store';
import { useUiStore } from '@/store/ui-store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useHotkeys } from 'react-hotkeys-hook';
import { Kbd } from '@/components/ui/kbd';
import { usePlatform } from '@/hooks/use-platform';

export function Sidebar() {
  const { chats, activeChatId, createChat, selectChat, deleteChat } =
    useChatStore();
  const { isSidebarCollapsed, toggleSidebar } = useUiStore();
  const platform = usePlatform();
  const isMac = platform === 'macos';

  useHotkeys('mod+backslash', () => toggleSidebar(), {
    preventDefault: true,
    keydown: true,
  });
  useHotkeys('mod+shift+o', () => createChat(), {
    preventDefault: true,
    keydown: true,
  });

  return (
    <div
      className={cn(
        'bg-sidebar text-sidebar-foreground',
        'fixed inset-y-0 left-0 z-50 h-full w-60 max-w-full border-r md:relative md:w-64',
        isSidebarCollapsed
          ? 'w-auto max-w-min -translate-x-full md:translate-x-0'
          : 'translate-x-0',
        'flex flex-col gap-1 p-1'
      )}
    >
      <div className={cn('flex items-center justify-end md:justify-start')}>
        <Button
          variant="secondary"
          size="default"
          className={cn(
            'h-10 p-0',
            !isSidebarCollapsed && 'aspect-auto w-full justify-between pr-2'
          )}
          onClick={toggleSidebar}
        >
          <div className="flex aspect-square h-full w-auto items-center justify-center">
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <>
                <PanelLeftClose className="h-4 w-4" />
              </>
            )}
          </div>
          {!isSidebarCollapsed && (
            <div className="hidden items-center gap-1 md:flex">
              <Kbd>
                <span className={cn('text-xs', isMac && 'font-sans')}>
                  {isMac ? '⌘' : 'Ctrl'}
                </span>
              </Kbd>
              <Kbd>
                <span className="text-xs">\</span>
              </Kbd>
            </div>
          )}
        </Button>
      </div>

      <Button
        onClick={createChat}
        className={cn(
          'h-10 w-full justify-start',
          isSidebarCollapsed
            ? 'aspect-square w-auto'
            : 'justify-between gap-0 py-0 pr-2 pl-0'
        )}
        variant="outline"
        size={isSidebarCollapsed ? 'icon' : 'default'}
      >
        <div className="flex h-full items-center gap-2">
          <div
            className={cn(
              'flex aspect-square h-full w-auto items-center justify-center'
            )}
          >
            <Plus className={cn('h-4 w-4')} />
          </div>
          {!isSidebarCollapsed && 'New Chat'}
        </div>

        {!isSidebarCollapsed && (
          <div className="hidden gap-1 md:inline-flex">
            <Kbd>
              <span className={cn('text-xs', isMac && 'font-sans')}>
                {isMac ? '⌘' : 'Ctrl'}
              </span>
            </Kbd>
            <Kbd>
              <span className="font-sans text-xs">⇧</span>
            </Kbd>
            <Kbd>
              <span className="text-xs">O</span>
            </Kbd>
          </div>
        )}
      </Button>

      <div className="flex-1 overflow-auto">
        <div className="space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                'group flex w-full items-center justify-between text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                activeChatId === chat.id
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'transparent',
                isSidebarCollapsed && 'aspect-square h-auto justify-center px-0'
              )}
            >
              <button
                onClick={() => selectChat(chat.id)}
                className={
                  'flex h-10 w-full items-center overflow-hidden text-left'
                }
              >
                <div className="flex aspect-square h-full w-auto shrink-0 items-center justify-center">
                  <MessageSquare className={cn('h-4 w-4')} />
                </div>
                {!isSidebarCollapsed && (
                  <span className="flex-1 truncate pl-2">{chat.title}</span>
                )}
              </button>
              {!isSidebarCollapsed && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="hidden aspect-square h-full p-1 group-hover:block hover:bg-background"
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
          ))}
          {chats.length === 0 && !isSidebarCollapsed && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No chats yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
