// Smoke tests for the playground to ensure that the basic functionality works.

import { expect, type Page, test } from "@playwright/test";

function encodeCode(code: string): string {
	return Buffer.from(code, "utf16le").toString("base64");
}

/** Toggles a view from the toolbar, expanding the "Internals" group first if needed. */
async function toggleView(page: Page, name: string) {
	const button = page.getByRole("button", { name, exact: true });
	if (!(await button.isVisible())) {
		await page.getByRole("button", { name: "Internals" }).click();
	}
	await button.click();
}

test.describe("playground should format code", () => {
	test.describe("on navigation", () => {
		test("javascript", async ({ page }) => {
			await page.goto(
				"/playground?code=bABlAHQAIABhACAAPQAgADUAOwA%3D&prettier=true",
			);
			await expect(
				page.getByTestId("biome-output").getByRole("textbox"),
			).toContainText("let a = 5;");
			await expect(
				page.getByTestId("prettier-output").getByRole("textbox"),
			).toContainText("let a = 5;");
		});

		test("css", async ({ page }) => {
			await page.goto(
				"/playground?files.main.css=ZABpAHYAIAB7AGMAbwBsAG8AcgA6ACAAYgBsAHUAZQA7AH0A&prettier=true",
			);
			await expect(
				page.getByTestId("biome-output").getByRole("textbox"),
			).toContainText("div { color: blue;}");
			await expect(
				page.getByTestId("prettier-output").getByRole("textbox"),
			).toContainText("div { color: blue;}");
		});

		test("html", async ({ page }) => {
			await page.goto(
				"/playground?files.main.html=PABkAGkAdgA%2BADwALwBkAGkAdgA%2BAA%3D%3D&prettier=true",
			);
			await expect(
				page.getByTestId("biome-output").getByRole("textbox"),
			).toContainText("<div></div>");
			await expect(
				page.getByTestId("prettier-output").getByRole("textbox"),
			).toContainText("<div></div>");
		});
	});

	test.describe("on typing", () => {
		test("javascript", async ({ page }) => {
			await page.goto("/playground");
			await page.getByLabel("Compare Prettier").check();
			await page.getByTestId("editor").getByRole("textbox").fill("let a = 5;");
			await expect(
				page.getByTestId("biome-output").getByRole("textbox"),
			).toContainText("let a = 5;");
			await expect(
				page.getByTestId("prettier-output").getByRole("textbox"),
			).toContainText("let a = 5;");
		});
	});
});

test.describe("playground should show formatter IR", () => {
	// Use looser assertions for the IR output so changes to IR don't break the tests.

	test("javascript", async ({ page }) => {
		await page.goto("/playground?code=bABlAHQAIABhACAAPQAgADUAOwA%3D");
		await toggleView(page, "Formatter IR");
		await page
			.locator(".playground-view-pane")
			.getByLabel("Compare Prettier")
			.check();
		await expect(
			page.getByTestId("biome-ir-output").getByRole("textbox"),
		).toContainText("let");
		await expect(
			page.getByTestId("prettier-ir-output").getByRole("textbox"),
		).toContainText("let");
	});

	test("css", async ({ page }) => {
		await page.goto(
			"/playground?files.main.css=ZABpAHYAIAB7AGMAbwBsAG8AcgA6ACAAYgBsAHUAZQA7AH0A",
		);
		await toggleView(page, "Formatter IR");
		await page
			.locator(".playground-view-pane")
			.getByLabel("Compare Prettier")
			.check();
		await expect(
			page.getByTestId("biome-ir-output").getByRole("textbox"),
		).toContainText("div");
		await expect(
			page.getByTestId("prettier-ir-output").getByRole("textbox"),
		).toContainText("div");
	});

	test("html", async ({ page }) => {
		await page.goto(
			"/playground?files.main.html=PABkAGkAdgA%2BADwALwBkAGkAdgA%2BAA%3D%3D",
		);
		await toggleView(page, "Formatter IR");
		await page
			.locator(".playground-view-pane")
			.getByLabel("Compare Prettier")
			.check();
		await expect(
			page.getByTestId("biome-ir-output").getByRole("textbox"),
		).toContainText("div");
		await expect(
			page.getByTestId("prettier-ir-output").getByRole("textbox"),
		).toContainText("div");
	});
});

