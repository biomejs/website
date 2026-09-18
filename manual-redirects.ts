const localePrefixes = [
	"",
	"/es",
	"/fr",
	"/ja",
	"/pl",
	"/pt-br",
	"/ru",
	"/uk",
	"/zh-cn",
];

const docsRedirects: Record<string, string> = {
	"/reference/reporters": "/reference/cli/#reporter-flags",
	"/internals/credits": "/internals/people-and-credits",
	"/guides/editors/first-party-extensions": "/configuration/editors",
	"/guides/editors/third-party-extensions":
		"/configuration/editors#other-editors",
	"/editors/introduction": "/reference/language-server",
	"/editors/first-party-extensions": "/configuration/editors",
	"/editors/third-party-extensions": "/configuration/editors#other-editors",
	"/guides/editors/create-an-extension": "/reference/language-server",
	"/guides/editors/create-a-extension": "/reference/language-server",
	"/editors/create-an-extension": "/reference/language-server",
	"/guides/getting-started": "/installation/quick-start",
	"/guides/manual-installation": "/installation/install-biome",
	"/guides/migrate-eslint-prettier": "/installation/migrate-eslint-prettier",
	"/guides/upgrade-to-biome-v2": "/installation/upgrade-to-biome-v2",
	"/guides/configure-biome": "/configuration/configure-biome",
	"/guides/integrate-in-vcs": "/configuration/integrate-with-vcs",
	"/guides/big-projects": "/configuration/big-projects",
	"/internals/language-support": "/introduction/language-support",
};

const globalRedirects: Record<string, string> = {
	"/blog/annoucing-biome": "/blog/announcing-biome",
};

export default {
	...Object.fromEntries(
		localePrefixes.flatMap((prefix) =>
			Object.entries(docsRedirects).map(([from, to]) => [
				`${prefix}${from}`,
				`${prefix}${to}`,
			]),
		),
	),
	...globalRedirects,
};
