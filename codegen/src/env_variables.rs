use crate::project_root;
use anyhow::Result;
use std::fs;
use std::io::Write;

const HEADER: &str = r#"---
# Don't modify this file. This file is autogenerate by `codegen/src/env_variables.rs`

title: Environment variables
description: A list of the environment variables available via Biome
---"#;

const FOOTER: &str = r#"
### `BIOME_BINARY`

Overrides the Biome binary being used. This allows you, for example, to use a system-wide Biome binary.

If you don't define this variable, Biome will automatically detect the correct binary for your platform.

```
# Nix derivation example; the binary path comes from "${pkgs.biome}/bin/biome"
BIOME_BINARY=/nix/store/68fyfw1hidsqkal1839whi3nzgvqv4pa-biome-1.0.0/bin/biome npx @biomejs/biome format .
```

### `RAYON_NUM_THREADS`

Controls the number of threads used by Biome's internal thread pool (via the Rayon library). This environment variable applies to **all** Biome commands, not just the `ci` command.

Useful for:
- Limiting CPU usage in resource-constrained environments
- Running multiple Biome instances in parallel (e.g., in monorepos or agentic workflows)
- Preventing resource contention when multiple agents/processes run Biome simultaneously

```bash
# Limit Biome to use only 1 thread
RAYON_NUM_THREADS=1 biome lint .

# Set globally for all Biome commands
export RAYON_NUM_THREADS=2
```"#;

pub fn generate_env_variables() -> Result<()> {
    let file_path = project_root().join("src/content/docs/reference/environment_variables.md");

    let mut content = vec![];

    let env = biome_flags::biome_env();

    writeln!(content, "{HEADER}")?;

    writeln!(
        content,
        "### `{}`\n\n {}\n",
        env.biome_log_prefix_name.name(),
        env.biome_log_prefix_name.description()
    )?;
    writeln!(
        content,
        "### `{}`\n\n {}\n",
        env.biome_log_path.name(),
        env.biome_log_path.description()
    )?;
    writeln!(
        content,
        "### `{}`\n\n {}\n",
        env.biome_config_path.name(),
        env.biome_config_path.description()
    )?;

    writeln!(content, "{FOOTER}")?;

    fs::write(file_path, content)?;

    Ok(())
}
