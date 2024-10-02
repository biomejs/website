use codegen::diagnostics::generate_diagnostics;
use codegen::env_variables::generate_env_variables;
use codegen::lintdoc::generate_rule_docs;
use codegen::metadata::generate_json_metadata;
use codegen::website::generate_files;
use codegen::{codegen_command, CodegenCommand};

fn main() -> anyhow::Result<()> {
    let result = codegen_command().fallback_to_usage().run();

    match result {
        CodegenCommand::Rules => {
            generate_rule_docs()?;
        }
        CodegenCommand::ReleaseFiles => {
            generate_files()?;
        }
        CodegenCommand::All => {
            generate_rule_docs()?;
            generate_files()?;
            generate_json_metadata()?;
            generate_env_variables()?;
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
