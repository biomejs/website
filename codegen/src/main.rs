use codegen::diagnostics::generate_diagnostics;
use codegen::env_variables::generate_env_variables;
use codegen::lintdoc::generate_rule_docs;
use codegen::metadata::{generate_json_metadata, generate_playground_rules};
use codegen::redirects::generate_redirects;
use codegen::website::generate_files;
use codegen::{CodegenCommand, codegen_command};

fn main() -> anyhow::Result<()> {
    let result = codegen_command().fallback_to_usage().run();

    match result {
        CodegenCommand::Redirects => {
            generate_redirects()?;
        }
        CodegenCommand::Rules => {
            generate_rule_docs()?;
            generate_redirects()?;
            generate_playground_rules()?;
        }
        CodegenCommand::ReleaseFiles => {
            generate_files(false)?;
        }
        CodegenCommand::All { online } => {
            generate_rule_docs()?;
            generate_redirects()?;
            generate_playground_rules()?;
            generate_files(online)?;
            generate_env_variables()?;
            generate_json_metadata()?;
        }
        CodegenCommand::Metadata => generate_json_metadata()?,
        CodegenCommand::Env => {
            generate_env_variables()?;
        }
        CodegenCommand::Diagnostics => {
            generate_diagnostics()?;
        }
    }

    Ok(())
}
