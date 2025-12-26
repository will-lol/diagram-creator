import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createTypstCompiler, createTypstRenderer } from "@myriaddreamin/typst.ts";
import { CompileFormatEnum } from "@myriaddreamin/typst.ts/compiler";
import { Resvg } from "@resvg/resvg-js";
import { z } from "zod";
import { searchIndex } from "diagram-creator-mcp-common";
import { create, load, search } from "@orama/orama";

export async function createMcpServer() {
  const server = new McpServer({
    name: "diagram-creator-mcp",
    version: "1.0.0",
  });

  const db = create({
    schema: {
      id: "string",
      description: "string",
      content: "string",
      author: "string",
    },
  });
  load(db, searchIndex);

  const searchInputSchema = z.object({
    query: z.string().describe("Search query for Cetz examples"),
  });

  server.registerTool(
    "search_cetz_examples",
    {
      description: "Search query for Cetz examples",
      inputSchema: searchInputSchema,
    },
    async ({ query }) => {
      const searchResult = await search(db, {
        term: query,
        limit: 5,
      });

      return {
        content: searchResult.hits.map((hit) => {
          const doc = hit.document as any;
          return {
            type: "text",
            text: `File: ${doc.id}\nDescription: ${doc.description}\n\n${doc.content}`,
          };
        }),
      };
    },
  );

  const compiler = createTypstCompiler();

  const renderer = createTypstRenderer();
  await Promise.all([compiler.init(), renderer.init()]);

  const compileSchema = z.object({
    source: z.string().describe("Typst source code to compile"),
  });

  server.registerTool(
    "compile_typst",
    {
      description: "Typst source code to compile",
      inputSchema: compileSchema,
    },
    async ({ source }) => {
      const mainFilePath = "/main.typ";
      compiler.addSource(mainFilePath, source);

      const compileResult = await compiler.compile({
        mainFilePath,
        format: CompileFormatEnum.vector,
        diagnostics: "full",
      });

      const errors: NonNullable<typeof compileResult.diagnostics> = [];
      const warnings: NonNullable<typeof compileResult.diagnostics> = [];

      if (compileResult.diagnostics) {
        errors.push(...compileResult.diagnostics.filter((d) => d.severity === "error"));
        warnings.push(...compileResult.diagnostics.filter((d) => d.severity === "warning"));
      }

      let diagnosticsMessage = "";
      if (compileResult.diagnostics && compileResult.diagnostics?.length > 0) {
        diagnosticsMessage = diagnosticsMessage.concat("## Diagnostics:\n");
        if (errors.length > 0) {
          diagnosticsMessage = diagnosticsMessage.concat(
            `### Errors:
${errors.reduce((acc, curr) => acc + "\n" + curr.message + " at " + curr.range, "")}
`,
          );
        }
        if (warnings.length > 0) {
          diagnosticsMessage = diagnosticsMessage.concat(
            `### Warnings:
${warnings.reduce((acc, curr) => acc + "\n" + curr.message + " at " + curr.range, "")}
`,
          );
        }
      }

      if (errors.length > 0 || !compileResult.result) {
        return {
          content: [
            {
              type: "text",
              text: `Unable to compile your diagram.`,
            },
            {
              type: "text",
              text: diagnosticsMessage,
            },
          ],
        };
      }

      const artifact = compileResult.result;
      const svg = renderer.renderSvg({
        format: "vector",
        artifactContent: artifact,
      });

      const resvg = new Resvg(await svg, {
        fitTo: { mode: "original" },
        background: "#fff",
      });

      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();
      const pngUint8ArrayBuf = new Uint8Array(pngBuffer);

      return {
        content: [
          {
            type: "image",
            mimeType: "image/png",
            // TODO: Ensure this works in browser environment
            data: pngUint8ArrayBuf.toBase64(),
          },
          {
            type: "text",
            text: diagnosticsMessage,
          },
        ],
      };
    },
  );

  return server;
}
