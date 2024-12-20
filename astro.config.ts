import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import rehypeSlug from "rehype-slug";
import starlightBlog from "starlight-blog";
import { searchForWorkspaceRoot } from "vite";
import { version as biomeVersion } from "./node_modules/@biomejs/wasm-web/package.json";
import { version as prettierVersion } from "./node_modules/prettier/package.json";
import { rehypeAutolink } from "./plugins/rehype-autolink";

const site = "https://biomejs.dev";
// https://astro.build/config
export default defineConfig({
	site,
	output: "static",

	compressHTML: true,

	integrations: [
		react(),
		starlight({
			title: "Biome",
			defaultLocale: "root",
			plugins: [
				starlightBlog({
					title: {
						en: "Blog",
						ja: "ブログ",
						"zh-CN": "博客",
					},
					authors: {
						conaclos: {
							name: "Victorien Elvinger",
							picture:
								"https://avatars.githubusercontent.com/u/2358560?s=96&v=4",
							url: "https://twitter.com/Conaclos",
						},
						ema: {
							name: "Emanuele Stoppa",
							picture: "https://avatars.githubusercontent.com/u/602478?v=4",
							url: "https://twitter.com/ematipico",
						},
						team: {
							name: "Biome Core Team, Biome Maintainers",
							picture: "/img/logo-avatar.png",
						},
						core: {
							name: "Biome Core Team",
							picture: "/img/logo-avatar.png",
						},
					},
				}),
			],
			locales: {
				root: {
					label: "English",
					lang: "en",
				},
				fr: {
					label: "Français",
					lang: "fr",
				},
				ja: {
					label: "日本語",
					lang: "ja",
				},
				"zh-cn": {
					label: "简体中文",
					lang: "zh-CN",
				},
				"pt-br": {
					label: "Português",
					lang: "pt-BR",
				},
			},
			sidebar: [
				{
					label: "Playground",
					link: "../playground",
					translations: {
						fr: "Bac à sable",
						ja: "プレイグラウンド",
						"zh-CN": "演练场",
						"pt-BR": "Ambiente de testes",
					},
				},
				{
					label: "Guides",
					translations: { ja: "ガイド", "zh-CN": "指南", "pt-BR": "Guias" },
					items: [
						{
							label: "Getting Started",
							link: "/guides/getting-started",
							translations: {
								fr: "Démarrage",
								ja: "はじめる",
								"zh-CN": "入门",
								"pt-BR": "Primeiros passos",
							},
						},
						{
							label: "Manual installation",
							link: "/guides/manual-installation",
							translations: {
								fr: "Installation manuelle",
								ja: "手動インストール",
								"zh-CN": "手动安装",
								"pt-BR": "Instalação manual",
							},
						},
						{
							label: "Configure Biome",
							link: "/guides/configure-biome",
							translations: {
								fr: "Configurer Biome",
								ja: "Biome の設定",
								"zh-CN": "配置生物群落",
								"pt-BR": "Configurar Bioma",
							},
						},
						{
							label: "Use Biome in big projects",
							link: "/guides/big-projects",
							translations: {
								fr: "Utiliser Biome dans de gros projets",
								ja: "大きなプロジェクトでのBiomeの使用方法",
								"zh-CN": "大型项目中使用 Biome",
								"pt-BR": "Usando o Biome em projetos grandes",
							},
						},
						{
							label: "Biome in your IDE",
							translations: {
								fr: "Biome dans votre IDE",
								ja: "Biome をあなたのエディタに導入する",
								"zh-CN": "编辑器中使用 Biome",
								"pt-BR": "Biome no seu editor",
							},
							items: [
								{
									label: "First-party extensions",
									link: "/guides/editors/first-party-extensions",
									translations: {
										fr: "Extensions officielles",
									},
								},
								{
									label: "Third-party extensions",
									link: "/guides/editors/third-party-extensions",
									translations: {
										fr: "Extensions tierces",
									},
								},
								{
									label: "Integrate Biome in an editor extension",
									link: "/guides/editors/create-a-extension",
									translations: {
										fr: "Intégrer Biome à une extension pour un éditeur",
									},
								},
							],
						},
						{
							label: "Integrate Biome with your VCS",
							link: "/guides/integrate-in-vcs",
							translations: {
								fr: "Intégrer Biome à votre VCS",
								ja: "Biome をあなたの VCS と統合する",
								"zh-CN": "与版本控制系统集成",
								"pt-BR": "Integrando o Biome com o seu VCS",
							},
						},
						{
							label: "Migrate from ESLint & Prettier",
							link: "/guides/migrate-eslint-prettier",
							translations: {
								fr: "Migrer depuis ESLint & Prettier",
								ja: "ESLintとPrettierからの移行",
							},
						},
					],
				},
				{
					label: "Tools",
					translations: {
						fr: "Outils",
						ja: "ツール",
						"zh-CN": "工具",
						"pt-BR": "Ferramentas",
					},
					items: [
						{
							label: "Analyzer",
							items: [
								{
									label: "Introduction",
									link: "/analyzer",
									translations: {
										ja: "イントロダクション",
										"zh-CN": "介绍",
										"pt-BR": "Introdução",
									},
								},
								{
									label: "Import Sorting",
									link: "/analyzer/import-sorting",
									translations: {
										fr: "Tri des imports",
										ja: "Import文のソート",
										"zh-CN": "导入排序",
										"pt-BR": "Ordenação de importações",
									},
								},
							],
							translations: {
								fr: "Analyseur",
								ja: "Analyzer",
								"zh-CN": "分析器",
								"pt-BR": "Analisador",
							},
						},
						{
							label: "Formatter",
							items: [
								{
									label: "Introduction",
									link: "/formatter",
									translations: {
										ja: "イントロダクション",
										"zh-CN": "介绍",
										"pt-BR": "Introdução",
									},
								},
								{
									label: "Differences with Prettier",
									link: "/formatter/differences-with-prettier",
									translations: {
										fr: "Différences par rapport à Prettier",
										ja: "Prettier との違い",
										"zh-CN": "与 Prettier 的区别",
										"pt-BR": "Diferenças em relação ao Prettier",
									},
								},
								{
									label: "Formatter Option Philosophy",
									link: "/formatter/option-philosophy",
									translations: {
										fr: "Philosophie d’option de formatage",
										ja: "Formatterオプションに対する考え方",
										"zh-CN": "格式化配置理念",
										"pt-BR": "Princípios de configuração",
									},
								},
							],
							translations: {
								fr: "Outil de formatage",
								"zh-CN": "格式化程序",
								"pt-BR": "Formatador",
							},
						},
						{
							label: "Linter",
							items: [
								{
									label: "Introduction",
									link: "/linter",
									translations: {
										ja: "イントロダクション",
										"zh-CN": "介绍",
										"pt-BR": "Introdução",
									},
								},
								{
									label: "Rules",
									link: "/linter/rules",
									translations: {
										fr: "Règles",
										ja: "ルール",
										"zh-CN": "规则",
										"pt-BR": "Regras",
									},
								},
								{
									label: "Rules sources",
									link: "/linter/rules-sources",
									translations: {
										fr: "Sources des règles",
									},
								},
							],
							translations: {
								fr: "Outil de linting",
							},
						},
					],
				},
				{
					label: "Reference",
					translations: {
						fr: "Références",
						ja: "リファレンス",
						"zh-CN": "参考",
						"pt-BR": "Referências",
					},
					items: [
						{
							label: "CLI",
							link: "/reference/cli",
						},
						{
							label: "Diagnostics",
							link: "/reference/diagnostics",
							badge: "new",
						},
						{
							label: "Environment variables",
							link: "/reference/environment-variables",
							translations: {
								fr: "Variables d’environnement",
							},
						},
						{
							label: "Reporters",
							link: "/reference/reporters",
							translations: {
								fr: "Outils de reporting",
							},
						},
						{
							label: "Configuration",
							link: "/reference/configuration",
							translations: {
								ja: "設定",
								"zh-CN": "配置",
								"pt-BR": "Configuração",
							},
						},
						{
							label: "VSCode extension",
							link: "/reference/vscode",
							translations: {
								fr: "Extension pour VSCode",
								ja: "VSCode拡張機能",
								"zh-CN": "VSCode 扩展",
								"pt-BR": "Extensão do VSCode",
							},
						},
						{
							label: "Zed extension",
							link: "/reference/zed",
							badge: "new",
							translations: {
								fr: "Extension pour Zed",
								ja: "Zed拡張機能",
								"zh-CN": "Zed 扩展",
								"pt-BR": "Extensão do Zed",
							},
						},
						{
							label: "GritQL",
							link: "/reference/gritql",
							badge: "experimental",
						},
					],
				},
				{
					label: "Recipes",
					translations: {
						fr: "Recettes",
						ja: "レシピ",
						"zh-CN": "实例",
						"pt-BR": "Receitas",
					},
					items: [
						{
							label: "Continuous Integration",
							link: "/recipes/continuous-integration",
							translations: {
								fr: "Intégration continue",
								ja: "継続的インテグレーション",
								"zh-CN": "持续集成",
								"pt-BR": "Integração Contínua",
							},
						},
						{
							label: "Git Hooks",
							link: "/recipes/git-hooks",
						},
						{
							label: "Renovate",
							link: "/recipes/renovate",
						},
						{
							label: "Social Badges",
							link: "/recipes/badges",
							translations: {
								ja: "ソーシャルバッジ",
							},
						},
					],
				},
				{
					label: "Internals",
					translations: {
						fr: "Aspects internes",
						ja: "内部原理",
						"zh-CN": "内部原理",
						"pt-BR": "Aspectos Internos",
					},
					items: [
						{
							label: "Philosophy",
							link: "/internals/philosophy",
							translations: {
								fr: "Philosophie",
								ja: "理念",
								"zh-CN": "理念",
								"pt-BR": "Filosofia",
							},
						},
						{
							label: "Language support",
							link: "/internals/language-support",
							translations: {
								fr: "Langages pris en charge",
								ja: "言語サポート",
								"zh-CN": "语言支持",
								"pt-BR": "Suporte de linguagens",
							},
						},
						{
							label: "Architecture",
							link: "/internals/architecture",
							translations: {
								ja: "アーキテクチャ",
								"zh-CN": "架构",
								"pt-BR": "Arquitetura",
							},
						},
						{
							label: "Credits",
							link: "/internals/credits",
							translations: {
								fr: "Crédits",
								ja: "クレジット",
								"zh-CN": "鸣谢",
								"pt-BR": "Créditos",
							},
						},
						{
							label: "Versioning",
							link: "/internals/versioning",
							translations: {
								fr: "Versionnage",
								ja: "バージョニング",
								"zh-CN": "版本控制",
								"pt-BR": "Versionamento",
							},
						},
						{
							label: "Changelog",
							link: "/internals/changelog",
							translations: {
								"zh-CN": "更新日志",
								"pt-BR": "Alterações",
							},
						},
					],
				},
			],
			logo: {
				light: "./src/assets/svg/logo-light-transparent.svg",
				dark: "./src/assets/svg/logo-dark-transparent.svg",
				replacesTitle: true,
			},
			favicon: "/img/favicon.svg",
			head: [
				{
					tag: "link",
					attrs: {
						rel: "alternate",
						type: "application/rss+xml",
						href: `${site}/feed.xml`,
					},
				},
			],
			customCss: [
				// Relative path to your custom CSS file
				"./src/styles/index.css",
			],
			social: {
				discord: "https://biomejs.dev/chat",
				github: "https://github.com/biomejs/biome",
				"x.com": "https://twitter.com/biomejs",
				mastodon: "https://fosstodon.org/@biomejs",
				openCollective: "https://opencollective.com/biome",
				youtube: "https://youtube.com/@Biomejs",
				blueSky: "https://bsky.app/profile/biomejs.dev",
			},
			editLink: {
				baseUrl: "https://github.com/biomejs/website/edit/main/",
			},
			components: {
				SiteTitle: "./src/components/starlight/SiteTitle.astro",
				Hero: "./src/components/starlight/Hero.astro",
				Head: "./src/components/starlight/Head.astro",
			},
		}),
	],

	build: {
		format: "directory",
	},

	markdown: {
		syntaxHighlight: "shiki",
		rehypePlugins: [rehypeSlug, ...rehypeAutolink()],
		shikiConfig: {
			langAlias: {
				cjs: "javascript",
				grit: "txt",
			},
		},
	},

	adapter: netlify({
		imageCDN: false,
	}),

	vite: {
		resolve: {
			alias: {
				"@": new URL("./src", import.meta.url).pathname,
			},
		},
		plugins: [],

		worker: {
			format: "es",
		},

		server: {
			fs: {
				// https://vitejs.dev/config/server-options.html#server-fs-allow
				allow: [searchForWorkspaceRoot(process.cwd())],
			},
		},

		define: {
			PRETTIER_VERSION: JSON.stringify(prettierVersion),
			BIOME_VERSION: JSON.stringify(biomeVersion),
		},
	},
});
