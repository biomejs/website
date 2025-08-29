import { defineCollection, z } from "astro:content";
import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";
import { file } from "astro/loaders";
import { blogSchema } from "starlight-blog/schema";
import { changelogsLoader } from "starlight-changelogs/loader";

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
	changelogs: defineCollection({
		loader: changelogsLoader([
			{
				base: "internals/changelog",
				provider: "changeset",
				title: {
					en: "Version History",
					es: "Registro de cambios",
					ja: "変更履歴",
					"zh-CN": "更新日志",
					"pt-BR": "Alterações",
					uk: "Журнал змін",
					ru: "Журнал изменений",
				},
				changelog:
					"https://raw.githubusercontent.com/biomejs/biome/refs/heads/main/packages/%40biomejs/biome/CHANGELOG.md",
			},
		]),
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
