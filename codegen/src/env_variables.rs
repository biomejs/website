use crate::project_root;
use anyhow::Result;
use biome_flags::BiomeEnv;
use std::fs;
use std::io::Write;

const HEADER: &str = r#"---
# Don't modify this file. This file is autogenerate by `codegen/src/env_variables.rs`

title: Environment variables
description: A list of the environment variables available via Biome
---
A list of the environment variables available via Biome.

"#;

const FOOTER: &str = r#"
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
```"#;

pub fn generate_env_variables() -> Result<()> {
    let file_path = project_root().join("src/content/docs/reference/environment-variables.md");

    let mut content = vec![];

    writeln!(content, "{HEADER}")?;
    for variable in BiomeEnv::ENV_VARIABLES {
        writeln!(
            content,
            "## `{}`\n\n {}\n",
            variable.name(),
            variable.description()
        )?;
    }

    writeln!(content, "{FOOTER}")?;

    fs::write(file_path, content)?;

    Ok(())
}
