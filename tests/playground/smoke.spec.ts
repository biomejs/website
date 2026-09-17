// Smoke tests for the playground to ensure that the basic functionality works.

import { expect, test } from "@playwright/test";

function encodeCode(code: string): string {
	return Buffer.from(code, "utf16le").toString("base64");
}

test.describe("playground should format code", () => {
	test.describe("on navigation", () => {
		test("javascript", async ({ page }) => {
			await page.goto("/playground?code=bABlAHQAIABhACAAPQAgADUAOwA%3D");
			await expect(
				page.getByTestId("biome-output").getByRole("textbox"),
			).toContainText("let a = 5;");
			await expect(
				page.getByTestId("prettier-output").getByRole("textbox"),
			).toContainText("let a = 5;");
		});

		test("css", async ({ page }) => {
			await page.goto(
				"/playground?files.main.css=ZABpAHYAIAB7AGMAbwBsAG8AcgA6ACAAYgBsAHUAZQA7AH0A",
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
				"/playground?files.main.html=PABkAGkAdgA%2BADwALwBkAGkAdgA%2BAA%3D%3D",
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
		await page.getByRole("tab", { name: "Formatter IR" }).click();
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
		await page.getByRole("tab", { name: "Formatter IR" }).click();
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
		await page.getByRole("tab", { name: "Formatter IR" }).click();
		await expect(
			page.getByTestId("biome-ir-output").getByRole("textbox"),
		).toContainText("div");
		await expect(
			page.getByTestId("prettier-ir-output").getByRole("textbox"),
		).toContainText("div");
	});
});

test.describe("playground links", () => {
	for (const { path, rule, category, language, code, fixed } of [
		{
			path: "linter/rules/no-console/javascript",
			rule: "noConsole",
			category: "lint",
			language: "js",
			code: "console.error('hello world')\n",
		},
		{
			path: "linter/rules/no-misleading-character-class/javascript",
			rule: "noMisleadingCharacterClass",
			category: "lint",
			language: "js",
			code: "/^[A\u0301]$/u;\n",
		},
		{
			path: "linter/rules/no-aria-hidden-on-focusable/javascript",
			rule: "noAriaHiddenOnFocusable",
			category: "lint",
			language: "jsx",
			code: '<div aria-hidden="true" tabIndex="0" />\n',
		},
		{
			path: "linter/rules/no-duplicate-properties/css",
			rule: "noDuplicateProperties",
			category: "lint",
			language: "css",
			code: "a {\n  color: pink;\n  color: orange;\n}\n",
		},
		{
			path: "assist/actions/use-sorted-keys/json",
			rule: "useSortedKeys",
			category: "assist",
			language: "json",
			code: '{\n    "vase": "fancy",\n    "nested": {\n        "omega": "bar",\n        "alpha": "foo"\n    }\n}\n',
			fixed: /"alpha"[\s\S]*"omega"[\s\S]*"vase"/,
		},
		{
			path: "assist/actions/use-sorted-attributes/html",
			rule: "useSortedAttributes",
			category: "assist",
			language: "html",
			code: '<input type="text" id="name" name="name" />\n',
			fixed: /<input id="name" name="name" type="text"/,
		},
	]) {
		test(`loads the first invalid example for ${rule}`, async ({ page }) => {
			await page.goto(`/${path}/`);
			const relatedLinks = page.locator(".sl-markdown-content > ul").last();
			const link = relatedLinks.getByRole("link", {
				name: "Try in the playground",
			});
			await expect(link).toHaveCount(1);

			const url = new URL((await link.getAttribute("href"))!, page.url());
			expect([...url.searchParams]).toEqual([
				["lintRules", category === "lint" ? rule : "none"],
				["assistActions", category === "assist" ? rule : "none"],
				["language", language],
			]);
			expect([...new URLSearchParams(url.hash.slice(1))]).toEqual([
				["code", encodeCode(code)],
			]);

			const popup = page.waitForEvent("popup");
			await link.click();
			const playground = await popup;
			await expect(
				playground.getByTestId("editor").locator(".cm-line"),
			).toHaveText(code.split("\n"));
			const diagnostics = playground.locator(".diagnostics-list li");
			await expect(diagnostics).not.toHaveCount(0);
			await expect(diagnostics.filter({ hasNotText: rule })).toHaveCount(0);
			await expect(
				playground.getByLabel("Lint Rules", { exact: true }),
			).toHaveValue(category === "lint" ? rule : "none");
			await expect(
				playground.getByLabel("Assist Actions", { exact: true }),
			).toHaveValue(category === "assist" ? rule : "none");
			if (fixed) {
				await playground.getByRole("tab", { name: "Analyzer Fixes" }).click();
				await expect(
					playground.getByTestId("analyzer-fixes").getByRole("textbox"),
				).toContainText(fixed);
			}
		});
	}

	test("keeps lint rules and assist actions separate", async ({ page }) => {
		await page.goto("/playground?lintRules=none");
		const lintRules = page.getByLabel("Lint Rules", { exact: true });
		const assistActions = page.getByLabel("Assist Actions", { exact: true });
		await expect(
			lintRules.locator('option[value="organizeImports"]'),
		).toHaveCount(0);
		await expect(
			assistActions.locator('option[value="noConsole"]'),
		).toHaveCount(0);
		await assistActions.selectOption("useSortedKeys");
		await page
			.getByTestId("editor")
			.getByRole("textbox")
			.fill('{"b": 1, "a": 2}');
		await expect(page.locator(".diagnostics-list")).toContainText(
			"assist/source/useSortedKeys",
		);
		await expect
			.poll(() => new URL(page.url()).searchParams.get("assistActions"))
			.toBe("useSortedKeys");
		await page.reload();
		await expect(assistActions).toHaveValue("useSortedKeys");
		await expect(lintRules).toHaveValue("none");
		await page.getByLabel("Assist enabled", { exact: true }).uncheck();
		await expect(assistActions).toBeDisabled();
	});

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
			page.locator(".files-list li").filter({ hasText: "src/component.ts" }),
		).toBeVisible();
		await expect(page.getByTestId("editor").getByRole("textbox")).toContainText(
			code,
		);
		await expect(
			page.getByTestId("biome-output").getByRole("textbox"),
		).toContainText(code);
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
