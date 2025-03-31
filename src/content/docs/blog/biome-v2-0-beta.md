---
title: Biome v2.0 beta
description: A major milestone in the making
summary: |
  Biome 2.0 will be packed with major features and many smaller fixes, rules, and other improvements.
  There's a lot to unpack, and we request the community's help testing this beta, so the final
  release can be as smooth as possible.
authors:
  - arendjr
  - dyc3
  - team
date: 2025-03-24
cover:
  light: "@/assets/blog/roadmap-2024/banner-light.png"
  dark: "@/assets/blog/roadmap-2024/banner-dark.png"
  alt: The brand of the project. It says "Biome, toolchain of the web"
socialImage: "@/assets/social-logo.png"
---

After hard work from our team, Biome's long-awaited 2.0 release is nearing completion. It will be packed with many large features, so we would like your help testing it with a public beta!

If you would like to try it out, you can update Biome and migrate your configuration using the following commands:

```shell
npm install --save-dev --save-exact @biomejs/biome@beta
npx @biomejs/biome@beta migrate
```

Also, make sure you use the prereleases of our IDE extensions. The stable versions of our extensions are not yet prepared for Biome 2.0!

Documentation for the upcoming release can be found at https://next.biomejs.dev/.

## New features

While the final 2.0 release may still have small changes in its final feature set, here's what you can expect in the beta:

- **Plugins:** You can write custom lint rules using GritQL.
- **Domains:** Domains help to group lint rules by technology, framework, or well, domain. Thanks to domains, your default set of recommended lint rules will only include those that are relevant to your project.
- **Multi-file analysis:** Lint rules can now apply analysis based on information from other files, enabling rules such as `noImportCycles`.
- **`noFloatingPromises`:** Still a proof-of-concept, but our first type-aware lint rule is making an appearance.
- Our **Import Organizer** has seen a major revamp.
- **Assists:** Biome Assist can provide actions without diagnostics, such as sorting object keys.
- **Improved suppressions:** Suppress a rule in an entire file using `// biome-ignore-all`, or suppress a range using `// biome-ignore-start` and `// biome-ignore-end`.
- **HTML formatter:** Still in preview, this is the first time we ship an HTML formatter.
- Many, **many**, fixes, new lint rules, and other improvements.

### Plugins

Biome 2.0 comes with our first iteration of [Linter Plugins](/linter/plugins).

These plugins are still limited in scope: They allow for matching code snippets and reporting diagnostics on them.

Here is an example of a plugin that reports on all usages of `Object.assign()`:

```grit
`$fn($args)` where {
    $fn <: `Object.assign`,
    register_diagnostic(
        span = $fn,
        message = "Prefer object spread instead of `Object.assign()`"
    )
}
```

It's a first step, but we have plenty of ideas for making them more powerful, and we'll eagerly hear from our users on what they would like to see prioritised.

### Domains

We've introduced a new linter feature: [Domains](https://next.biomejs.dev/linter/domains/).

Domains are a new way to organise lint rules by technology, framework, or well, domain. Right now, we have identified four domains:

- `next`: Rules related to Next.js.
- `react`: Rules related to React.
- `solid`: Rules related to Solid.js.
- `test`: Rules related to testing, regardless of framework or library.

You can enable and disable rules that belong to a domain together:

```json5
// biome.jsonc
{
  "linter": {
    "domains": {
      "test": "all", // all rules that belong to this domain are enabled
      "react": "recommended", // only the recommended rules from this domain are enabled
      "solid": "none" // rules related to Solid are disabled
    }
  }
}
```

But it gets better: Biome will automatically inspect your `package.json` and determine which domains should be enabled by default. For instance, if you have `react` defined as one of your dependencies, the default setting for the `react` domain automatically becomes `recommended`.

This way, Biome's total set of recommended rules should be most relevant to your specific project needs.

And finally, domains can add global variables to the `javascript.globals` setting. This should make Biome even easier to setup.

### Multi-file analysis

Before version 2.0, Biome lint rules could only operate on one file at a time. This brought us far, but many of the more interesting rules require information from other files too.

To accomplish this, we have added a _file scanner_ to Biome that scans all the files in your project and indexes them, similar to what an LSP service might do in your IDE. We're not going to beat around the bush: Scanning projects means that Biome has become slower for many projects. But we do believe the ability to do multi-file analysis is worth it. And without a scanner, multi-file analysis would become _even slower_, as rules would need to perform ad-hoc file system access individually.

