import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import lunaria from "@lunariajs/starlight";
import { defineConfig } from "astro/config";
import rehypeSlug from "rehype-slug";
import starlightBlog from "starlight-blog";
import starlightLinksValidator from "starlight-links-validator";
import { searchForWorkspaceRoot } from "vite";
import { version as biomeVersion } from "./node_modules/@biomejs/wasm-web/package.json" with {
	type: "json",
};
import { version as prettierVersion } from "./node_modules/prettier/package.json" with {
	type: "json",
};
import redirects from "./redirects.js";

const plugins = [
	starlightBlog({
		title: {
			en: "Blog",
			ja: "ブログ",
			"zh-CN": "博客",
		},
		metrics: {
			readingTime: true,
		},
		authors: {
			arendjr: {
				name: "Arend van Beelen jr.",
				picture: "https://github.com/arendjr.png",
				url: "https://arendjr.nl/",
			},
			conaclos: {
				name: "Victorien Elvinger",
				picture: "https://github.com/conaclos.png",
				url: "https://bsky.app/profile/conaclos.bsky.social",
			},
			dyc3: {
				name: "Carson McManus",
				picture: "https://github.com/dyc3.png",
				url: "https://github.com/dyc3",
			},
			ema: {
				name: "Emanuele Stoppa",
				picture: "https://github.com/ematipico.png",
				url: "https://bsky.app/profile/ematipico.xyz",
			},
			nhedger: {
				name: "Nicolas Hedger",
				picture: "https://github.com/nhedger.png",
				url: "https://bsky.app/profile/hedger.ch",
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
	starlightLinksValidator({
		// TODO: enable once `next` is merged into `main`
		errorOnInvalidHashes: false,
		exclude: [
			"/playground",
			"/playground**",
			"/playground/**",
			"/linter/rules/",
			"/linter/rules/**/*",
			"/linter/rule-sources/",
			"/reference/cli/",
			"/blog/**/*",
			"/enterprise",
		],
	}),
];

if (process.env?.E2E !== "true") {
	plugins.push(
		lunaria({
			route: "i18n-dashboard",
		}),
	);
}

// https://astro.build/config
export default defineConfig({
	site: "https://biomejs.dev",
	output: "static",
	compressHTML: true,
	redirects: {
		...redirects,
		"/blog/annoucing-biome": "/blog/announcing-biome",
		"/internals/credits": "/internals/people-and-credits",
	},
	integrations: [
		react(),
		starlight({
			title: "Biome",
			defaultLocale: "root",
			plugins,
			expressiveCode: {
				shiki: {
					langAlias: {
						cjs: "javascript",
						grit: "txt",
					},
				},
			},
			routeMiddleware: "./src/routeData.ts",
			locales: {
				root: {
					label: "English",
					lang: "en",
				},
				es: {
					label: "Español",
					lang: "es",
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
				uk: {
					label: "Українська",
					lang: "uk",
				},
			},
			sidebar: [
				{
					label: "Guides",
					translations: {
						es: "Guías",
						ja: "ガイド",
						"zh-CN": "指南",
						"pt-BR": "Guias",
						uk: "Гайди",
					},
					items: [
						{
							label: "Getting Started",
							link: "/guides/getting-started",
							translations: {
								es: "Primeros pasos",
								fr: "Démarrage",
								ja: "はじめる",
								"zh-CN": "入门",
								"pt-BR": "Primeiros passos",
								uk: "Початок роботи",
							},
						},
						{
							label: "Manual installation",
							link: "/guides/manual-installation",
							translations: {
								es: "Instalación manual",
								fr: "Installation manuelle",
								ja: "手動インストール",
								"zh-CN": "手动安装",
								"pt-BR": "Instalação manual",
								uk: "Ручна установка",
							},
						},
						{
							label: "Configure Biome",
							link: "/guides/configure-biome",
							translations: {
								es: "Configurar Biome",
								fr: "Configurer Biome",
								ja: "Biome の設定",
								"zh-CN": "配置 Biome",
								"pt-BR": "Configurar Bioma",
								uk: "Налаштування Biome",
							},
						},
						{
							label: "Use Biome in big projects",
							link: "/guides/big-projects",
							badge: "updated",
							translations: {
								es: "Usar Biome en proyectos grandes",
								fr: "Utiliser Biome dans de gros projets",
								ja: "大規模プロジェクトでのBiomeの使用方法",
								"zh-CN": "大型项目中使用 Biome",
								"pt-BR": "Usando o Biome em projetos grandes",
								uk: "Використання Biome в великих проектах",
							},
						},
						{
							label: "Upgrade to Biome v2",
							link: "/guides/upgrade-to-biome-v2",
							badge: "new",
							translations: {
								"zh-CN": "升级到 Biome v2",
							},
						},
						{
							label: "Biome in your IDE",
							translations: {
								es: "Biome en tu IDE",
								fr: "Biome dans votre IDE",
								ja: "Biome をあなたのエディタに導入する",
								"zh-CN": "编辑器中使用 Biome",
								"pt-BR": "Biome no seu editor",
								uk: "Biome в вашому IDE",
							},
							items: [
								{
									label: "First-party extensions",
									link: "/guides/editors/first-party-extensions",
									translations: {
										es: "Extensiones de primera mano",
										fr: "Extensions officielles",
										ja: "Biome 公式拡張機能",
										"zh-CN": "官方扩展",
										uk: "Офіційні розширення",
									},
								},
								{
									label: "Third-party extensions",
									link: "/guides/editors/third-party-extensions",
									translations: {
										es: "Extensiones de terceros",
										fr: "Extensions tierces",
										ja: "サードパーティの拡張機能",
										"zh-CN": "第三方扩展",
										uk: "Розширення сторонніх розробників",
									},
								},
								{
									label: "Integrate Biome in an editor extension",
									link: "/guides/editors/create-a-extension",
									translations: {
										es: "Integrar Biome en una extensión para un editor",
										fr: "Intégrer Biome à une extension pour un éditeur",
										ja: "エディタ拡張機能への Biome の統合",
										"zh-CN": "在编辑器扩展中集成 Biome",
										uk: "Інтеграція Biome в розширення редактора",
									},
								},
							],
						},
						{
							label: "Integrate Biome with your VCS",
							link: "/guides/integrate-in-vcs",
							translations: {
								es: "Integrar Biome con tu VCS",
								fr: "Intégrer Biome à votre VCS",
								ja: "Biome をあなたの VCS と統合する",
								"zh-CN": "与版本控制系统集成",
								"pt-BR": "Integrando o Biome com o seu VCS",
								uk: "Інтеграція Biome з вашою VCS",
							},
						},
						{
							label: "Migrate from ESLint & Prettier",
							link: "/guides/migrate-eslint-prettier",
							translations: {
								es: "Migrar de ESLint & Prettier",
								fr: "Migrer depuis ESLint & Prettier",
								ja: "ESLintとPrettierからの移行",
								"zh-CN": "从 ESLint 和 Prettier 迁移",
								uk: "Міграція з ESLint & Prettier",
							},
						},
						{
							label: "Investigate slowness",
							link: "/guides/investigate-slowness",
							translations: {
								"zh-CN": "调查 Biome 中的性能问题",
							},
						},
					],
				},
				{
					label: "Formatter",
					items: [
						{
							label: "Introduction",
							link: "/formatter",
							translations: {
								es: "Introducción",
								ja: "イントロダクション",
								"zh-CN": "介绍",
								"pt-BR": "Introdução",
								uk: "Вступ",
							},
						},
						{
							label: "Differences with Prettier",
							link: "/formatter/differences-with-prettier",
							translations: {
								es: "Diferencias con Prettier",
								fr: "Différences par rapport à Prettier",
								ja: "Prettier との違い",
								"zh-CN": "与 Prettier 的区别",
								"pt-BR": "Diferenças em relação ao Prettier",
								uk: "Відмінності від Prettier",
							},
						},
						{
							label: "Formatter Option Philosophy",
							link: "/formatter/option-philosophy",
							translations: {
								es: "Filosofía de opciones de formato",
								fr: "Philosophie d’option de formatage",
								ja: "Formatterオプションに対する考え方",
								"zh-CN": "格式化配置理念",
								"pt-BR": "Princípios de configuração",
								uk: "Філософія параметрів форматування",
							},
						},
					],
					translations: {
						es: "Formateador",
						fr: "Outil de formatage",
						"zh-CN": "格式化程序",
						"pt-BR": "Formatador",
						uk: "Форматувальник",
					},
				},
				{
					label: "Analyzer",
					translations: {
						es: "Analizador",
						fr: "Analyseur",
						ja: "アナライザー",
						"zh-CN": "分析器",
						"pt-BR": "Analisador",
						uk: "Аналізатор",
					},
					items: [
						{
							label: "Suppressions",
							link: "/analyzer/suppressions",
							translations: {
								es: "Supresiones",
								fr: "Suppressions",
								ja: "抑制",
								"zh-CN": "禁用检查",
								"pt-BR": "Supressões",
								uk: "Придушення",
							},
						},
						{
							label: "Linter",
							items: [
								{
									label: "Introduction",
									link: "/linter",
									badge: {
										text: "updated",
										variant: "success",
									},
									translations: {
										es: "Introducción",
										ja: "イントロダクション",
										"zh-CN": "介绍",
										"pt-BR": "Introdução",
										uk: "Вступ",
									},
								},
								{
									label: "Domains",
									link: "/linter/domains",
									badge: "new",
									translations: {
										"zh-CN": "域",
									},
								},
								{
									label: "Plugins",
									link: "/linter/plugins",
									badge: "beta",
									translations: {
										ja: "プラグイン",
										"zh-CN": "插件",
									},
								},
								{
									label: "JavaScript Rules",
									link: "/linter/javascript/rules",
									translations: {
										es: "Reglas",
										fr: "Règles",
										ja: "ルール",
										"zh-CN": "JavaScript 规则",
										"pt-BR": "Regras",
										uk: "Правила",
									},
								},
								{
									label: "JavaScript Rules sources",
									link: "/linter/javascript/sources",
									translations: {
										"zh-CN": "JavaScript 规则来源",
										es: "Fuentes de reglas",
										fr: "Sources des règles",
									},
								},
								{
									label: "CSS Rules",
									link: "/linter/css/rules",
									translations: {
										"zh-CN": "CSS 规则",
									},
								},
								{
									label: "CSS Rules sources",
									link: "/linter/css/sources",
									translations: {
										"zh-CN": "CSS 规则来源",
									},
								},
								{
									label: "JSON Rules",
									link: "/linter/json/rules",
									translations: {
										"zh-CN": "JSON 规则",
									},
								},
								{
									label: "JSON Rules sources",
									link: "/linter/json/sources",
									translations: {
										"zh-CN": "JSON 规则来源",
									},
								},
								{
									label: "GraphQL Rules",
									link: "/linter/graphql/rules",
									translations: {
										"zh-CN": "GraphQL 规则",
									},
								},
								{
									label: "GraphQL Rules sources",
									link: "/linter/graphql/sources",
									translations: {
										"zh-CN": "GraphQL 规则来源",
									},
								},
							],
							translations: {
								fr: "Outil de linting",
								uk: "Лінтер",
							},
						},
						{
							label: "Assist",
							badge: "new",
							items: [
								{
									label: "Introduction",
									link: "/assist",
									translations: {
										ja: "イントロダクション",
										"zh-CN": "介绍",
										"pt-BR": "Introdução",
										uk: "Вступ",
									},
								},
								{
									label: "JavaScript Actions",
									link: "/assist/javascript/actions",
									translations: {
										"zh-CN": "JavaScript 操作",
									},
								},
								{
									label: "JavaScript Actions sources",
									link: "/assist/javascript/sources",
									translations: {
										"zh-CN": "JavaScript 操作来源",
									},
								},
								{
									label: "CSS Actions",
									link: "/assist/css/actions",
									translations: {
										"zh-CN": "CSS 操作",
									},
								},
								{
									label: "CSS Actions sources",
									link: "/assist/css/sources",
									translations: {
										"zh-CN": "CSS 操作来源",
									},
								},
								{
									label: "JSON Actions",
									link: "/assist/json/actions",
									translations: {
										"zh-CN": "JSON 操作",
									},
								},
								{
									label: "JSON Actions sources",
									link: "/assist/json/sources",
									translations: {
										"zh-CN": "JSON 操作来源",
									},
								},
								{
									label: "GraphQL Actions",
									link: "/assist/graphql/actions",
									translations: {
										"zh-CN": "GraphQL 操作",
									},
								},
								{
									label: "GraphQL Actions sources",
									link: "/assist/graphql/sources",
									translations: {
										"zh-CN": "GraphQL 操作来源",
									},
								},
							],
							translations: {
								"zh-CN": "辅助操作",
							},
						},
					],
				},
				{
					label: "Reference",
					translations: {
						es: "Referencia",
						fr: "Références",
						ja: "リファレンス",
						"zh-CN": "参考",
						"pt-BR": "Referências",
						uk: "Довідка",
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
							translations: {
								es: "Diagnósticos",
								ja: "診断",
								"zh-CN": "诊断",
							},
						},
						{
							label: "Environment variables",
							link: "/reference/environment-variables",
							translations: {
								es: "Variables de entorno",
								fr: "Variables d’environnement",
								uk: "Змінні середовища",
								ja: "環境変数",
								"zh-CN": "环境变量",
							},
						},
						{
							label: "Reporters",
							link: "/reference/reporters",
							translations: {
								es: "Generador de informes",
								fr: "Outils de reporting",
								uk: "Звіти",
								ja: "リポータ",
								"zh-CN": "报告器",
							},
						},
						{
							label: "Configuration",
							link: "/reference/configuration",
							translations: {
								es: "Configuración",
								ja: "設定",
								"zh-CN": "配置",
								"pt-BR": "Configuração",
								uk: "Конфігурація",
							},
						},
						{
							label: "VS Code extension",
							link: "/reference/vscode",
							translations: {
								es: "Extensión para VSCode",
								fr: "Extension pour VSCode",
								ja: "VS Code拡張機能",
								"zh-CN": "VSCode 扩展",
								"pt-BR": "Extensão do VSCode",
								uk: "Розширення VSCode",
							},
						},
						{
							label: "Zed extension",
							link: "/reference/zed",
							translations: {
								es: "Extensión para Zed",
								fr: "Extension pour Zed",
								ja: "Zed拡張機能",
								"zh-CN": "Zed 扩展",
								"pt-BR": "Extensão do Zed",
								uk: "Розширення Zed",
							},
						},
						{
							label: "GritQL",
							link: "/reference/gritql",
						},
					],
				},
				{
					label: "Recipes",
					translations: {
						es: "Recetas",
						fr: "Recettes",
						ja: "レシピ",
						"zh-CN": "与其他工具集成",
						"pt-BR": "Receitas",
						uk: "Рецепти",
					},
					items: [
						{
							label: "Continuous Integration",
							link: "/recipes/continuous-integration",
							translations: {
								es: "Integración continua",
								fr: "Intégration continue",
								ja: "継続的インテグレーション",
								"zh-CN": "CI 环境集成",
								"pt-BR": "Integração Contínua",
								uk: "Безперервна інтеграція",
							},
						},
						{
							label: "Git Hooks",
							link: "/recipes/git-hooks",
							translations: {
								fr: "Hooks Git",
								"zh-CN": "Git 钩子",
							},
						},
						{
							label: "Renovate",
							link: "/recipes/renovate",
							translations: {
								"zh-CN": "Renovate Bot",
							},
						},
						{
							label: "Social Badges",
							link: "/recipes/badges",
							translations: {
								es: "Insignias sociales",
								fr: "Badges sociaux",
								ja: "ソーシャルバッジ",
								uk: "Соціальні значки",
								"zh-CN": "Biome 徽章",
							},
						},
					],
				},
				{
					label: "Internals",
					translations: {
						es: "Aspectos internos",
						fr: "Aspects internes",
						ja: "内部原理",
						"zh-CN": "内部原理",
						"pt-BR": "Aspectos Internos",
						uk: "Внутрішні аспекти",
					},
					items: [
						{
							label: "Philosophy",
							link: "/internals/philosophy",
							translations: {
								es: "Filosofía",
								fr: "Philosophie",
								ja: "理念",
								"zh-CN": "理念",
								"pt-BR": "Filosofia",
								uk: "Філософія",
							},
						},
						{
							label: "Language support",
							link: "/internals/language-support",
							translations: {
								es: "Soporte de lenguas",
								fr: "Langages pris en charge",
								ja: "言語サポート",
								"zh-CN": "语言支持",
								"pt-BR": "Suporte de linguagens",
								uk: "Підтримка мов",
							},
						},
						{
							label: "Architecture",
							link: "/internals/architecture",
							translations: {
								es: "Arquitectura",
								ja: "アーキテクチャ",
								"zh-CN": "架构",
								"pt-BR": "Arquitetura",
								uk: "Архітектура",
							},
						},
						{
							label: "People and Credits",
							link: "/internals/people-and-credits",
							translations: {
								es: "Créditos",
								fr: "Crédits",
								ja: "クレジット",
								"zh-CN": "鸣谢",
								"pt-BR": "Créditos",
								uk: "Подяки",
							},
						},
						{
							label: "Versioning",
							link: "/internals/versioning",
							translations: {
								es: "Versionado",
								fr: "Versionnage",
								ja: "バージョニング",
								"zh-CN": "版本控制",
								"pt-BR": "Versionamento",
								uk: "Версіонування",
							},
						},
						{
							label: "Changelog",
							link: "/internals/changelog",
							translations: {
								es: "Registro de cambios",
								"zh-CN": "更新日志",
								"pt-BR": "Alterações",
								uk: "Журнал змін",
							},
						},
						{
							label: "Changelog v1",
							link: "/internals/changelog_v1",
							translations: {
								"zh-CN": "更新日志 v1",
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
			customCss: [
				// Relative path to your custom CSS file
				"./src/styles/index.css",
			],
			social: [
				{
					icon: "discord",
					label: "Discord",
					href: "https://biomejs.dev/chat",
				},
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/biomejs/biome",
				},
				{
					icon: "mastodon",
					label: "Mastodon",
					href: "https://fosstodon.org/@biomejs",
				},
				{
					icon: "openCollective",
					label: "Open Collective",
					href: "https://opencollective.com/biome",
				},
				{
					icon: "youtube",
					label: "YouTube",
					href: "https://youtube.com/@Biomejs",
				},
				{
					icon: "blueSky",
					label: "BlueSky",
					href: "https://bsky.app/profile/biomejs.dev",
				},
			],
			editLink: {
				baseUrl: "https://github.com/biomejs/website/edit/main/",
			},
			components: {
				SiteTitle: "./src/components/starlight/SiteTitle.astro",
				Hero: "./src/components/starlight/Hero.astro",
				LanguageSelect: "./src/components/starlight/LanguageSelect.astro",
				Footer: "./src/components/starlight/Footer.astro",
			},
		}),
	],

	adapter: netlify({
		imageCDN: false,
	}),

	build: {
		format: "directory",
	},

	markdown: {
		syntaxHighlight: "shiki",
		rehypePlugins: [rehypeSlug],
		shikiConfig: {
			langAlias: {
				cjs: "javascript",
				grit: "txt",
				cts: "javascript",
				block: "txt",
			},
		},
	},

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
