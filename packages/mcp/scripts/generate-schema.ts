import { z } from "zod";
import { FrontmatterSchema } from "../src/schema";
import fs from "node:fs";
import path from "node:path";

const jsonSchema = z.toJSONSchema(FrontmatterSchema);
const outputPath = path.resolve(process.cwd(), "frontmatter.schema.json");
fs.writeFileSync(outputPath, JSON.stringify(jsonSchema, null, 2));
console.log(`Schema generated at ${outputPath}`);
process.exit(1);