That said, this is a beta, and there are certainly more opportunities to improve our scanner and its performance. If you have a repository where you feel our performance became unacceptably slow, please reach out and [file an issue](https://github.com/biomejs/biome/issues/new?template=03_bug.yml).

For now, we have a few interesting rules that can make use of our multi-file analysis:

- [`noImportCycles`](https://next.biomejs.dev/linter/rules/no-import-cycles/) is able to look at import statements and detect cycles between them.
- [`noPrivateImports`](https://next.biomejs.dev/linter/rules/no-private-imports/) is a new rule based on the `useImportRestrictions` nursery rule from Biome 1.x, and inspired by ESLint's [`plugin-import-access`](https://github.com/uhyo/eslint-plugin-import-access). It forbids importing symbols with an `@private` JSDoc tag from other modules, and forbids importing symbols with an `@package` tag if the importing file is not in the same folder or one of its subfolders.
- [`useImportExtensions`](https://next.biomejs.dev/linter/rules/use-import-extensions/) has been improved because it can now determine the actual extension that needs to be used for an import, instead of guessing based on hueristics.

Finally, we've also designed the multi-file analysis with monorepos in mind. While full monorepo support may not make it in time for the 2.0 release, we expect to be able to deliver more on this front soon.

### `noFloatingPromises`

With Biome's linter we have always strived to provide a battery-included approach to linting. This means we're not just aiming to replace ESLint, but also its plugins. One of the hardest plugins to replace is **`typescript-eslint`**.

Biome has featured some rules from `typescript-eslint` for a while now, but we could never replace all rules, because they relied on type information for their analysis. And in order to get type information, `typescript-eslint` relies on `tsc` itself, which is rather slow and also complicates setup.

This is about to change. With Biome 2.0, we're introducing a first version of the [`noFloatingPromises`](https://next.biomejs.dev/linter/rules/no-floating-promises) rule, one of the most-requested rules that relies on type information. In fairness, we should not consider it more than a proof-of-concept right now, because there are some notable limitations to its capabilities:

* It doesn't understand complex types yet.
* It cannot do type inference yet.
* It can currently only analyse types that occur in the same file.

Still, its capabilities are sufficient to catch some of the low-hanging fruit. Consider this small snippet:

```js title="example.js"
async function returnsPromise() { /* ... */ }

returnsPromise().then(() => {});
```

It will trigger the following diagnostic:

```
example.js:3:1 lint/nursery/noFloatingPromises ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ℹ A “floating” Promise was found, meaning it is not properly handled and could lead to ignored errors or unexpected behavior.
  
    1 │ async function returnsPromise() { /* ... */ }
    2 │ 
  > 3 │ returnsPromise().then(() => {});
      │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    5 │ 
  
  ℹ This happens when a Promise is not awaited, lacks a .catch or .then rejection handler, or is not explicitly ignored using the void operator.
```

As you can guess, we intend to expand this rule's capabilities over time. And with our new multi-file analysis in place, we expect to be able to make serious strides with this. Stay tuned for more announcements on this front!

### Import Organizer Revamp

In Biome 1.x, our Import Organizer had several limitations:

* Groups of imports or exports would be considered separate _chunks_, meaning they would be sorted independently. This meant the following **didn't work** as expected:

  ```js title="example.js"
  import { lib2 } from "library2";

  import { util } from "./utils.js";
  import { lib1 } from "library1";
  ```

  It would correctly sort `"library1"` to be placed above `"./utils.js"`, but it wouldn't be able to
  carry it over the newline to the top. What we got was this:

  ```js title="organizer_v1.js"
  import { lib2 } from "library2";

  import { lib1 } from "library1";
  import { util } from "./utils.js";
  ```

  But instead, what we really wanted was this:

  ```js title="organizer_v2.js"
  import { lib1 } from "library1";
  import { lib2 } from "library2";

  import { util } from "./utils.js";
  ```

* Separate imports from the same module wouldn't be merged. Consider the following example:

  ```js title="example.js"
  import { util1 } from "./utils.js";
  import { util2 } from "./utils.js";
  ```

  Nothing would be done to merge these import statements, whereas what we would have wanted was this:

  ```js title="organizer_v2.js"
  import { util1, util2 } from "./utils.js";
  ```

* No custom ordering could be configured. Maybe you didn't really like the default approach of ordering by "distance" from the source file that you're importing from. Maybe you wanted to organise like this:

  ```js title="organizer_v2.js"
  import { open } from "node:fs";

  import { internalLib1 } from "@company/library1";
  import { internalLib2 } from "@company/library2";

  import { lib1 } from "library1";
  ```

In Biome 2.0, all these limitations are lifted. In fact, if you look at the examples above, all snippets labeled `organizer_v2.js` can be produced just like that by our new import organizer.

Other improvements include support for organizing `export` statements, support for "detached" comments for explicitly separating import chunks if necessary, and import attribute sorting.

You can find the documentation on the new import organizer at https://next.biomejs.dev/assist/actions/organize-imports/.

### Assists

The Import Organizer was always a bit of a special case in Biome. It was neither part of the linter, nor of the formatter. This was because we didn't want it to show diagnostics the way the linter does, while its organizing features went beyond what we expect from the formatter.

In Biome 2.0, we have generalised such use cases in the form of Biome Assist. The assist is meant to provide **actions**, which are similar to the _fixes_ in lint rules, but without the diagnostics.

The Import Organizer has become an assist, but we've started using this approach for new assists too: [`useSortedKeys`](https://next.biomejs.dev/assist/actions/use-sorted-keys/) can sort keys in object literals, while [`useSortedAttributes`](https://next.biomejs.dev/assist/actions/use-sorted-attributes/) can sort attributes in JSX.

For more information about assists, see: https://next.biomejs.dev/assist/

### Improved suppressions

In addition to the `// biome-ignore` comments we already supported, we now support `// biome-ignore-all` for suppressing a lint rule or the formatter in an entire file.

We also added support for suppression ranges using `// biome-ignore-start` and `// biome-ignore-end`. Note that `// biome-ignore-end` is optional in case you want to let a range run until the end of the file.

For more information about suppressions, see: https://next.biomejs.dev/linter/#suppress-lint-rules

### HTML formatter

After a few months of hard work, we are happy to announce that the HTML formatter is now ready for users to try out and start reporting bugs! This is a huge step towards Biome fully supporting HTML-ish templating languages used in frameworks like Vue and Svelte.

The HTML formatter only touches actual `.html` files for now, so no formatting of html in `.vue` or `.svelte` files yet. It also won't format embedded languages like JavaScript or CSS yet. HTML's options like `attributePosition`, `bracketSameLine`, and `whitespaceSensitivity` have been implemented.

The HTML formatter is still pretty experimental, so it will remain **disabled by default for the full 2.0 release**. At the time of writing, Biome is able to parse the grand majority of Prettier's HTML tests, and format 46/124 of them correctly. Despite not matching Prettier yet, we're pretty confident that it _should_ output documents that are formatted adequately without destroying anything. If you find a case where it doesn't, [please let us know](https://github.com/biomejs/biome/issues)!

You can enable the HTML formatter by adding the following to your config file:

```json
{
  "html": {
    "formatter": {
      "enabled": true
    }
  }
}
```

### New rules

Several new rules have added since v1.9:

- [`noAwaitInLoop`](https://next.biomejs.dev/linter/rules/no-await-in-loop)
- [`noBitwiseOperators`](https://next.biomejs.dev/linter/rules/no-bitwise-operators/)
- [`noDestructuredProps`](https://next.biomejs.dev/linter/rules/no-destructured-props/)
- [`noFloatingPromises`](https://next.biomejs.dev/linter/rules/no-floating-promises)
- [`noImportCycles`](https://next.biomejs.dev/linter/rules/no-import-cycles)
- [`noPrivateImports`](https://next.biomejs.dev/linter/rules/no-private-imports/)
- [`noTsIgnore`](https://next.biomejs.dev/linter/rules/no-ts-ignore)
- [`noUnwantedPolyfillio`](https://next.biomejs.dev/linter/rules/no-unwanted-polyfillio)
- [`useConsistentObjectDefinition`](https://next.biomejs.dev/linter/rules/use-consistent-object-definition/)
- [`useForComponent`](https://next.biomejs.dev/linter/rules/use-for-component/)

### Miscellaneous

- **BREAKING:** The configuration fields `include` and `ignore` have been replaced with a single `includes` field.
- **BREAKING:** Reworked some recommended rules recommended to be less pedantic and blocking. This is a breaking change if your project relied on those rules to block the CI in case of violations. If you used the `migrate` command, the behaviour should remain as before.
- **BREAKING:** The `style` rules aren't recommended anymore. If you used the `migrate` command, the behaviour should remain as before.
- **BREAKING:** Removed deprecated rules:
  - `noConsoleLog`
  - `noInvalidNewBuiltin`
  - `noNewSymbol`
  - `useShorthandArrayType`
  - `useSingleCaseStatement`
- **BREAKING:** Many deprecated options, including some that still referenced the old Rome name, have been removed.
- Added a new option `javascript.parser.jsxEverywhere` to control whether Biome should expect JSX syntax in `.js`/`.mjs`/`.cjs` files.
- Improved monorepo support: The rule [`noUndeclaredDependencies`](https://biomejs.dev/linter/rules/no-undeclared-dependencies/) now works correctly in monorepos by using the nearest `package.json` file, instead of only the root one.
- We have enabled support for `.editorconfig` files by default.
- Changed default formatting of `package.json` to align better with formatting by package managers.

### And more!

For the full list of changes, please refer to our [changelog](/internals/changelog/).
