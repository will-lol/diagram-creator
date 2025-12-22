import { z } from "zod";

// --- Primitives ---

export const SessionIdSchema = z.string().describe("Unique identifier for a session");
export type SessionId = z.infer<typeof SessionIdSchema>;

export const ToolCallIdSchema = z.string();
export type ToolCallId = z.infer<typeof ToolCallIdSchema>;

// --- Content Blocks ---

export const ContentBlockSchema = z.union([
  z.object({
    type: z.literal("text"),
    text: z.string(),
  }),
  z.object({
    type: z.literal("image"),
    data: z.string(), // Base64
    mimeType: z.string(),
  }),
  z.object({
    type: z.literal("resource"),
    resource: z.object({
      uri: z.string(),
      mimeType: z.string().optional(),
      text: z.string().optional(),
      blob: z.string().optional(), // Base64
    }),
  }),
]);
export type ContentBlock = z.infer<typeof ContentBlockSchema>;

// --- Agent Plan ---

export const PlanEntryStatusSchema = z.enum(["pending", "in_progress", "completed"]);
export type PlanEntryStatus = z.infer<typeof PlanEntryStatusSchema>;

export const PlanEntrySchema = z.object({
  content: z.string(),
  priority: z.enum(["high", "medium", "low"]),
  status: PlanEntryStatusSchema,
});
export type PlanEntry = z.infer<typeof PlanEntrySchema>;

export const PlanSchema = z.object({
  entries: z.array(PlanEntrySchema),
});
export type Plan = z.infer<typeof PlanSchema>;

// --- Tool Calls ---

export const ToolCallStatusSchema = z.enum(["pending", "in_progress", "completed", "failed"]);
export type ToolCallStatus = z.infer<typeof ToolCallStatusSchema>;

export const ToolCallLocationSchema = z.object({
  path: z.string(),
  line: z.number().optional(),
});
export type ToolCallLocation = z.infer<typeof ToolCallLocationSchema>;

export const ToolCallContentSchema = z.union([
    z.object({
        type: z.literal("content"),
        content: ContentBlockSchema
    }),
    z.object({
        type: z.literal("diff"),
        path: z.string(),
        oldText: z.string().nullable(),
        newText: z.string()
    }),
    z.object({
        type: z.literal("terminal"),
        terminalId: z.string()
    })
]);
export type ToolCallContent = z.infer<typeof ToolCallContentSchema>;

export const ToolCallUpdateSchema = z.object({
  toolCallId: ToolCallIdSchema,
  title: z.string().optional(),
  kind: z.string().optional(), // "read", "edit", "execute", etc.
  status: ToolCallStatusSchema.optional(),
  content: z.array(ToolCallContentSchema).optional(),
  locations: z.array(ToolCallLocationSchema).optional(),
  rawInput: z.record(z.any()).optional(),
  rawOutput: z.record(z.any()).optional(),
});
export type ToolCallUpdate = z.infer<typeof ToolCallUpdateSchema>;

// --- Session Updates (Notifications) ---

export const SessionUpdateSchema = z.union([
  z.object({
    sessionUpdate: z.literal("plan"),
    entries: z.array(PlanEntrySchema),
  }),
  z.object({
    sessionUpdate: z.literal("agent_message_chunk"),
    content: ContentBlockSchema,
  }),
  z.object({
    sessionUpdate: z.literal("tool_call"),
    toolCallId: ToolCallIdSchema,
    title: z.string(),
    kind: z.string().optional(),
    status: ToolCallStatusSchema,
  }),
  z.object({
      sessionUpdate: z.literal("tool_call_update"),
      toolCallId: ToolCallIdSchema,
      title: z.string().optional(),
      status: ToolCallStatusSchema.optional(),
      content: z.array(ToolCallContentSchema).optional(),
  })
]);
export type SessionUpdate = z.infer<typeof SessionUpdateSchema>;
