import { useState } from 'react';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { Plus, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useChatStore } from '@/store/chat-store';
import {
  useChats,
  useCreateChat,
  useDeleteChat,
  useUpdateChatTitle,
} from '@/hooks/use-chat-query';
import { cn } from '@/lib/utils';
import { useHotkeys } from 'react-hotkeys-hook';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { usePlatform } from '@/hooks/use-platform';
import { SidebarChatItem } from './sidebar-item';

export function Sidebar() {
  const { activeChatId, selectChat } = useChatStore();
  const { data: chats = [] } = useChats();
  const createChatMutation = useCreateChat();
  const deleteChatMutation = useDeleteChat();
  const updateChatTitleMutation = useUpdateChatTitle();

  const { toggleSidebar, open, isMobile } = useSidebar();
  const platform = usePlatform();
  const isMac = platform === 'macos';

  const handleCreateChat = async () => {
    const newChatId = await createChatMutation.mutateAsync('New Chat');
    selectChat(newChatId);
  };

  const handleDeleteChat = async (id: string) => {
    await deleteChatMutation.mutateAsync(id);
    if (activeChatId === id) {
      selectChat(null);
    }
  };

  const handleRename = async (id: string, newTitle: string) => {
    if (newTitle.trim()) {
      await updateChatTitleMutation.mutateAsync({
        id,
        title: newTitle.trim(),
      });
    }
  };

  // New Chat Hotkey
  useHotkeys('mod+shift+o', () => handleCreateChat(), {
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
                      <span className="text-xs">B</span>
                    </Kbd>
                  </KbdGroup>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleCreateChat}
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
              <SidebarChatItem
                key={chat.id}
                chat={chat}
                isActive={activeChatId === chat.id}
                onSelect={() => selectChat(chat.id)}
                onRename={(newTitle) => handleRename(chat.id, newTitle)}
                onDelete={() => handleDeleteChat(chat.id)}
              />
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