test.describe("playground links", () => {
	test("loads code from the hash", async ({ page }) => {
		const code = "let hashValue = 1;";
		await page.goto(`/playground#code=${encodeURIComponent(encodeCode(code))}`);

		await expect(page.getByTestId("editor").getByRole("textbox")).toContainText(
			code,
		);
		await expect(
			page.getByTestId("biome-output").getByRole("textbox"),
		).toContainText(code);
	});

	test("upgrades legacy content parameters to the hash", async ({ page }) => {
		const code = "let legacyValue = 1;";
		await page.goto(
			`/playground?code=${encodeURIComponent(encodeCode(code))}&lineWidth=100`,
		);

		await expect(page.getByTestId("editor").getByRole("textbox")).toContainText(
			code,
		);
		await expect
			.poll(() => {
				const url = new URL(page.url());
				return {
					codeInQuery: url.searchParams.has("code"),
					codeInHash: new URLSearchParams(url.hash.slice(1)).get("code"),
					lineWidth: url.searchParams.get("lineWidth"),
				};
			})
			.toEqual({
				codeInQuery: false,
				codeInHash: encodeCode(code),
				lineWidth: "100",
			});
		await expect
			.poll(() =>
				page.evaluate(() => localStorage.getItem("playground:last-search")),
			)
			.toBe("lineWidth=100");
	});

	test("loads and analyzes files in folders", async ({ page }) => {
		const code = "export const nested = true;";
		const hash = new URLSearchParams({
			"files.src/component.ts": encodeCode(code),
			"files.main.ts": encodeCode('import { nested } from "./src/component";'),
		});
		await page.goto(`/playground#${hash}`);

		await expect(
			page.getByRole("button", { name: "component.ts", exact: true }),
		).toBeVisible();
		await expect(page.getByTestId("editor").getByRole("textbox")).toContainText(
			code,
		);
		await expect(
			page.getByTestId("biome-output").getByRole("textbox"),
		).toContainText(code);
	});

	test("sorts directories and files at every level", async ({ page }) => {
		const hash = new URLSearchParams({
			"files.zeta.ts": encodeCode(""),
			"files.z-dir/zeta.ts": encodeCode(""),
			"files.z-dir/alpha.ts": encodeCode(""),
			"files.alpha.ts": encodeCode(""),
			"files.a-dir/main.ts": encodeCode(""),
		});
		await page.goto(`/playground#${hash}`);

		await expect(
			page
				.locator(".playground-file-tree")
				.locator("summary, .playground-file-open"),
		).toHaveText([
			"a-dir",
			"main.ts",
			"z-dir",
			"alpha.ts",
			"zeta.ts",
			"alpha.ts",
			"zeta.ts",
		]);
	});

	test("renames a file without losing its contents", async ({ page }) => {
		const code = "export const renamed = true;";
		const hash = new URLSearchParams({
			"files.main.ts": encodeCode(code),
			"files.other.ts": encodeCode("export {};"),
		});
		await page.goto(`/playground#${hash}`);

		await page.getByRole("button", { name: "Rename main.ts" }).click();
		const filename = page.getByRole("textbox", { name: "Rename main.ts" });
		await expect(filename).toHaveValue("main.ts");
		await filename.fill("src/renamed.ts");
		await filename.press("Enter");

		await expect(
			page.getByRole("button", { name: "renamed.ts", exact: true }),
		).toBeVisible();
		await expect(page.getByTestId("editor").getByRole("textbox")).toContainText(
			code,
		);
		await expect(page).toHaveURL(/files\.src%2Frenamed\.ts=/);
		await expect(page).not.toHaveURL(/files\.main\.ts=/);
	});

	test("applies a virtual biome.json to source files", async ({ page }) => {
		const hash = new URLSearchParams({
			"files.main.js": encodeCode('const value = "test";'),
			"files.biome.json": encodeCode(
				JSON.stringify({
					javascript: { formatter: { quoteStyle: "single" } },
				}),
			),
		});
		await page.goto(`/playground#${hash}`);

		await expect(
			page.getByTestId("biome-output").getByRole("textbox"),
		).toContainText("const value = 'test';");
	});
});

