use bpaf::Bpaf;
use std::env;
use std::path::{Path, PathBuf};

pub mod configuration;
pub mod lintdoc;
pub mod metadata;
pub mod rules_sources;
pub mod website;

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

    /// Updates the files of a release
    #[bpaf(command)]
    ReleaseFiles,

    #[bpaf(command)]
    Configuration,

    /// Updates the documentation of the rule pages and the files of a release  
    #[bpaf(command)]
    All,
}
