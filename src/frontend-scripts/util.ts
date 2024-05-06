export type ThemeName = "dark" | "light";
export type ThemeChanged = { theme?: string };

export const matchesDark: undefined | MediaQueryList =
	typeof window === "undefined"
		? undefined
		: window.matchMedia("(prefers-color-scheme: dark)");

export function getCurrentTheme(themeName?: string): ThemeName {
	const currentScheme =
		themeName ?? window.localStorage.getItem("starlight-theme");

	switch (currentScheme) {
		case "dark":
			return "dark";
		case "light":
			return "light";
		default:
			return matchesDark?.matches ? "dark" : "light";
	}
}

export function setCurrentTheme(theme: ThemeName) {
	document.documentElement.setAttribute("data-theme", theme);
}
