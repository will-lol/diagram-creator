import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Plus,
  MessageSquare,
  Trash2,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { useChatStore } from '@/store/chat-store';
import { cn } from '@/lib/utils';
import { useHotkeys } from 'react-hotkeys-hook';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { usePlatform } from '@/hooks/use-platform';

export function Sidebar() {
  const { chats, activeChatId, createChat, selectChat, deleteChat } =
    useChatStore();
  const { toggleSidebar, open, isMobile } = useSidebar();
  const platform = usePlatform();
  const isMac = platform === 'macos';

  // Toggle Sidebar Hotkey
  useHotkeys('mod+backslash', () => toggleSidebar(), {
    enableOnFormTags: true,
    enableOnContentEditable: true,
    preventDefault: true,
  });

  // New Chat Hotkey
  useHotkeys('mod+shift+o', () => createChat(), {
    enableOnFormTags: true,
    enableOnContentEditable: true,
    preventDefault: true,
  });

  return (
    <ShadcnSidebar collapsible="icon" className="border-r">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="default"
              onClick={toggleSidebar}
              tooltip="Toggle Sidebar"
              className="justify-between"
            >
              <div className="flex aspect-square size-4 items-center justify-center">
                {open ? (
                  <PanelLeftClose className="size-4" />
                ) : (
                  <PanelLeftOpen className="size-4" />
                )}
              </div>
              <span className="sr-only">Toggle Sidebar</span>
              {open && !isMobile && (
                <div className="flex items-center gap-1">
                  <KbdGroup>
                    <Kbd>
                      <span className={cn('text-xs', isMac && 'font-sans')}>
                        {isMac ? '⌘' : 'Ctrl'}
                      </span>
                    </Kbd>
                    <Kbd>
                      <span className="text-xs">\</span>
                    </Kbd>
                  </KbdGroup>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={createChat}
              tooltip="New Chat"
              className="justify-between"
              variant={'outline'}
            >
              <div className="flex aspect-square size-4 items-center justify-center">
                <Plus className="size-4" />
              </div>
              <span>New Chat</span>
              {open && !isMobile && (
                <div className="ml-auto flex items-center gap-1">
                  <KbdGroup>
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
                  </KbdGroup>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="pt-0">
          <SidebarMenu>
            {chats.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton
                  isActive={activeChatId === chat.id}
                  onClick={() => selectChat(chat.id)}
                  tooltip={chat.title}
                >
                  <MessageSquare className="size-4" />
                  <span className="truncate">{chat.title}</span>
                </SidebarMenuButton>
                <SidebarMenuAction
                  showOnHover
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  title="Delete Chat"
                >
                  <Trash2 className="size-4" />
                </SidebarMenuAction>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          {chats.length === 0 && open && (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No chats yet.
            </div>
          )}
        </SidebarGroup>
      </SidebarContent>
    </ShadcnSidebar>
  );
}
