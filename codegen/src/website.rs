use crate::project_root;
use biome_cli::biome_command;
use biome_configuration::Configuration;
use biome_configuration::VERSION;
use biome_js_formatter::context::JsFormatOptions;
use biome_js_parser::{JsParserOptions, parse_module};
use biome_js_syntax::JsFileSource;
use biome_json_formatter::context::JsonFormatOptions;
use biome_json_parser::{JsonParserOptions, parse_json};
use biome_rowan::AstNode;
use std::convert::TryInto;
use std::fs;

/// Generates the following files:
///
/// - Default configuration file: `src/components/generated/DefaultConfiguration.mdx`
/// - CLI doc file: `src/content/docs/reference/cli.mdx`
/// - Schema js file: `src/pages/schemas/<version>/schema.json.js`
///
/// To generate the CLI doc and the schema of the current version,
/// pass the environment variable `BIOME_VERSION`
///
pub fn generate_files() -> anyhow::Result<()> {
    generate_default_configuration()?;

    if VERSION != "0.0.0" {
        generate_cli_doc()?;
        generate_schema_js()?;
    }

    Ok(())
}

/// Generates the default configuration file: `src/components/generated/DefaultConfiguration.mdx`
pub(crate) fn generate_default_configuration() -> anyhow::Result<()> {
    let default_configuration_path =
        project_root().join("src/components/generated/DefaultConfiguration.mdx");

    let default_configuration_printed = biome_json_formatter::format_node(
        JsonFormatOptions::default()
            .with_line_width(60.try_into().expect("Line width must be within range.")),
        parse_json(
            &serde_json::to_string(&Configuration::init())?,
            JsonParserOptions::default(),
        )
        .tree()
        .syntax(),
    )?
    .print()?;

    fs::write(
        default_configuration_path,
        format!(
            r#"
```json title="biome.json"
{}
```
"#,
            default_configuration_printed.as_code(),
        ),
    )?;

    Ok(())
}

/// Generates the CLI doc file: `src/content/docs/reference/cli.mdx`
pub(crate) fn generate_cli_doc() -> anyhow::Result<()> {
    let cli_doc_path = project_root().join("src/content/docs/reference/cli.mdx");

    let mut cli_doc_content = fs::read_to_string(&cli_doc_path)?;

    let start = "\n[//]: # (Start-codegen)\n";
    let end = "\n[//]: # (End-codegen)";

    debug_assert!(cli_doc_content.contains(start));
    debug_assert!(cli_doc_content.contains(end));

    let start_index = cli_doc_content
        .find(start)
        .expect("CLI doc should contain a start placeholder.")
        + start.len();
    let end_index = cli_doc_content
        .find(end)
        .expect("CLI doc should contain an end placeholder.");

    cli_doc_content.replace_range(
        start_index..end_index,
        &biome_command().render_markdown("biome"),
    );

    fs::write(cli_doc_path, &cli_doc_content)?;

    Ok(())
}

/// Fetches the configuration schema JSON from the biome repository at the
/// commit recorded in the `biome-revision` file, then writes it as a JS
/// endpoint to `src/pages/schemas/<version>/schema.json.js` and
/// `src/pages/schemas/latest/schema.json.js`.
pub(crate) fn generate_schema_js() -> anyhow::Result<()> {
    let schema_root_folder_path = project_root().join("src/pages/schemas");
    let schema_version_folder_path = schema_root_folder_path.join(VERSION);
    let schema_latest_path = schema_root_folder_path.join("latest/schema.json.js");
    let schema_js_path = schema_version_folder_path.join("schema.json.js");

    if schema_version_folder_path.exists() {
        fs::remove_dir_all(&schema_version_folder_path)?;
    }

    fs::create_dir(&schema_version_folder_path)?;

    // Read the commit hash from the biome-revision file
    let revision_path = project_root().join("biome-revision");
    let revision = fs::read_to_string(&revision_path)
        .map_err(|e| anyhow::anyhow!("Failed to read biome-revision file: {e}"))?
        .trim()
        .to_string();

    // Fetch the configuration schema from the biome repository at the pinned revision
    let url = format!(
        "https://raw.githubusercontent.com/biomejs/biome/{revision}/packages/%40biomejs/biome/configuration_schema.json"
    );

    eprintln!("Fetching configuration schema from {url}");

    let schema_json: String = ureq::get(&url).call()?.into_body().read_to_string()?;

    let mut schema_js_content = String::new();
    schema_js_content.push_str(
        r#"// Run `BIOME_VERSION=<version number> pnpm codegen:release-files
// to generate a new schema
export function GET() {"#,
    );
    schema_js_content.push_str(&format!("const schema = {};", schema_json));
    schema_js_content.push_str(
        r#"return new Response(JSON.stringify(schema), {
    status: 200,
    headers: {
        "content-type": "application/json"
    }
})
}"#,
    );

    let schema_js_printed = biome_js_formatter::format_node(
        JsFormatOptions::new(JsFileSource::js_module()),
        parse_module(&schema_js_content, JsParserOptions::default())
            .tree()
            .syntax(),
        false,
    )?
    .print()?;

    fs::write(schema_js_path, schema_js_printed.as_code())?;
    fs::write(schema_latest_path, schema_js_printed.as_code())?;

    Ok(())
}
