# Contribution guide

## Install tools

Website is divided into two projects:

- the website itself inside `src/`
- the codegen created using Rust, inside `codegen/`

### Website

You can work with the website without needing to use Rust. Run

```shell
pnpm install
pnpm dev
```

The website uses [Astro](https://astro.build) and [Starlight](https://starlight.astro.build)

### Codegen

The codegen is set up in way that it pulls the most recent commit from the
`biomejs/biome` repository, so make sure to always compile the most recent change.

Run the following command to prompt with the list of commands available:

```shell
pnpm codegen
```

## Internationalisation

We welcome any kind contribution that could help translating Biome documentation, and reach out more developers!

Also, feel free to involve any person that could help you and us with the translation of the content.

We use [Lunaria](https://lunaria.dev/) to track the pages that aren't translated, and the ones that aren't updated anymore. Refer to the following [dashboard](https://biomejs.dev/i18n-dashboard/).

When **adding** a new locale that doesn't exist in the dashboard, send a PR to update the locales of
`astro.config.mjs` and `lunaria.config.json`.

When sending a PR for a new page:

- Make sure the website compiles by using `pnpm build:no-og`.
- Make sure that links are reachable, this means that if a translated page doesn't exist yet, point to the english version.