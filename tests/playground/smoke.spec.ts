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
