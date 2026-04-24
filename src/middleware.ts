import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
	if (context.props.isFallback || shouldRedirectToEnglish(context.url)) {
		return context.redirect(englishUrl(context.url));
	}

	return next();
});

const locales = ["es", "fr", "ja", "zh-cn", "pl", "pt-br", "uk", "ru"];

const englishOnlyPrefixes = ["/internals/"];

function shouldRedirectToEnglish(url: URL): boolean {
	const maybeLocale = url.pathname.split("/")[1];
	if (!maybeLocale || !locales.includes(maybeLocale)) {
		return false;
	}
	const pathWithoutLocale = url.pathname.slice(maybeLocale.length + 1);
	return englishOnlyPrefixes.some((prefix) => pathWithoutLocale.startsWith(prefix));
}

function englishUrl(url: URL): string {
	const maybeLocale = url.pathname.split("/")[1];
	if (maybeLocale && locales.includes(maybeLocale)) {
		return url.pathname.slice(maybeLocale.length + 1) || "/";
	}
	return url.pathname;
}
