import { createFileRoute } from '@tanstack/react-router';
import { Sidebar } from '@/components/chat/sidebar';
import { ChatWindow } from '@/components/chat/chat-window';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { getPlatform } from '@/hooks/use-platform';
import { getIsomorphicCookies } from '@/lib/utils';

export const Route = createFileRoute('/')({
  component: App,
  beforeLoad: () => {
    return {
      platform: getPlatform(),
    };
  },
});

function App() {
  const openCookie = getIsomorphicCookies()['sidebar_state'];
  const defaultOpen = openCookie === 'true';
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
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
