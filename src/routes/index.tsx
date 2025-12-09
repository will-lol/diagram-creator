import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Sidebar } from "@/components/chat/sidebar";
import { ChatWindow } from "@/components/chat/chat-window";
import { useUiStore } from "@/store/ui-store";
import { PanelLeftOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPlatform } from "@/hooks/use-platform";

export const Route = createFileRoute("/")({
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
        <header className="flex items-center border-b shrink-0 p-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden aspect-square w-auto h-10"
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
