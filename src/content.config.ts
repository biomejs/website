import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { file } from "astro/loaders";
import { blogSchema } from "starlight-blog/schema";

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: (context) => blogSchema(context),
		}),
	}),
	team: defineCollection({
		schema: () =>
			z.object({
				id: z.string(),
				type: z.enum(["core", "maintainer"]),
			}),
		loader: file("src/content/team.json"),
	}),
};
