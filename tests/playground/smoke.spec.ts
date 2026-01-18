// Smoke tests for the playground to ensure that the basic functionality works.

import { expect, test } from "@playwright/test";

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
