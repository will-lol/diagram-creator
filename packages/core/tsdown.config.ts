import { defineConfig } from "tsdown";
import { Endpoints } from "@octokit/types";

type GetContentsResponse = Endpoints["GET /repos/{owner}/{repo}/contents/{path}"]["response"]["data"];

const cetzPlugin = {
  name: "cetz-versions",
  resolveId(id: string) {
    if (id === "cetz-versions") return "\0cetz-versions";
  },
  async load(id: string) {
    if (id === "\0cetz-versions") {
      const fetchVersion = async (pkg: string) => {
        try {
          const res = await fetch(`https://api.github.com/repos/typst/packages/contents/packages/preview/${pkg}`);
          if (!res.ok) {
            console.warn(`Failed to fetch ${pkg} version: ${res.statusText}`);
            return "0.0.0";
          }
          const data = (await res.json()) as GetContentsResponse;

          if (Array.isArray(data)) {
            // Last element is the latest version according to user
            const latest = data[data.length - 1];
            return latest?.name || "0.0.0";
          }

          return "0.0.0";
        } catch (e) {
          console.warn(`Error fetching ${pkg} version:`, e);
          return "0.0.0"; // Fallback
        }
      };

      const [cetz, cetzPlot] = await Promise.all([fetchVersion("cetz"), fetchVersion("cetz-plot")]);

      return `
        export const CETZ_VERSION = ${JSON.stringify(cetz)};
        export const CETZ_PLOT_VERSION = ${JSON.stringify(cetzPlot)};
      `;
    }
  },
};

export default defineConfig({
  entry: ["./index.ts"],
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
  plugins: [cetzPlugin],
});
