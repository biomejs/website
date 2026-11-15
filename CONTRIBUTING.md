# Contribution guide

## AI Policy

The use of AI in this repository is disallowed for writing of documentation, filing issues, messages. Generally, any human interaction in this repository must be AI-free.
If you use AI to translate your messages because you aren't proficient in English, that's disallowed too. Use plain translators that don't use AI enhancement.
You may use AI for coding tasks, which must be disclosed when opening a PR.

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

The easiest is to run all codegen, don't forget to set the `BIOME_VERSION`
environment variable:

```shell
BIOME_VERSION=2.0.0 pnpm codegen all
```

## Synchronization workflows

Codegen and playground updates use separate workflows:

- **Synchronize** (`.github/workflows/synchronize.yaml`) runs automatically when
  `biomejs/biome` publishes a release and can also be started manually. It
  updates the Rust dependencies and generates the lint rule documentation using
  `scripts/update-revision.sh`.
- **Update playground** (`.github/workflows/update-playground.yaml`) listens for
  repository dispatches from `biomejs/biome` after it builds the WASM package.
  It updates `@biomejs/wasm-web` and the pnpm lockfile using
  `scripts/update-playground.sh`.

Keep the workflows separate so a codegen failure does not block a playground
update.

## Internationalisation

We welcome any kind contribution that could help translating Biome documentation, and reach out more developers!

Also, feel free to involve any person that could help you and us with the translation of the content.

We use [Lunaria](https://lunaria.dev/) to track the pages that aren't translated, and the ones that aren't updated anymore. Refer to the following [dashboard](https://biomejs.dev/i18n-dashboard/).

When **adding** a new locale that doesn't exist in the dashboard, send a PR to update the locales of
`astro.config.ts` and `lunaria.config.ts`.

When sending a PR for a new page:

- Make sure the website compiles by using `pnpm build:no-og`.
- Make sure that links are reachable, this means that if a translated page doesn't exist yet, point to the english version.
