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
date: 2025-03-31
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

## New features

While the final 2.0 release may still have small changes in its final feature set, here's what you can expect in the beta:

- **Plugins:** You can write custom lint rules using GritQL.
- **Domains:** Domains help to group lint rules by technology, framework, or well, domain. Thanks to domains, your default set of recommended lint rules will only include those that are relevant to your project.
- **Multi-file analysis:** Lint rules can now apply analysis based on information from other files, enabling rules such as `noImportCycles`.
- **`noFloatingPromises`:** Still a proof-of-concept, but our first type-aware lint rule is making an appearance.
- **Assists:** Biome Assist can provide actions without diagnostics, such as sorting object keys. Our import organiser has also become an assist.
- **Improved suppressions:** Suppress a rule in an entire file using `// biome-ignore-all`, or suppress a range using `// biome-ignore-start` and `// biome-ignore-end`.
- **HTML formatter:** Still in preview, this is the first time we ship an HTML formatter.
- Many, **many**, fixes, new lint rules, and other improvements.

### Plugins

Biome 2.0 comes with our first iteration of [Analyzer Plugins](/analyzer/plugins).

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

For now, we have a few interesting rules that can make use of our multi-file analysis:

- `noImportCycles` is able to look at import statements and detect cycles between files.
- `useImportExtensions` has been improved because it can now determine the actual extension that needs to be used for an import, instead of guessing based on hueristics.

Finally, we've also designed the multi-file analysis with monorepos in mind. While full monorepo support may not make it in time for the 2.0 release, we expect to be able to deliver more on this front soon.

### Assists

Biome Assist is another new feature of the Biome analyzer. The assist is meant to provide **actions**, which differ from lint rules in that they aren't meant to signal errors.

An example of a new assist is the `useSortedKeys` action, which can sort the keys in object literals.

Our existing import organizer has also been migrated to become an assist.

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

- [`noAwaitInLoop`](https://biomejs.dev/linter/rules/no-await-in-loop)
- [`noBitwiseOperators`](https://biomejs.dev/linter/rules/no-bitwise-operators/)
- [`noDestructuredProps`](https://biomejs.dev/linter/rules/no-destructured-props/)
- [`noFloatingPromises`](https://biomejs.dev/linter/rules/no-floating-promises)
- [`noImportCycles`](https://biomejs.dev/linter/rules/no-import-cycles)
- [`noTsIgnore`](https://biomejs.dev/linter/rules/no-ts-ignore)
- [`noUnwantedPolyfillio`](https://biomejs.dev/linter/rules/no-unwanted-polyfillio)
- [`useConsistentObjectDefinition`](https://biomejs.dev/linter/rules/use-consistent-object-definition/)
- [`useForComponent`](https://biomejs.dev/linter/rules/use-for-component/)

### Miscellaneous

- **BREAKING:** The configuration fields `include` and `ignore` have been replaced with a single `includes` field.
- **BREAKING:** Reworked some recommended rules recommended to be less pedantic and blocking. This is a breaking change if your project relied on those rules to block the CI in case of violations. If you used the `migrate` command, the behaviour should remain as before.
- **BREAKING:** The `style` rules aren't recommended anymore. If you used the `migrate` command, the behaviour should remain as before.
- **BREAKING:** Cleaned up deprecated rules:
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
