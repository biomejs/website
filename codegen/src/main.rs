use codegen::lintdoc::generate_rule_docs;

fn main() -> anyhow::Result<()> {
    generate_rule_docs()?;

    Ok(())
}
