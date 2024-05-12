use bpaf::Bpaf;
use std::env;
use std::path::{Path, PathBuf};

pub mod lintdoc;
pub mod rules_sources;
pub mod website;
pub mod metadata;

pub fn project_root() -> PathBuf {
    Path::new(
        &env::var("CARGO_MANIFEST_DIR").unwrap_or_else(|_| env!("CARGO_MANIFEST_DIR").to_owned()),
    )
    .ancestors()
    .nth(1)
    .unwrap()
    .to_path_buf()
}

#[derive(Debug, Clone, Bpaf)]
#[bpaf(options)]
pub enum CodegenCommand {
    /// Updates the documentation of the rule pages
    #[bpaf(command)]
    Rules,

    /// Updates the files of a release
    #[bpaf(command)]
    ReleaseFiles,

    /// Updates the documentation of the rule pages and the files of a release  
    #[bpaf(command)]
    All,
}
