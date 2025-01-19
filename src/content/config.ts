import { z, defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      cover: image(),
      coverAlt: z.string(),
      publishedDate: z.date(),
    }),
});

export const collections = {
  projects,
};