test.describe("playground layout", () => {
	test("composes formatting and fixes independently", async ({ page }) => {
		await page.goto(
			`/playground?prettier=true#code=${encodeURIComponent(encodeCode("let a=5"))}`,
		);
		const output = page.getByTestId("biome-output").getByRole("textbox");
		const comparePrettier = page.getByLabel("Compare Prettier");
		await expect(output).toContainText("let a = 5;");
		await expect(comparePrettier).toBeChecked();

		await page.getByLabel("Format", { exact: true }).uncheck();
		await expect(output).toContainText("let a=5");
		await expect(page).toHaveURL(/format=false/);
		await expect(comparePrettier).toBeDisabled();
		await expect(comparePrettier).toBeChecked();
		await expect(comparePrettier).toHaveCSS("opacity", "0.45");

		await page.getByLabel("Format", { exact: true }).check();
		await expect(comparePrettier).toBeEnabled();
		await expect(comparePrettier).toBeChecked();
		await expect(page.getByTestId("prettier-output")).toBeVisible();

		await page.getByRole("button", { name: "Safe", exact: true }).click();
		await expect(output).toContainText("const a = 5;");
		await expect(page).toHaveURL(/fix=safeFixes/);
	});

	test("formats with fixes selected when the linter is disabled", async ({
		page,
	}) => {
		await page.goto(
			`/playground?enabledLinting=false&fix=safeFixes#code=${encodeURIComponent(encodeCode("let a=5"))}`,
		);

		await expect(
			page.getByTestId("biome-output").getByRole("textbox"),
		).toContainText("let a = 5;");
	});

	test("ejects settings into a root config", async ({ page }) => {
		await page.goto("/playground");
		await expect(page.getByLabel("Language", { exact: true })).toBeEnabled();
		await page.getByTestId("editor").getByRole("textbox").fill("let a=5");
		await page
			.getByRole("button", { name: "Set line width to 120 characters" })
			.click();
		await page.getByRole("button", { name: "Edit root config" }).click();

		await expect(
			page.getByText("Settings are defined by biome.json"),
		).toBeVisible();
		const editor = page.getByTestId("editor").getByRole("textbox");
		await expect(editor).toContainText('"formatWithErrors"');
		await expect
			.poll(async () => {
				const config = await editor.textContent();
				return JSON.parse(config ?? "{}");
			})
			.toEqual({
				formatter: {
					formatWithErrors: true,
					lineWidth: 120,
				},
				linter: {
					rules: {
						nursery: {
							preset: "none",
						},
					},
				},
				javascript: {
					parser: {
						unsafeParameterDecoratorsEnabled: true,
					},
					experimentalEmbeddedSnippetsEnabled: true,
				},
				css: {
					parser: {
						allowWrongLineComments: true,
						tailwindDirectives: true,
					},
				},
				json: {
					parser: {
						allowComments: true,
					},
				},
				html: {
					formatter: {
						enabled: true,
					},
					experimentalFullSupportEnabled: true,
				},
				markdown: {
					formatter: {
						enabled: true,
					},
				},
				yaml: {
					formatter: {
						enabled: true,
					},
				},
			});
		await expect(page.getByLabel("Language", { exact: true })).toBeDisabled();

		await page.reload();
		await page.getByRole("button", { name: "main.tsx", exact: true }).click();
		await page.getByRole("button", { name: "Safe", exact: true }).click();
		await page.getByLabel("Format", { exact: true }).uncheck();
		await expect(
			page.getByTestId("biome-output").getByRole("textbox"),
		).toContainText("let a=5");

		await page.getByRole("button", { name: "Delete", exact: true }).click();
		await expect(
			page.getByRole("button", { name: "Edit root config" }),
		).toBeVisible();
	});

	test("keeps output visible while opening internal views", async ({
		page,
	}) => {
		await page.goto("/playground?code=bABlAHQAIABhACAAPQAgADUAOwA%3D");
		await toggleView(page, "Syntax tree");
		await expect(page.getByTestId("biome-output")).toBeVisible();
		await expect(page).toHaveURL(/view=syntax/);
		// Views accumulate: both panes stay open, ordered by when they were opened.
		await toggleView(page, "Semantic model");
		await expect(page).toHaveURL(/view=syntax%2Csemantic-model/);
		await expect(page.locator(".playground-view-pane")).toHaveCount(2);
		await expect(page.getByTestId("biome-output")).toBeVisible();
		const editor = await page.locator(".playground-editor").boundingBox();
		const stack = await page.locator(".playground-view-stack").boundingBox();
		const output = await page.locator(".playground-output-stack").boundingBox();
		expect(stack?.x).toBeGreaterThanOrEqual(
			(editor?.x ?? 0) + (editor?.width ?? 0) - 1,
		);
		expect(output?.x).toBeGreaterThanOrEqual(
			(stack?.x ?? 0) + (stack?.width ?? 0) - 1,
		);

		await page.getByRole("button", { name: "Close Syntax tree" }).click();
		await expect(page).toHaveURL(/view=semantic-model/);
		await expect(page.locator(".playground-view-pane")).toHaveCount(1);
		await page.getByRole("button", { name: "Close all" }).click();
		await expect(page.locator(".playground-view-stack")).toHaveCount(0);
		await expect(page).not.toHaveURL(/view=/);
	});

	test("shows syntax tabs and gives formatter IR space", async ({ page }) => {
		await page.goto("/playground?code=bABlAHQAIABhACAAPQAgADUAOwA%3D");
		await toggleView(page, "Syntax tree");
		await expect(page.getByRole("tab", { name: "AST" })).toHaveAttribute(
			"aria-selected",
			"true",
		);
		await expect(page.getByTestId("ast-output")).toBeVisible();
		await page.getByRole("tab", { name: "CST" }).click();
		await expect(page.getByTestId("cst-output")).toBeVisible();
		await expect(page.getByTestId("ast-output")).not.toBeAttached();

		await toggleView(page, "Formatter IR");
		await expect
			.poll(() =>
				page
					.locator(".playground-view-pane-body [data-testid='biome-ir-output']")
					.first()
					.evaluate((element) => element.getBoundingClientRect().height),
			)
			.toBeGreaterThan(0);
	});

	test("constrains resizable panels to usable bounds", async ({ page }) => {
		const resizeKeys = [
			"playground-sidebar",
			"playground-editor",
			"playground-view-stack",
			"playground-biome-output",
			"playground-problems",
		];
		const loadWithSizes = async (sizes: Record<string, number>) => {
			await page.goto("/playground");
			await page.evaluate(
				({ resizeKeys, sizes }) => {
					for (const key of resizeKeys) {
						localStorage.removeItem(`playground:${key}-ratio`);
					}
					for (const [key, size] of Object.entries(sizes)) {
						localStorage.setItem(`playground:${key}-ratio`, String(size));
					}
				},
				{ resizeKeys, sizes },
			);
			await page.goto("/playground?prettier=true");
			await page.getByRole("button", { name: "Internals" }).click();
			await page
				.getByRole("button", { name: "Formatter IR" })
				.evaluate((button) => (button as HTMLButtonElement).click());
			await page.locator(".playground-view-stack").waitFor();
		};

		await loadWithSizes(
			Object.fromEntries(resizeKeys.map((key) => [key, 0.001])),
		);
		for (const [label, minimum] of [
			["playground sidebar", 220],
			["playground editor", 100],
			["playground view stack", 140],
			["playground biome output", 140],
			["playground problems", 150],
		] as const) {
			await expect
				.poll(async () => {
					const handle = page.getByLabel(`Resize ${label}`);
					const box = await handle.locator("..").boundingBox();
					return label === "playground problems" ? box?.height : box?.width;
				})
				.toBeGreaterThanOrEqual(minimum);
		}

		await page.setViewportSize({ width: 769, height: 800 });
		await loadWithSizes(
			Object.fromEntries(resizeKeys.map((key) => [key, 0.001])),
		);
		const narrowShell = await page.locator(".playground-shell").boundingBox();
		const narrowStack = await page
			.locator(".playground-view-stack")
			.boundingBox();
		const narrowOutput = await page
			.locator(".playground-output-stack")
			.boundingBox();
		expect(narrowStack?.width).toBeGreaterThanOrEqual(140);
		expect(
			(narrowOutput?.x ?? 0) + (narrowOutput?.width ?? 0),
		).toBeLessThanOrEqual(
			(narrowShell?.x ?? 0) + (narrowShell?.width ?? 0) + 1,
		);
		await page.setViewportSize({ width: 1280, height: 800 });

		for (const key of resizeKeys) {
			await loadWithSizes({ [key]: 5 });
			const shell = await page.locator(".playground-shell").boundingBox();
			const sidebar = await page.locator(".playground-sidebar").boundingBox();
			const editor = await page.locator(".playground-editor").boundingBox();
			const stack = await page.locator(".playground-view-stack").boundingBox();
			const output = await page
				.locator(".playground-output-stack")
				.boundingBox();
			expect(shell && sidebar && editor && stack && output).toBeTruthy();
			expect(sidebar?.x).toBeGreaterThanOrEqual(shell?.x ?? 0);
			expect(editor?.x).toBeGreaterThanOrEqual(
				(sidebar?.x ?? 0) + (sidebar?.width ?? 0) - 1,
			);
			expect(stack?.x).toBeGreaterThanOrEqual(
				(editor?.x ?? 0) + (editor?.width ?? 0) - 1,
			);
			expect(output?.x).toBeGreaterThanOrEqual(
				(stack?.x ?? 0) + (stack?.width ?? 0) - 1,
			);
			expect((output?.x ?? 0) + (output?.width ?? 0)).toBeLessThanOrEqual(
				(shell?.x ?? 0) + (shell?.width ?? 0) + 1,
			);
			const outputStack = page.locator(".playground-output-stack");
			const biomePane = await outputStack
				.locator(".playground-output-pane")
				.first()
				.boundingBox();
			const prettierPane = await outputStack
				.locator(".playground-output-pane")
				.nth(1)
				.boundingBox();
			const codeOutput = await outputStack
				.locator(".playground-code-output")
				.boundingBox();
			const problems = await page.locator(".playground-problems").boundingBox();
			expect((biomePane?.x ?? 0) + (biomePane?.width ?? 0)).toBeLessThanOrEqual(
				(codeOutput?.x ?? 0) + (codeOutput?.width ?? 0),
			);
			expect(prettierPane?.width).toBeGreaterThanOrEqual(140);
			expect(codeOutput?.height).toBeGreaterThanOrEqual(120);
			expect((problems?.y ?? 0) + (problems?.height ?? 0)).toBeLessThanOrEqual(
				(output?.y ?? 0) + (output?.height ?? 0) + 1,
			);
		}

		const gritCode = encodeURIComponent(
			encodeCode('console.log("a");\nconsole.log("b");'),
		);
		for (const size of [0.001, 5]) {
			await page.goto("/playground");
			await page.evaluate((size) => {
				localStorage.setItem("playground:gritql-matches-ratio", String(size));
			}, size);
			await page.goto(`/playground#code=${gritCode}`);
			await page.getByRole("button", { name: "GritQL search" }).click();
			await page
				.locator(".gritql-panel .cm-content")
				.fill("`console.log($message)`");
			const handle = page.getByLabel("Resize gritql matches");
			await handle.waitFor();
			const matchList = await handle.locator("..").boundingBox();
			const gritPanel = await page.locator(".gritql-panel").boundingBox();
			expect(matchList?.height).toBeGreaterThanOrEqual(100);
			expect(
				(matchList?.y ?? 0) + (matchList?.height ?? 0),
			).toBeLessThanOrEqual((gritPanel?.y ?? 0) + (gritPanel?.height ?? 0));
		}
	});

	test("moves navigation into mobile drawers", async ({ page }) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto("/playground");
		await expect(
			page.getByRole("button", { name: "Files & settings" }),
		).toBeVisible();
		await page.getByRole("button", { name: "Internals" }).click();
		await expect(
			page.getByRole("button", { name: "GritQL search" }),
		).toBeVisible();
	});
});
