// Accessibility tests for the searchable Lint Rules / Assist Actions dropdown
// (`RuleSelect`): axe scans of each state, plus the names, roles, states,
// keyboard support and focus handling that axe can't check on its own.

import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

const WCAG_TAGS = [
	"wcag2a",
	"wcag2aa",
	"wcag21a",
	"wcag21aa",
	"wcag22aa",
	"best-practice",
];

/** Runs axe against the elements matching `selector` and expects no violations. */
async function expectNoAxeViolations(page: Page, selector: string) {
	const { violations } = await new AxeBuilder({ page })
		.include(selector)
		.withTags(WCAG_TAGS)
		.analyze();
	expect(
		violations.map(({ id, help, nodes }) => ({
			id,
			help,
			targets: nodes.map((node) => node.target.join(" ")),
		})),
	).toEqual([]);
}

/** The element referenced by the search box's `aria-activedescendant`. */
async function activeOption(page: Page) {
	const search = page.getByRole("combobox", { name: "Search rules" });
	const id = await search.getAttribute("aria-activedescendant");
	expect(id).toBeTruthy();
	return page.locator(`[id="${id}"]`);
}

test.describe("rule select accessibility", () => {
	test.describe("desktop", () => {
		test.beforeEach(async ({ page }) => {
			await page.goto("/playground?lintRules=noConsole#code=");
			await expect(
				page.getByRole("combobox", { name: "Lint Rules" }),
			).toBeVisible();
		});

		test("triggers expose their label, value and popup", async ({ page }) => {
			const lintRules = page.getByRole("combobox", { name: "Lint Rules" });
			await expect(lintRules).toMatchAriaSnapshot(
				`- combobox "Lint Rules": noConsole`,
			);
			await expect(lintRules).toHaveAttribute("aria-expanded", "false");
			await expect(lintRules).toHaveAttribute("aria-haspopup", "dialog");

			await expect(
				page.getByRole("combobox", { name: "Assist Actions" }),
			).toMatchAriaSnapshot(`- combobox "Assist Actions": recommended`);

			await expectNoAxeViolations(page, ".rule-select-trigger");
		});

		test("popup is a labelled dialog with a searchable listbox", async ({
			page,
		}) => {
			const lintRules = page.getByRole("combobox", { name: "Lint Rules" });
			await lintRules.click();
			await expect(lintRules).toHaveAttribute("aria-expanded", "true");

			const popup = page.getByRole("dialog", { name: "Lint Rules" });
			await expect(popup).toMatchAriaSnapshot(`
				- dialog "Lint Rules":
				  - combobox "Search rules" [expanded]
				  - listbox "Lint Rules":
				    - group "preset":
				      - option "recommended"
				      - option "all"
				      - option "none"
				    - group "suspicious":
				      - option "noConsole" [selected]
			`);
			const search = popup.getByRole("combobox", { name: "Search rules" });
			await expect(search).toBeFocused();
			await expect(search).toHaveAttribute("aria-autocomplete", "list");
			await expect(search).toHaveAttribute(
				"aria-controls",
				(await popup.getByRole("listbox").getAttribute("id")) ?? "",
			);
			await expectNoAxeViolations(page, ".rule-select-popup");

			// Searching flattens the groups into a ranked list and moves the
			// highlight to the best match.
			await search.fill("nconsl");
			await expect(popup).toMatchAriaSnapshot(`
				- listbox "Lint Rules":
				  - group:
				    - option "noConsole suspicious" [selected]
				    - option "noConfusingLabels suspicious"
			`);
			await expect(await activeOption(page)).toHaveText(/^noConsole/);
			await expectNoAxeViolations(page, ".rule-select-popup");
		});

		test("can be used with the keyboard alone", async ({ page }) => {
			const lintRules = page.getByRole("combobox", { name: "Lint Rules" });
			await lintRules.focus();
			await page.keyboard.press("Enter");

			const search = page.getByRole("combobox", { name: "Search rules" });
			await expect(search).toBeFocused();
			// Opening highlights the current value.
			await expect(await activeOption(page)).toHaveText("noConsole");

			await page.keyboard.type("nconsl");
			await expect(await activeOption(page)).toHaveText(/^noConsole/);
			await page.keyboard.press("ArrowDown");
			await expect(await activeOption(page)).toHaveText(/^noConfusingLabels/);
			await page.keyboard.press("ArrowUp");
			await expect(await activeOption(page)).toHaveText(/^noConsole/);
			await page.keyboard.press("ArrowDown");
			await page.keyboard.press("Enter");

			await expect(search).toBeHidden();
			await expect(lintRules).toBeFocused();
			await expect(lintRules).toHaveAttribute("aria-expanded", "false");
			await expect(lintRules).toMatchAriaSnapshot(
				`- combobox "Lint Rules": noConfusingLabels`,
			);
		});

		test("Escape closes without changing the value", async ({ page }) => {
			const lintRules = page.getByRole("combobox", { name: "Lint Rules" });
			await lintRules.click();
			const search = page.getByRole("combobox", { name: "Search rules" });
			await search.fill("debugger");
			await search.press("Escape");

			await expect(search).toBeHidden();
			await expect(lintRules).toBeFocused();
			await expect(lintRules).toMatchAriaSnapshot(
				`- combobox "Lint Rules": noConsole`,
			);
		});

		test("announces when nothing matches", async ({ page }) => {
			await page.getByRole("combobox", { name: "Lint Rules" }).click();
			const popup = page.getByRole("dialog", { name: "Lint Rules" });
			const status = popup.getByRole("status");
			await expect(status).toHaveAttribute("aria-live", "polite");
			await expect(status).toBeEmpty();

			await popup.getByRole("combobox", { name: "Search rules" }).fill("zzzz");
			await expect(status).toHaveText("No matches");
			await expect(popup.getByRole("option")).toHaveCount(0);
			await expectNoAxeViolations(page, ".rule-select-popup");
		});

		test("is disabled along with its section", async ({ page }) => {
			await page.getByLabel("Linter enabled", { exact: true }).uncheck();
			const lintRules = page.getByRole("combobox", { name: "Lint Rules" });
			await expect(lintRules).toBeDisabled();
			await expectNoAxeViolations(page, ".rule-select-trigger");
		});
	});

	test.describe("mobile", () => {
		test.use({ viewport: { width: 390, height: 844 } });

		test.beforeEach(async ({ page }) => {
			await page.goto("/playground?lintRules=noConsole#code=");
			await page.getByRole("button", { name: "Files & settings" }).click();
		});

		test("trigger names its label and current value", async ({ page }) => {
			const lintRules = page.getByRole("button", {
				name: "Lint Rules noConsole",
			});
			await expect(lintRules).toHaveAttribute("aria-haspopup", "dialog");
			await expect(lintRules).toHaveAttribute("aria-expanded", "false");
			await expectNoAxeViolations(page, ".rule-select-trigger");
		});

		test("opens a modal dialog that traps focus", async ({ page }) => {
			const lintRules = page.getByRole("button", {
				name: "Lint Rules noConsole",
			});
			await lintRules.click();
			// The modal dialog hides the rest of the page, trigger included.
			await expect(
				page.getByRole("button", {
					name: "Lint Rules noConsole",
					includeHidden: true,
				}),
			).toHaveAttribute("aria-expanded", "true");

			const dialog = page.getByRole("dialog", { name: "Lint Rules" });
			// Base UI makes the dialog modal by hiding everything else from
			// assistive technology (and making it inert), not with `aria-modal`.
			const assistActions = page.getByRole("button", {
				name: /^Assist Actions/,
			});
			await expect(assistActions).toHaveCount(0);
			await expect(dialog).toMatchAriaSnapshot(`
				- dialog "Lint Rules":
				  - heading "Lint Rules"
				  - button "Close"
				  - combobox "Search rules" [expanded]
				  - listbox "Lint Rules"
			`);
			await expect(
				dialog.getByRole("combobox", { name: "Search rules" }),
			).toBeFocused();
			await expectNoAxeViolations(page, ".rule-select-dialog");

			// Tabbing never leaves the dialog. Base UI's focus guards can briefly
			// take focus before moving it back in, so wait for focus to settle.
			for (const key of ["Tab", "Tab", "Tab", "Shift+Tab", "Shift+Tab"]) {
				await page.keyboard.press(key);
				await expect
					.poll(() =>
						dialog.evaluate((element) =>
							element.contains(document.activeElement),
						),
					)
					.toBe(true);
			}

			await page.keyboard.press("Escape");
			await expect(dialog).toBeHidden();
			await expect(lintRules).toBeFocused();
			await expect(assistActions).toHaveCount(1);
		});

		test("picking a rule closes the dialog and returns focus", async ({
			page,
		}) => {
			await page.getByRole("button", { name: "Lint Rules noConsole" }).click();
			const dialog = page.getByRole("dialog", { name: "Lint Rules" });
			const search = dialog.getByRole("combobox", { name: "Search rules" });
			await search.fill("unusedvar");
			await expect(dialog.getByRole("status")).toBeEmpty();
			await expectNoAxeViolations(page, ".rule-select-dialog");
			await search.press("Enter");

			await expect(dialog).toBeHidden();
			await expect(
				page.getByRole("button", { name: "Lint Rules noUnusedVariables" }),
			).toBeFocused();
		});
	});

	test.describe("touch", () => {
		test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

		test("opening by touch doesn't raise the on-screen keyboard", async ({
			page,
		}) => {
			await page.goto("/playground?lintRules=noConsole#code=");
			await page.getByRole("button", { name: "Files & settings" }).tap();
			await page.getByRole("button", { name: "Lint Rules noConsole" }).tap();

			const dialog = page.getByRole("dialog", { name: "Lint Rules" });
			await expect(dialog).toBeFocused();
			await expect(
				dialog.getByRole("combobox", { name: "Search rules" }),
			).not.toBeFocused();
		});
	});
});
