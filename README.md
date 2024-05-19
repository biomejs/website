# [`biomejs.dev`](https://biomejs.dev/)

[![Pin submodule and run codegen](https://github.com/biomejs/website/actions/workflows/pin-submodule-and-run-codegen.yaml/badge.svg?branch=main)](https://github.com/biomejs/website/actions/workflows/pin-submodule-and-run-codegen.yaml)

The website source of [biomejs/biome](https://github.com/biomejs/biome).

## Clone

This repository includes a submodule pointing to the [main repository](https://github.com/biomejs/biome). The submodule is required to build the WASM artifacts for the [website playground](https://biomejs.dev/playground/), populate the [rule pages](https://biomejs.dev/linter/rules/), and perform some checks in the CI workflows.

To clone the repository including the submodule, run

```shell
git clone --recursive https://github.com/biomejs/website
```

If you've already cloned the repository without the `--recursive` flag, you can also fetch the submodule later:

```shell
git clone https://github.com/biomejs/website
cd website
git submodule update --init --recursive
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

To build the playground, you'll also need [`wasm-pack`](https://rustwasm.github.io/wasm-pack/installer/).

## Local Development

This command starts a local development server:

```shell
pnpm start
```

Most changes are reflected live without having to restart the server.

If you want to work on the playground, the WASM artifacts of Biome are required. To build them, the [`wasm-pack`](https://rustwasm.github.io/wasm-pack/installer/) tool must be installed, and use the following command to build and start the website with a working playground:

```shell
pnpm start:playground
```

Please make sure you [have the submodule source also cloned](#clone).

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
