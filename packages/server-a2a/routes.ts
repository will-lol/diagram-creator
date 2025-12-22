// A2A Routes definition
import { Hono } from "hono";

export const agentRoutes = new Hono();

agentRoutes.post("/v1/agent", (c) => {
  return c.json({ status: "ok" });
});
