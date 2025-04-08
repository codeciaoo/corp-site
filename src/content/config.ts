import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      publishedDate: z.date(),
      tags: z.array(z.string()).optional(),
      tech_stacks: z.array(z.string()).optional(),
    }),
});

export const collections = {
  projects,
};
