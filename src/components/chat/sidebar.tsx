import {
  Plus,
  MessageSquare,
  Trash2,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useChatStore } from "@/store/chat-store";
import { useUiStore } from "@/store/ui-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useHotkeys } from "react-hotkeys-hook";
import { Kbd } from "@/components/ui/kbd";
import { usePlatform } from "@/hooks/use-platform";

export function Sidebar() {
  const { chats, activeChatId, createChat, selectChat, deleteChat } =
    useChatStore();
  const { isSidebarCollapsed, toggleSidebar } = useUiStore();
  const platform = usePlatform();
  const isMac = platform === "macos";

  useHotkeys("mod+backslash", () => toggleSidebar(), {
    preventDefault: true,
    keydown: true,
  });
  useHotkeys("mod+shift+o", () => createChat(), {
    preventDefault: true,
    keydown: true,
  });

  return (
    <div
      className={cn(
        "bg-sidebar text-sidebar-foreground",
        "fixed inset-y-0 left-0 z-50 h-full max-w-full w-60 md:w-64 border-r md:relative",
        isSidebarCollapsed
          ? "-translate-x-full max-w-min w-auto md:translate-x-0"
          : "translate-x-0",
        "flex flex-col gap-1 p-1",
      )}
    >
      <div className={cn("flex items-center md:justify-start justify-end")}>
        <Button
          variant="secondary"
          size="default"
          className={cn(
            "h-10 p-0",
            !isSidebarCollapsed && "w-full justify-between pr-2 aspect-auto",
          )}
          onClick={toggleSidebar}
        >
          <div className="h-full w-auto aspect-square flex items-center justify-center">
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
                <span className={cn("text-xs", isMac && "font-sans")}>
                  {isMac ? "⌘" : "Ctrl"}
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
          "w-full h-10 justify-start",
          isSidebarCollapsed
            ? "w-auto aspect-square"
            : "pl-0 py-0 pr-2 gap-0 justify-between",
        )}
        variant="outline"
        size={isSidebarCollapsed ? "icon" : "default"}
      >
        <div className="flex items-center h-full gap-2">
          <div
            className={cn(
              "aspect-square h-full w-auto items-center flex justify-center",
            )}
          >
            <Plus className={cn("h-4 w-4")} />
          </div>
          {!isSidebarCollapsed && "New Chat"}
        </div>

        {!isSidebarCollapsed && (
          <div className="hidden md:inline-flex gap-1">
            <Kbd>
              <span className={cn("text-xs", isMac && "font-sans")}>
                {isMac ? "⌘" : "Ctrl"}
              </span>
            </Kbd>
            <Kbd>
              <span className="text-xs font-sans">⇧</span>
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
                "group flex w-full items-center text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground justify-between",
                activeChatId === chat.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "transparent",
                isSidebarCollapsed &&
                  "justify-center aspect-square h-auto px-0",
              )}
            >
              <button
                onClick={() => selectChat(chat.id)}
                className={
                  "flex items-center overflow-hidden h-10 text-left w-full"
                }
              >
                <div className="h-full w-auto aspect-square flex items-center justify-center shrink-0">
                  <MessageSquare className={cn("h-4 w-4")} />
                </div>
                {!isSidebarCollapsed && (
                  <span className="truncate flex-1 pl-2">{chat.title}</span>
                )}
              </button>
              {!isSidebarCollapsed && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="h-full aspect-square hidden p-1 hover:bg-background group-hover:block"
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
