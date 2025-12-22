import { useState, useRef } from 'react';
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from '@/components/ui/sidebar';
import { MessageSquare, Trash2, Pencil, Check } from 'lucide-react';
import { DBChat } from '@/lib/db';

interface SidebarChatItemProps {
  chat: DBChat;
  isActive: boolean;
  onSelect?: () => void;
  onStartEditing?: () => void;
  onStopEditing?: () => void;
  onRename?: (newTitle: string) => void;
  onDelete?: () => void;
}

export function SidebarChatItem({
  chat,
  isActive,
  onSelect = () => {},
  onStartEditing = () => {},
  onStopEditing = () => {},
  onRename = () => {},
  onDelete = () => {},
}: SidebarChatItemProps) {
  const [editTitle, setEditTitle] = useState(chat.title);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExit = () => {
    setIsEditing(false);
    setEditTitle(chat.title);
    onStopEditing();
  };

  const handleStartEditing = () => {
    setIsEditing(true);
    onStartEditing();

    setTimeout(() => {
      if (inputRef.current === null) return;
      inputRef.current.focus();
      inputRef.current.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (editTitle.trim() !== chat.title) {
      onRename(editTitle);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
    if (e.key === 'Escape') {
      handleExit();
    }
  };

  return (
    <SidebarMenuItem className="group/item">
      <SidebarMenuButton
        isActive={isActive}
        onClick={onSelect}
        onDoubleClick={handleStartEditing}
        tooltip={chat.title}
      >
        <MessageSquare className="size-4" />
        <input
          ref={inputRef}
          value={editTitle}
          hidden={!isEditing}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="outline-none"
        />
        <span hidden={isEditing} className="truncate">
          {editTitle}
        </span>
      </SidebarMenuButton>
      <div className="absolute top-0 right-1 hidden gap-1 group-hover/item:flex">
        {isEditing ? (
          <SidebarMenuAction showOnHover onClick={handleSave} title="Confirm">
            <Check className="size-4" />
          </SidebarMenuAction>
        ) : (
          <>
            <SidebarMenuAction
              showOnHover
              onClick={handleStartEditing}
              title="Rename Chat"
              className="mr-7"
            >
              <Pencil className="size-4" />
            </SidebarMenuAction>
            <SidebarMenuAction
              showOnHover
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              title="Delete Chat"
            >
              <Trash2 className="size-4" />
            </SidebarMenuAction>
          </>
        )}
      </div>
    </SidebarMenuItem>
  );
}
