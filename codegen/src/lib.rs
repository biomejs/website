use bpaf::Bpaf;
use std::env;
use std::path::{Path, PathBuf};

pub mod diagnostics;
pub mod domains;
pub mod env_variables;
pub mod lintdoc;
pub mod metadata;
pub mod redirects;
pub mod rules_sources;
mod shared;
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

    /// Diagnostics
    #[bpaf(command)]
    Diagnostics,

    /// Updates the files of a release
    #[bpaf(command)]
    ReleaseFiles,

    /// Updates the files of a release
    #[bpaf(command)]
    Env,

    /// Generate redirects
    #[bpaf(command)]
    Redirects,

    /// Updates the documentation of the rule pages and the files of a release
    #[bpaf(command)]
    All {
        /// When `false`, it generates the changelog the file system. When `true` it reads it from github.com
        #[bpaf(long, flag(true, true))]
        online: bool,
    },
}
