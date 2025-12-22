import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { runAgent } from "@diagram-agent/core";

const app = new Hono();

app.post("/task", async (c) => {
  const body = await c.req.json();
  const result = await runAgent({ prompt: body.prompt || "" });
  return c.json(result);
});

serve(app);
