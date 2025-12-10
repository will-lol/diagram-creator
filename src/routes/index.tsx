import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { Sidebar } from '@/components/chat/sidebar';
import { ChatWindow } from '@/components/chat/chat-window';
import { useUiStore } from '@/store/ui-store';
import { PanelLeftOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPlatform } from '@/hooks/use-platform';

export const Route = createFileRoute('/')({
  component: App,
  beforeLoad: () => {
    return {
      platform: getPlatform(),
    };
  },
});

function App() {
  const { toggleSidebar } = useUiStore();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-zinc-950">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex shrink-0 items-center border-b p-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="aspect-square h-10 w-auto md:hidden"
          >
            <PanelLeftOpen className="h-5 w-5" />
          </Button>
        </header>
        <main className="flex-1 overflow-hidden">
          <ChatWindow />
        </main>
      </div>
    </div>
  );
}
