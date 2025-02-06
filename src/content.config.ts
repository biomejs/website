import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { blogSchema } from "starlight-blog/schema";
//
// const blogSchema = (image: ImageFunction) =>
// 	z.object({
// 		title: z.string(),
// 		subtitle: z.string().optional(),
// 		pubDate: z
// 			.string()
// 			.or(z.date())
// 			.transform((val) => new Date(val)),
// 		summary: z.string(),
// 		description: z.string(),
// 		authors: z.array(z.string()),
// 		coverImage: z
// 			.object({
// 				lightSrc: image(),
// 				darkSrc: image(),
// 				caption: z.string().optional(),
// 				alt: z.string(),
// 			})
// 			.optional(),
// 		socialImage: image(),
// 	});

// const authorsSchema = z.object({
// 	name: z.string(),
// 	avatar: z.string(),
// 	url: z.string().url().optional(),
// });

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: (context) => blogSchema(context),
		}),
	}),
};
