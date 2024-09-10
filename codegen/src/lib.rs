use bpaf::Bpaf;
use std::env;
use std::path::{Path, PathBuf};

pub mod diagnostics;
pub mod lintdoc;
pub mod metadata;
pub mod rules_sources;
mod shared;
pub mod website;
pub mod env_variables;

pub fn project_root() -> PathBuf {
    Path::new(
        &env::var("CARGO_MANIFEST_DIR").unwrap_or_else(|_| env!("CARGO_MANIFEST_DIR").to_owned()),
    )
    .ancestors()
    .next()
    .unwrap()
    .to_path_buf()
}

#[derive(Debug, Clone, Bpaf)]
#[bpaf(options)]
pub enum CodegenCommand {
    /// Updates the documentation of the rule pages
    #[bpaf(command)]
    Rules,

    /// Metadata
    #[bpaf(command)]
    Metadata,

    /// Diagnostics
    #[bpaf(command)]
    Diagnostics,

    /// Updates the files of a release
    #[bpaf(command)]
    ReleaseFiles,

    /// Updates the files of a release
    #[bpaf(command)]
    Env,

    /// Updates the documentation of the rule pages and the files of a release  
    #[bpaf(command)]
    All,
}
