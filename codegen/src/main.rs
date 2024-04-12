use codegen::lintdoc::generate_rule_docs;
use codegen::website::generate_files;

fn main() -> anyhow::Result<()> {
    generate_rule_docs()?;

    generate_files()?;

    Ok(())
}
