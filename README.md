# [`biomejs.dev`](https://biomejs.dev/)

[![Synchronize](https://github.com/biomejs/website/actions/workflows/synchronize.yaml/badge.svg?branch=main)](https://github.com/biomejs/website/actions/workflows/synchronize.yaml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/efc84020-6a75-479a-bae3-df2e458d5c44/deploy-status?branch=main)](https://app.netlify.com/sites/biomejs/deploys)

The website source of [biomejs/biome](https://github.com/biomejs/biome).

## Clone

To clone the repository, run

```shell
git clone https://github.com/biomejs/website
```

## Installation

First install pnpm by enabling [corepack](https://nodejs.org/api/corepack.html):

```shell
corepack enable
```

Then install the required dependencies:

```shell
pnpm i --frozen-lockfile
```

## Local Development

This command starts a local development server:

```shell
pnpm start
```

Most changes are reflected live without having to restart the server.

## Code generation

The pages of the lint rules are all code generated from the repository `biomejs/biome`. To update the pages you have to install the Rust toolchain, because
the code that does that requires reading the source code of the analyzer.

First, make sure that you've pulled the latest version of the repository and installed the required toolchains, then run the corresponding scripts from the **repo root** via `pnpm`:

```shell
# make sure your submodule is checked out at the correct commit
pnpm init:biome

# generate only rules files
pnpm codegen:rules

# generate only rules metadata
pnpm codegen:metadata

# generate only release files
pnpm codegen:release-files

# generate all files
pnpm codegen:all
```

## Build

This command generates static content into the `dist` directory:

```shell
pnpm build
```

The `dist` directory can be served using any static contents hosting service, or you can preview the site locally with

```shell
pnpm preview
```
