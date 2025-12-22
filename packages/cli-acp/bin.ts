#!/usr/bin/env node
import { cac } from "cac";
import { createInterface } from "readline";
import { runAgent } from "@diagram-agent/core";

const cli = cac("acp");

cli.command("", "Run the Agent Client Protocol adapter").action(async () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  });

  rl.on("line", async (line) => {
    try {
      if (!line.trim()) return;
      const msg = JSON.parse(line);
      // specific logic for ACP would go here
      // For now we just echo or call core
      if (msg.method === "initialize") {
        console.log(
          JSON.stringify({
            jsonrpc: "2.0",
            id: msg.id,
            result: { name: "diagram-agent", version: "0.1.0" },
          }),
        );
      } else if (msg.method === "performAction") {
        // mock call
        const result = await runAgent({ prompt: "mock" });
        console.log(JSON.stringify({ jsonrpc: "2.0", id: msg.id, result }));
      }
    } catch (e) {
      console.error("Failed to parse line", e);
    }
  });
});

cli.help();
cli.parse();
