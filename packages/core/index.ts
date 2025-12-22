import { z } from "zod";
import { streamText, tool, type LanguageModel, ModelMessage, TextPart, FilePart, ImagePart } from "ai";
import type { SessionUpdate, ToolCallUpdate, Plan } from "./protocol";
import { ContentBlock, EmbeddedResourceResource } from "@agentclientprotocol/sdk";
import { CETZ_VERSION, CETZ_PLOT_VERSION } from "cetz-versions";

export const VERSIONS = {
  cetz: CETZ_VERSION,
  cetzPlot: CETZ_PLOT_VERSION,
};

// Re-export protocol types
export * from "./protocol";

// --- Tools ---

export const agentTools = {
  weather: z.object({
    location: z.string().describe("The location to get weather for"),
  }),
};

// --- Agent Execution Types ---

export type AgentInput = {
  messages: ModelMessage[];
};

export type AgentConfig = {
  model: LanguageModel;
  systemPrompt?: string;
  tools?: Record<string, any>;
};

/**
 * Interface for receiving updates from the agent
 */
export interface AgentCallbacks {
  onUpdate: (update: SessionUpdate) => void;
}

async function getWeather(input: { location: string }) {
  return `Weather in ${input.location} is sunny`;
}

/**
 * Runs the agent with streaming support, emitting ACP-compatible updates.
 * Implements a manual loop to handle multi-step execution with full protocol visibility.
 */
