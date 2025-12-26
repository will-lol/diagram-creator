import express from "express";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { createMcpServer } from "diagram-creator-mcp-server-node";

async function main() {
  const app = express();
  const server = await createMcpServer();
  const transports = new Map<string, SSEServerTransport>();

  app.get("/sse", async (req, res) => {
    console.log("New SSE connection");
    const transport = new SSEServerTransport("/messages", res);
    
    await server.connect(transport);
    
    // @ts-ignore - Assuming sessionId exists on transport or we need a way to identify it
    // If it's private, we might need a workaround or verify SDK version
    const sessionId = (transport as any).sessionId;
    
    if (sessionId) {
      transports.set(sessionId, transport);
    } else {
        console.error("No session ID generated for transport");
    }

    req.on("close", () => {
      console.log("SSE connection closed");
      if (sessionId) {
        transports.delete(sessionId);
      }
      // Clean up if necessary
    });
  });

  app.post("/messages", async (req, res) => {
    const sessionId = req.query.sessionId as string;
    console.log(`Received message for session ${sessionId}`);
    
    const transport = transports.get(sessionId);
    if (!transport) {
      res.status(404).send("Session not found");
      return;
    }

    await transport.handlePostMessage(req, res);
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`MCP HTTP Server listening on port ${port}`);
  });
}

main().catch(console.error);
