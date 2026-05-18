---
# Don't modify this file. This file is autogenerate by `codegen/src/env_variables.rs`

title: Environment variables
description: A list of the environment variables available via Biome
---
A list of the environment variables available via Biome.


## `BIOME_LOG_PATH`

 The directory where the logs of the Biome Daemon are stored.

## `BIOME_LOG_PREFIX_NAME`

 A prefix that's added to the name of the log. Default: `server.log.`

## `BIOME_LOG_LEVEL`

 The level of logging. Possible values: none, tracing, debug, info, warn, error. Default: info.

## `BIOME_LOG_KIND`

 What the log should look like. Possible values: pretty, compact, json. Default: pretty.

## `BIOME_CONFIG_PATH`

 A path to the configuration file

## `BIOME_THREADS`

 The number of threads to use in CI.

## `BIOME_WATCHER_KIND`

 The kind of watcher to use. Possible values: polling, recommended, none. Default: recommended.

## `BIOME_WATCHER_POLLING_INTERVAL`

 The polling interval in milliseconds. This is only applicable when using the polling watcher. Default: 2000.


## `BIOME_BINARY`

Overrides the Biome binary being used. This allows you, for example, to use a system-wide Biome binary.

If you don't define this variable, Biome will automatically detect the correct binary for your platform.

```shell
# Nix derivation example; the binary path comes from "${pkgs.biome}/bin/biome"
BIOME_BINARY=/nix/store/68fyfw1hidsqkal1839whi3nzgvqv4pa-biome-1.0.0/bin/biome npx @biomejs/biome format .
```

## `RUST_BACKTRACE`

Enables capturing the backtrace when Biome panicked. This allows you to identify where the panic occurred.

```shell
RUST_BACKTRACE=1 npx @biomejs/biome check .
```
