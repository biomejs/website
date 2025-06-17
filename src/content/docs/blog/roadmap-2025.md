---
title: Roadmap 2025 and Biome 2.0
summary: "A look at what 2025 will bring for us: Biome 2.0, enterprise support, and our roadmap"
authors:
  - arendjr
  - team
date: 2025-01-22
cover:
  light: "@/assets/blog/roadmap-2024/banner-light.png"
  dark: "@/assets/blog/roadmap-2024/banner-dark.png"
  alt: "Biome - Toolchain of the web"
socialImage: "@/assets/social-logo.png"
---

Today we're happy to share our plans for Biome 2.0 as well as the rest of our roadmap for 2025. But before we dive into what's coming, let's do a quick recap of the major developments in 2024.

## 🎆 Recap: Biome in 2024

2024 was a great year for Biome. Let's see what happened:

* We released 4 new "minor" Biome versions, from 1.6 through 1.9, with plenty of useful features:
  * New `biome search` and `biome explain` commands, while the `biome migrate` command was significantly expanded to help users coming from ESLint and Prettier.
  * Added support for **CSS** and **GraphQL** formatting and linting. 
  * Partial support for **Astro**, **Svelte** and **Vue** files.
  * The ability to let configuration files extend from one another, which is especially useful in monorepo and larger organizational setups.
  * Custom [reporters](https://biomejs.dev/reference/reporters/) for better CI integration and machine-readable output.
  * Support for `.editorconfig`.
  * We added countless new lint rules and miscellaneous fixes and improvements, with a special shoutout to [`useSortedClasses`](https://biomejs.dev/linter/rules/use-sorted-classes/) that marks the beginning of dedicated **Tailwind** support.
 * Our [team of maintainers](https://github.com/biomejs/biome/blob/main/CONTRIBUTING.md#current-members) has grown from 10 members at the start of 2024 to 18 today.
 * We won the **Productivity Booster** award of the [OS Awards 2024](https://osawards.com/javascript/2024).
 * We gained several new [sponsors](https://github.com/biomejs/biome#sponsors).
 * We improved our IDE support on multiple fronts:
   * A new Zed extension has been contributed to the project.
   * Our VS Code extension has seen an overhaul that's currently in Pre-Release.
   * And even though this happened after the new year, we shouldn't neglect to mention that our IDEA plugin has seen a major update too, which is now available in the nightly channel.

## 💳 Enterprise Support

One more thing that we are happy to announce is that as of January 2025, we are also offering [Enterprise Support](https://biomejs.dev/enterprise) for Biome. Hopefully this will allow some of our contributors to spend more of their time and effort towards Biome!

## ⏭️ Biome 2.0

Right now our team is busy preparing for the Biome 2.0 release. Because our project is still run by volunteer contributors, we do not have an ETA for you. But we can share some of the goodies that will be coming:

* **Plugins**. A long-requested feature, we started the development of Biome plugins after an [RFC process](https://github.com/biomejs/biome/discussions/1762) that started in January 2024. Biome 2.0 will feature the first fruits of this labor: Users will be able to create their own lint rules using [GritQL](https://docs.grit.io/language/overview).
* **Domains**. [Domains](https://github.com/biomejs/biome/blob/main/.changeset/introduce_the_domains_linter_feature.md) are a configuration feature that makes it easy for users to enable or disable all rules related to a specific domain, such as React, Next.js or testing frameworks. It also allows Biome to automatically enable recommended domain-specific rules based on the dependencies listed in your `package.json`.
* **Monorepo Support**. While support for monorepos was already improved with our `extends` feature in `biome.json`, many weak spots remained. Biome 2.0 has an improved architecture based on an internal `ProjectLayout` that should resolve most of these.
* **Suppressions**. Biome already allowed *suppression* of linter diagnostics through the use of `// biome-ignore` suppression comments. With Biome 2.0 we're adding support for `// biome-ignore-all` and `// biome-ignore-start`/`biome-ignore-end` comments.
* **Multi-file analysis**. Last but not least, we're adding true [Multi-file support](https://github.com/biomejs/biome/issues/3307) to Biome 2.0. This means that our lint rules will be able to query information from other files, which will enable much more powerful lint rules.

## 🌌 2025 roadmap

Again, we should preface a disclaimer here: We're a community-driven project, so we cannot promise to deliver any of the features below. But that doesn't mean we don't have a wishlist of things we would like to work on in 2025 😉

This year we will focus on:

* [**HTML support**](https://github.com/biomejs/biome/issues/4726). No toolchain for the web is complete without it, and we're already working on it!
* [**Embedded languages**](https://github.com/biomejs/biome/issues/3334). CSS or GraphQL snippets inside a template literal in a JavaScript file? JavaScript or CSS inside an HTML file? Biome should be able to handle these as well, and we'll try to make it happen. This should also lead to better support for **Astro**, **Svelte**, and **Vue** than we have today.
* [**Type inference**](https://github.com/biomejs/biome/issues/3187). This was already a wish for 2024, and we're busy filling in the prerequisites such as multi-file analysis. There's even an [early proof-of-concept](https://github.com/biomejs/biome/pull/4911) for a `noFloatingPromises` rule. This year we want to ship a real version of `noFloatingPromises`, and hopefully dabble further into type inference.
* **.d.ts generation**. While we're on the subject of types, we would also like to create our first transformation: generating `.d.ts` files from TypeScript sources. Initially we would only focus on TypeScript using [Isolated Modules](https://www.typescriptlang.org/tsconfig/#isolatedModules).
* **JSDoc support**. Can we use [JSDoc](https://jsdoc.app/) comments as a source of type information too? If we are able to do type inference, this seems an opportunity we cannot pass on.
* **Markdown support**. Some work [has already started](https://github.com/biomejs/biome/issues/3718) for it and it would be a nice addition to round out our language support.
* **More plugins**. While Biome 2.0 will launch with the ability to create lint rules in GritQL, that's only the tip of the iceberg. We know our users want more, and we certainly have ideas for more types of plugins. We'll first collect feedback from the 2.0 release, and then we'll decide which plugin area we'll focus on next.

## ❤️ Your Support

We would like to thank our users and sponsors alike for their amazing support in 2024! Without you, this project would not be what it is today.

Hopefully we can also count on your support for the coming year. If you would like to help out, you can:

* [Become a contributor](https://github.com/biomejs/biome/blob/main/CONTRIBUTING.md). Please help us to build those features!
* [Sponsor us](https://github.com/biomejs/biome/tree/main#funding). Ask your company to sponsor us: Biome is so fast that it can reduce your company's CI times, improve developer productivity, and save money. Sponsorships also create exposure for your company.
* [Hire us](https://biomejs.dev/enterprise/). Is Biome missing anything that prevents your company from adopting it? You can make it happen by hiring us! Any company that hires a contributor to work on Biome for 3 months or more automatically applies for sponsorship benefits.
* [Improve our documentation](https://github.com/biomejs/website/). Write guides or recipes, or help to keep our translations up-to-date for non-English speakers.

