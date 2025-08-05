import { defineCollection, z } from "astro:content";
import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";
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
	i18n: defineCollection({
		loader: i18nLoader(),
		schema: i18nSchema({
			extend: z.object({
				"title.docs": z.string().optional(),
				"title.enterprise": z.string().optional(),
				"title.playground": z.string().optional(),
			}),
		}),
	}),
};
