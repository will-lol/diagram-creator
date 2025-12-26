import { z } from "zod";

export const FrontmatterSchema = z.object({
  description: z.string().optional(),
  github_url: z.string().optional(),
  author: z.string().optional(),
  license: z.string().optional(),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;
