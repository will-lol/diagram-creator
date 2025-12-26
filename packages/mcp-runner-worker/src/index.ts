import { createMcpServer } from "diagram-creator-mcp-server-web";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { JSONRPCMessage } from "@modelcontextprotocol/sdk/types.js";

class WorkerServerTransport implements Transport {
  onmessage?: (message: JSONRPCMessage) => void;
  onclose?: () => void;
  onerror?: (error: Error) => void;

  constructor() {
    self.onmessage = (event: MessageEvent) => {
      if (this.onmessage) {
        try {
            // Assuming the message is already a JSON object or parsed
            this.onmessage(event.data);
        } catch (error) {
            console.error("Error handling message:", error);
            if (this.onerror) {
                this.onerror(error as Error);
            }
        }
      }
    };
  }

  async start(): Promise<void> {
    // Ready to receive messages
  }

  async send(message: JSONRPCMessage): Promise<void> {
    self.postMessage(message);
  }

  async close(): Promise<void> {
    self.close();
  }
}

async function main() {
  const server = await createMcpServer();
  const transport = new WorkerServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
