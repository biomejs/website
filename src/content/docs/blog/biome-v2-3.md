---
title: 'Biome v2.3'
excerpt: |
  Biome 2.3 brings full support (experimental) for Vue, Svelte and Astro, new syntax to ignore paths, new reporters and more.
authors:
  - ema
  - team
date: 2025-10-07
cover:
    light: "@/assets/blog/roadmap-2024/banner-light.png"
    dark: "@/assets/blog/roadmap-2024/banner-dark.png"
    alt: The brand of the project. It says "Biome, toolchain of the web"
socialImage: "@/assets/social-logo.png"
featured: true
---

We're excited to announce the release of Biome 2.3, bringing several features that have been highly requested by the community. This release marks a significant milestone in our journey to support the entire web ecosystem.

Once you have upgraded to Biome v2.3.0, migrate your Biome configuration to the new version by running the `migrate` command:

```shell
biome migrate --write
```

## Full support for Vue, Svelte, and Astro

Biome 2.3 introduces full support for Vue, Svelte, and Astro files. This means you can now format and lint the JavaScript and TypeScript code inside `<script>` tags, as well as the CSS inside `<style>` tags in these frameworks. The HTML/template portions of these files are also parsed and formatted according to Biome's HTML formatting rules.

This is a feature that many developers have been asking for, and we're thrilled to finally deliver it. Achieving this has had its challenges, and it required extensive trials to get the architecture right based on the constraints of the toolchain. If you're curious about the technical implications, read the [below paragraph](#technical-deep-dive-how-we-achieved-full-support-for-vue-svelte-and-astro).

However, this feature is marked as **experimental** for several important reasons. First, these frameworks have their own specific syntaxes and idioms that extend beyond standard HTML, CSS, and JavaScript. While we've done extensive work to handle many patterns, there are cases and framework-specific syntaxes that may not yet be fully supported (for example Svelte control-flow syntax, or Astro JSX-like syntax). We encourage you to avail of this new feature, and fine-tune it based on your needs and possible limitations found.

Please open a discussion if you find something that hasn't been implemented, or an issue if there's a parsing error that should be handled correctly.

Additionally, you can configure specific formatting options for HTML content, such as whether to indent the content of `<script>` and `<style>` tags:

```json title="biome.json"
{
  "html": {
    "formatter": {
      "indentScriptAndStyle": true
    }
  }
}
```

By default, `indentScriptAndStyle` is set to `false` to match Prettier's behavior.

## New ignore syntax

Biome 2.3 introduces a refined syntax for ignoring paths in your project, addressing important problems that arose since the introduction of multi file analysis and TypeScript inference.

When Biome 2.0 came out, we internally introduced the concept of "paths being indexed". When a path is indexed, Biome parses it and updates the module graph and the type inference, if enabled.

The new syntax introduces two distinct ignore operators:

- `!` (single exclamation mark): Ignores the path from linting and formatting, but still allows it to be indexed by the type system. This is useful for generated files or third-party code that you don't want to format or lint, but still need for type inference and imports.
- `!!` (double exclamation mark): Completely ignores the path from all Biome operations, including type indexing. This is useful for files that should be entirely excluded from Biome's analysis, such as `dist/` folders.

This distinction is particularly important when working with TypeScript projects that rely on type inference from dependencies or generated code. By using `!`, you can exclude these files from formatting and linting while still maintaining correct type information across your project.

Here's an example configuration:

```json title="biome.json"
{
  "files": {
    "ignore": [
      "!dist/**",
      "!!node_modules/**"
    ]
  }
}
```

In this configuration, files in the `dist/` directory are ignored for formatting and linting but remain indexed for types, while files in `node_modules/` are completely excluded from all Biome operations.

## Promoted rules

<!-- TODO: Add promoted rules section -->

## Improved `--skip` and `--only` flags

Biome 2.3 introduces new command-line flags that give you fine-grained control over which tools run during the `check` command. The `--skip` and `--only` flags allow you to selectively enable or disable specific tools, making it easier to run targeted checks in different scenarios.

The `--skip` flag allows you to exclude specific tools from running:

```shell
biome check --skip=formatter --skip=linter
```

Conversely, the `--only` flag allows you to run only specific tools:

```shell
biome check --only=formatter
```

These flags are particularly useful in CI/CD pipelines where you might want to run different checks at different stages. For example, you might run only the formatter in a pre-commit hook, but run the full suite of checks in your CI environment.

## New reporters

New reporters were added

## Technical deep dive: How we achieved full support for Vue, Svelte, and Astro

<!-- TODO: Technical implementation details to be written by ematipico -->


### I like where this is going, how can I help?

I want to remind you that Biome is a project led by volunteers who like programming, open-source, and embrace the Biome philosophy, so any help is welcome 😁

#### Translations

If you are familiar with Biome and would like to contribute to its outreach, you can assist us by translating the website into your native language. In this [dashboard](https://biomejs.dev/i18n-dashboard/), you can check the supported languages and if they are up to date.

#### Chat with us

Join our [Discord server](https://biomejs.dev/chat), and engage with the community. Chatting with the community and being part of the community is a form of contribution.

#### Code contributions

If you like the technical aspects of the project, and you want to make your way into the Rust language, or practice your knowledge around parsers, compilers, analysers, etc., Biome is the project that does for you!

There are numerous aspects to explore; I assure you that you won't get bored. Here is a small list of the things you can start with:
- Create new lint rules! We have so many rules that we haven't implemented yet (ESLint, ESLint plugins, Next.js, Solid, etc.). We have a very [extensive technical guide](https://github.com/biomejs/biome/blob/main/crates/biome_analyze/CONTRIBUTING.md).
- [Help](https://github.com/biomejs/biome/blob/main/crates/biome_parser/CONTRIBUTING.md) [building](https://github.com/biomejs/biome/tree/main/crates/biome_yaml_parser) [Biome](https://github.com/biomejs/biome/tree/main/crates/biome_html_parser) [parsers](https://github.com/biomejs/biome/tree/main/crates/biome_markdown_parser)!
  One interesting fact about Biome parsers is that they are recoverable parsers [error resilient](/internals/architecture/#parser-and-cst) which emit a [CST](https://en.wikipedia.org/wiki/Parse_tree) instead of a classic AST.
- Implement new capabilities in our [LSP (Language Server Protocol)](https://github.com/biomejs/biome/tree/main/crates/biome_lsp), or add new features in one of our editor extensions: [VS Code](https://github.com/biomejs/biome-vscode), [Zed](https://github.com/biomejs/biome-zed) and [JetBrains IntelliJ](https://github.com/biomejs/biome-intellij).

#### Financial help

If you believe in the future of the project, you can also help with a financial contribution, via [Open Collective](https://opencollective.com/biome) or [GitHub Sponsors](https://github.com/sponsors/biomejs).

Additionally, the project provides an [enterprise support program ](/enterprise) where a company you can employ one of the core contributors to work a specific aspect of the Biome toolchain.
