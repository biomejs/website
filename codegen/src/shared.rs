use std::io::Write;

/// Add a disclaimer to the generated code.
/// This function must be used after the `---` of the frontmatter for MDX/MD files
pub fn add_codegen_disclaimer_frontmatter(content: &mut Vec<u8>) -> anyhow::Result<()> {
    writeln!(content, "# Don't modify this file manually. This file is auto generated from source, and you will lose your changes next time the website is built.")?;
    writeln!(
        content,
        "# Head to the `biomejs/biome` repository, and modify the source code in there."
    )?;
    writeln!(content)?;
    Ok(())
}
