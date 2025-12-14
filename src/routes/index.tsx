import { createFileRoute } from '@tanstack/react-router';
import { Sidebar } from '@/components/chat/sidebar';
import { ChatWindow } from '@/components/chat/chat-window';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
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
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar />
      <SidebarInset className="flex h-screen flex-col overflow-hidden">
        <header className="flex shrink-0 items-center border-b p-1 md:hidden">
          <SidebarTrigger />
        </header>
        <main className="flex-1 overflow-hidden">
          <ChatWindow />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
