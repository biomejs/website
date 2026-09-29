import { defineConfig } from "@lunariajs/core/config";

export default defineConfig({
	repository: {
		name: "biomejs/website",
		branch: "main",
		hosting: "github",
	},
	sourceLocale: {
		label: "English",
		lang: "en",
	},
	locales: [
		{
			label: "Español",
			lang: "es",
		},
		{
			label: "Français",
			lang: "fr",
		},
		{
			label: "日本語",
			lang: "ja",
		},
		{
			label: "简体中文",
			lang: "zh-CN",
		},
		{
			label: "Polski",
			lang: "pl",
		},
		{
			label: "Português",
			lang: "pt-BR",
		},
		{
			label: "Українська",
			lang: "uk",
		},
		{
			label: "Русский",
			lang: "ru",
		},
	],
	files: [
		{
			include: ["src/content/docs/en/**/*.{md,mdx}"],
			exclude: [
				"src/content/docs/en/linter/**/rules/**/*.{md,mdx}",
				"src/content/docs/en/assist/**/actions/**/*.{md,mdx}",
			],
			pattern: "src/content/docs/@lang/@path",
			type: "universal",
		},
	],
	dashboard: {
		title: "Biome i18n dashboard",
		favicon: {
			external: [
				{
					link: "https://biomejs.dev/img/favicon.svg",
					type: "image/svg+xml",
				},
				{
					link: "https://biomejs.dev/img/favicon.ico",
					type: "image/x-icon",
				},
			],
		},
	},
});
