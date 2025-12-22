import { describe, it, expect } from "vitest";
import { runAgentStreaming } from "./index";
import { MockLanguageModelV2 } from "ai/test";

describe("Agent Core", () => {
  it("should respond to a basic prompt using a mock model", async () => {
    const mockModel = new MockLanguageModelV2({
        defaultObjectGenerationMode: "json",
        doStream: async () => {
            return {
                stream: new ReadableStream({
                    start(controller) {
                        controller.enqueue({ type: "text-delta", textDelta: "Hello" });
                        controller.enqueue({ type: "text-delta", textDelta: ", world!" });
                        controller.enqueue({ type: "finish", finishReason: "stop", usage: { promptTokens: 0, completionTokens: 0 } });
                        controller.close();
                    }
                }),
                rawCall: { rawPrompt: null, rawSettings: {} },
                warnings: [],
            }
        }
    });

    const updates: any[] = [];
    const result = await runAgentStreaming(
      { messages: [{ role: 'user', content: "Hello, world!" }] },
      { model: mockModel },
      { onUpdate: (u) => updates.push(u) }
    );

    expect(result).toBeDefined();
    // Verify the assistant message was added
    const lastMsg = result.messages[result.messages.length - 1];
    expect(lastMsg.role).toBe('assistant');
    // Content can be array or string depending on how it was constructed
    // Our implementation constructs array of parts
    expect(lastMsg.content).toEqual([{ type: 'text', text: "Hello, world!" }]);
    
    expect(updates.length).toBeGreaterThan(0);
    expect(updates[0].sessionUpdate).toBe("agent_message_chunk");
  });
});
