import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { NodeCompiler } from "@myriaddreamin/typst-ts-node-compiler";
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

  const compiler = NodeCompiler.create();

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

      const compileResult = compiler.compile({
        mainFilePath,
      });

      const error = compileResult.takeError();
      const warnings = compileResult.takeWarnings();

      let diagnosticsMessage = "";

      if (error !== null) {
        const diagnostic = compiler.fetchDiagnostics(error);
        diagnosticsMessage = diagnosticsMessage.concat(`### Errors
${diagnostic.reduce((acc, curr) => acc + "\n" + JSON.stringify(curr))}
`);
      }

      if (warnings !== null) {
        const diagnostic = compiler.fetchDiagnostics(warnings);
        diagnosticsMessage = diagnosticsMessage.concat(`\n### Warnings
${diagnostic.reduce((acc, curr) => acc + "\n" + JSON.stringify(curr))}
`);
      }

      if (error !== null || compileResult.result === null) {
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

      const svg = compiler.svg(compileResult.result);

      const resvg = new Resvg(svg, {
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