export async function runAgentStreaming(input: ModelMessage[], model: LanguageModel, onUpdate?: (update: SessionUpdate) => void) {
  const messages = [...input];

  const system_prompt = `# Role & Objective
  You are the **CeTZ Diagram Architect**, a specialized code generator for the Typst typesetting system. Your goal is to convert natural language or image inputs into error-free, compilable \`cetz\` visualization code.

  # Critical Workflow
  1. **Analyze & Research (Internal + Tool):**
     - **Classify:** Is this a **Chart/Plot** (requires \`cetz-plot\`) or a **General Diagram** (standard \`cetz\`)?
     - **Research:** If the request involves complex geometry, advanced plotting features, or you are unsure of a function signature, you **MUST** first call \`searchCetzExamples\`. Use the results to guide your syntax.
     - **Plan:** Determine coordinate strategy (anchors vs. relative).

  2. **Draft & Verify (Tool Use):**
     - Generate code using the **Exact Boilerplates** below.
     - Call \`renderAndVerify\` immediately.
     - *Self-Correction:* If the render has layout/syntax errors, iterate internally until perfect.

  3. **Final Output:**
     - Output **ONLY** the final \` \`\`\`typ \` code block.

  # Library Selection Standards
  - **Charts & Plots:** You **MUST** use \`@preview/cetz-plot\` for line graphs, bar charts, scatter plots, and axes.
  - **General Diagrams:** Use standard \`@preview/cetz\` for trees, flowcharts, and geometric shapes.

  # Exact Boilerplates
  **Instructions:** Use the provided version numbers. Do not deviate.

  ### CASE A: General Diagrams (No Plots)
  \`\`\`typ
  #import "@preview/cetz:${CETZ_VERSION}"

  #cetz.canvas({
    import cetz.draw: *
    // [Insert Diagram Code Here]
  })
  \`\`\`

  ### CASE B: Charts & Plots (REQUIRED for data/axes)
  \`\`\`typ
  #import "@preview/cetz:${CETZ_VERSION}"
  #import "@preview/cetz-plot:${CETZ_PLOT_VERSION}"

  #cetz.canvas({
    import cetz.draw: *
    import cetz-plot: *

    // [Insert Plot Code Here]
    // Example: plot.plot(size: (2, 2), axis-style: "school-book", ...)
  })
  \`\`\`

  # Output Constraints

  1. **The Silent Rule:** Your response must contain **NOTHING** but the code block. No intro, no outro, no markdown headers.
  2. **Failure Handling:** If 3 verification attempts fail, you may break silence to explain the limitation.
  3. **No Hallucinations:** Use \`searchCetzExamples\` to verify capabilities rather than guessing.`;

  while (true) {
    const result = streamText({
      model,
      messages,
      system: system_prompt,
      tools: {
        renderAndVerify: tool(),
        searchCetzExamples: tool(),
      },
    });

    // Stream the response (only necessary for providing updates to the user)
    for await (const chunk of result.fullStream) {
      if (chunk.type === "text-delta") {
        process.stdout.write(chunk.text);
      }

      if (chunk.type === "tool-call") {
        console.log("\\nCalling tool:", chunk.toolName);
      }
    }

    // Add LLM generated messages to the message history
    const responseMessages = (await result.response).messages;
    messages.push(...responseMessages);

    const finishReason = await result.finishReason;

    if (finishReason === "tool-calls") {
      const toolCalls = await result.toolCalls;

      // Handle all tool call execution here
      for (const toolCall of toolCalls) {
        if (toolCall.toolName === "getWeather") {
          const toolOutput = await getWeather(toolCall.input as any);
          messages.push({
            role: "tool",
            content: [
              {
                toolName: toolCall.toolName,
                toolCallId: toolCall.toolCallId,
                type: "tool-result",
                output: { type: "text", value: toolOutput }, // update depending on the tool's output format
              },
            ],
          });
        }
        // Handle other tool calls
      }
    } else {
      // Exit the loop when the model doesn't request to use any more tools
      console.log("\\n\\nFinal message history:");
      console.dir(messages, { depth: null });
      break;
    }
  }
  // const tools = config.tools || {};
  // let currentMessages: CoreMessage[] = [...input.messages];
  // const maxSteps = 10;
  // let stepCount = 0;
  // while (stepCount < maxSteps) {
  //   stepCount++;
  //   const stream = streamText({
  //     model: config.model,
  //     system: config.systemPrompt,
  //     messages: currentMessages,
  //     tools: tools,
  //   });
  //   let fullText = "";
  //   const toolCalls: any[] = [];
  //   for await (const part of stream.fullStream) {
  //     switch (part.type) {
  //         case 'text-delta':
  //             // @ts-ignore
  //             fullText += part.textDelta;
  //             callbacks?.onUpdate({
  //                 sessionUpdate: "agent_message_chunk",
  //                 content: {
  //                     type: "text",
  //                     // @ts-ignore
  //                     text: part.textDelta
  //                 }
  //             });
  //             break;
  //         case 'tool-call':
  //             toolCalls.push(part);
  //             callbacks?.onUpdate({
  //                 sessionUpdate: "tool_call",
  //                 toolCallId: part.toolCallId,
  //                 title: `Calling tool: ${part.toolName}`,
  //                 kind: "execute",
  //                 status: "pending"
  //             });
  //             break;
  //         case 'error':
  //             console.error("Stream error:", part.error);
  //             break;
  //     }
  //   }
  //   // Append the assistant's response (text and tool calls) to history
  //   // We construct the CoreMessage content array manually to match AI SDK's expectations
  //   const assistantContent: any[] = [];
  //   if (fullText) {
  //       assistantContent.push({ type: "text", text: fullText });
  //   }
  //   for (const tc of toolCalls) {
  //       assistantContent.push({
  //           type: "tool-call",
  //           toolCallId: tc.toolCallId,
  //           toolName: tc.toolName,
  //           args: tc.args
  //       });
  //   }
  //   currentMessages.push({
  //       role: 'assistant',
  //       content: assistantContent
  //   });
  //   // If no tool calls, we are done
  //   if (toolCalls.length === 0) {
  //       break;
  //   }
  //   // Execute tools manually
  //   const toolResults = await Promise.all(toolCalls.map(async (tc) => {
  //       let result: any;
  //       try {
  //           const tool = tools[tc.toolName];
  //           if (tool && tool.execute) {
  //               result = await tool.execute(tc.args);
  //           } else {
  //               result = { error: `Tool ${tc.toolName} not found` };
  //           }
  //       } catch (error: any) {
  //           result = { error: error.message };
  //       }
  //       // Notify completed
  //       callbacks?.onUpdate({
  //           sessionUpdate: "tool_call_update",
  //           toolCallId: tc.toolCallId,
  //           status: "completed",
  //           content: [{
  //               type: "content",
  //               content: {
  //                   type: "text",
  //                   text: JSON.stringify(result)
  //               }
  //           }]
  //       });
  //       return {
  //           type: "tool-result",
  //           toolCallId: tc.toolCallId,
  //           toolName: tc.toolName,
  //           result: result
  //       };
  //   }));
  //   currentMessages.push({
  //       role: 'tool',
  //       content: toolResults as any
  //   });
  // }
  // return { messages: currentMessages };
}
