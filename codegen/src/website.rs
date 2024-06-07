use crate::project_root;
use biome_cli::biome_command;
use biome_configuration::PartialConfiguration;
use biome_js_formatter::context::JsFormatOptions;
use biome_js_parser::{parse_module, JsParserOptions};
use biome_js_syntax::JsFileSource;
use biome_json_formatter::context::JsonFormatOptions;
use biome_json_parser::{parse_json, JsonParserOptions};
use biome_rowan::AstNode;
use biome_service::VERSION;
use schemars::schema::{RootSchema, Schema, SchemaObject};
use schemars::schema_for;
use serde_json::to_string;
use std::convert::TryInto;
use std::fs;

/// Generates the following files:
///
/// - Default configuration file: `src/components/generated/DefaultConfiguration.mdx`
/// - Changelog file: `src/content/docs/internals/changelog.md`
/// - CLI doc file: `src/content/docs/reference/cli.mdx`
/// - Schema js file: `src/pages/schemas/<version>/schema.json.js`
///
/// To generate the CLI doc and the schema of the current version,
/// pass the environment variable `BIOME_VERSION`
///
pub fn generate_files() -> anyhow::Result<()> {
    generate_default_configuration()?;
    generate_changelog()?;

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
            &serde_json::to_string(&PartialConfiguration::init())?,
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

/// Generates the changelog file: `src/content/docs/internals/changelog.md`
pub(crate) fn generate_changelog() -> anyhow::Result<()> {
    let changelog_source_path = project_root().join("../biome/CHANGELOG.md");
    let changelog_target_path = project_root().join("src/content/docs/internals/changelog.md");

    const CHANGELOG_FRONTMATTER: &str = r#"---
title: Changelog
description: The changelog of Biome
tableOfContents:
    maxHeadingLevel: 2
---
"#;

    let changelog_source_content = fs::read_to_string(changelog_source_path)?;
    let changelog_target_content = format!("{CHANGELOG_FRONTMATTER}{changelog_source_content}");

    fs::write(changelog_target_path, changelog_target_content)?;

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

/// Generates the schema js file: `src/pages/schemas/<version>/schema.json.js`
pub(crate) fn generate_schema_js() -> anyhow::Result<()> {
    let schema_root_folder_path = project_root().join("src/pages/schemas");
    let schema_version_folder_path = schema_root_folder_path.join(VERSION);
    let schema_js_path = schema_version_folder_path.join("schema.json.js");

    if schema_version_folder_path.exists() {
        fs::remove_dir_all(&schema_version_folder_path)?;
    }

    fs::create_dir(&schema_version_folder_path)?;

    let mut schema_js_content = String::new();
    schema_js_content.push_str(
        r#"// Run `BIOME_VERSION=<version number> pnpm codegen:release-files
// to generate a new schema
export function GET() {"#,
    );
    schema_js_content.push_str(&format!(
        "const schema = {};",
        get_configuration_schema_content()?
    ));
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
    )?
    .print()?;

    fs::write(&schema_js_path, schema_js_printed.as_code())?;

    Ok(())
}

/// Get the content (stringified JSON) of the configuration schema
pub(crate) fn get_configuration_schema_content() -> anyhow::Result<String> {
    let schema = rename_partial_references_in_schema(schema_for!(PartialConfiguration));

    let json_schema = to_string(&schema)?;
    let parsed = parse_json(&json_schema, JsonParserOptions::default());
    let formatted =
        biome_json_formatter::format_node(JsonFormatOptions::default(), &parsed.syntax())
            .unwrap()
            .print()
            .unwrap();

    Ok(formatted.into_code())
}

/// Strips all "Partial" prefixes from type names in the schema.
///
/// We do this to avoid leaking our `Partial` derive macro to the outside world,
/// since it should be just an implementation detail.
fn rename_partial_references_in_schema(mut schema: RootSchema) -> RootSchema {
    if let Some(meta) = schema.schema.metadata.as_mut() {
        if let Some(title) = meta.title.as_ref() {
            if let Some(stripped) = title.strip_prefix("Partial") {
                meta.title = Some(stripped.to_string());
            } else if title == "RuleWithOptions_for_Null" {
                meta.title = Some("RuleWithNoOptions".to_string());
            } else if title == "RuleWithFixOptions_for_Null" {
                meta.title = Some("RuleWithFixNoOptions".to_string());
            } else if title == "RuleConfiguration_for_Null" {
                meta.title = Some("RuleConfiguration".to_string());
            } else if title == "RuleFixConfiguration_for_Null" {
                meta.title = Some("RuleFixConfiguration".to_string());
            } else if let Some(stripped) = title.strip_prefix("RuleWithOptions_for_") {
                meta.title = Some(format!("RuleWith{stripped}"));
            } else if let Some(stripped) = title.strip_prefix("RuleWithFixOptions_for_") {
                meta.title = Some(format!("RuleWith{stripped}"));
            } else if let Some(stripped) = title
                .strip_prefix("RuleConfiguration_for_")
                .map(|x| x.strip_suffix("Options").unwrap_or(x))
            {
                meta.title = Some(format!("{stripped}Configuration"));
            } else if let Some(stripped) = title
                .strip_prefix("RuleFixConfiguration_for_")
                .map(|x| x.strip_suffix("Options").unwrap_or(x))
            {
                meta.title = Some(format!("{stripped}Configuration"));
            }
        }
    }

    rename_partial_references_in_schema_object(&mut schema.schema);

    schema.definitions = schema
        .definitions
        .into_iter()
        .map(|(mut key, mut schema)| {
            if let Some(stripped) = key.strip_prefix("Partial") {
                key = stripped.to_string();
            } else if key == "RuleWithOptions_for_Null" || key == "RuleWithFixOptions_for_Null" {
                key = if key == "RuleWithOptions_for_Null" {
                    "RuleWithNoOptions".to_string()
                } else {
                    "RuleWithFixNoOptions".to_string()
                };
                if let Schema::Object(schema_object) = &mut schema {
                    if let Some(object) = &mut schema_object.object {
                        object.required.remove("options");
                        object.properties.remove("options");
                    }
                }
            } else if key == "RuleConfiguration_for_Null" {
                key = "RuleConfiguration".to_string();
            } else if key == "RuleFixConfiguration_for_Null" {
                key = "RuleFixConfiguration".to_string();
            } else if let Some(stripped) = key.strip_prefix("RuleWithOptions_for_") {
                key = format!("RuleWith{stripped}");
            } else if let Some(stripped) = key.strip_prefix("RuleWithFixOptions_for_") {
                key = format!("RuleWith{stripped}");
            } else if let Some(stripped) = key
                .strip_prefix("RuleConfiguration_for_")
                .map(|x| x.strip_suffix("Options").unwrap_or(x))
            {
                key = format!("{stripped}Configuration");
            } else if let Some(stripped) = key
                .strip_prefix("RuleFixConfiguration_for_")
                .map(|x| x.strip_suffix("Options").unwrap_or(x))
            {
                key = format!("{stripped}Configuration");
            }

            if let Schema::Object(object) = &mut schema {
                rename_partial_references_in_schema_object(object);
            }

            (key, schema)
        })
        .collect();

    schema
}

fn rename_partial_references_in_schema_object(object: &mut SchemaObject) {
    if let Some(object) = &mut object.object {
        for prop_schema in object.properties.values_mut() {
            if let Schema::Object(object) = prop_schema {
                rename_partial_references_in_schema_object(object);
            }
        }
    }

    if let Some(reference) = &mut object.reference {
        if let Some(stripped) = reference.strip_prefix("#/definitions/Partial") {
            *reference = format!("#/definitions/{stripped}");
        } else if reference == "#/definitions/RuleWithOptions_for_Null" {
            *reference = "#/definitions/RuleWithNoOptions".to_string();
        } else if reference == "#/definitions/RuleWithFixOptions_for_Null" {
            *reference = "#/definitions/RuleWithFixNoOptions".to_string();
        } else if reference == "#/definitions/RuleConfiguration_for_Null" {
            *reference = "#/definitions/RuleConfiguration".to_string();
        } else if reference == "#/definitions/RuleFixConfiguration_for_Null" {
            *reference = "#/definitions/RuleFixConfiguration".to_string();
        } else if let Some(stripped) = reference.strip_prefix("#/definitions/RuleWithOptions_for_")
        {
            *reference = format!("#/definitions/RuleWith{stripped}");
        } else if let Some(stripped) =
            reference.strip_prefix("#/definitions/RuleWithFixOptions_for_")
        {
            *reference = format!("#/definitions/RuleWith{stripped}");
        } else if let Some(stripped) = reference
            .strip_prefix("#/definitions/RuleConfiguration_for_")
            .map(|x| x.strip_suffix("Options").unwrap_or(x))
        {
            *reference = format!("#/definitions/{stripped}Configuration");
        } else if let Some(stripped) = reference
            .strip_prefix("#/definitions/RuleFixConfiguration_for_")
            .map(|x| x.strip_suffix("Options").unwrap_or(x))
        {
            *reference = format!("#/definitions/{stripped}Configuration");
        }
    }

    if let Some(subschemas) = &mut object.subschemas {
        rename_partial_references_in_optional_schema_vec(&mut subschemas.all_of);
        rename_partial_references_in_optional_schema_vec(&mut subschemas.any_of);
        rename_partial_references_in_optional_schema_vec(&mut subschemas.one_of);

        rename_partial_references_in_optional_schema_box(&mut subschemas.not);
        rename_partial_references_in_optional_schema_box(&mut subschemas.if_schema);
        rename_partial_references_in_optional_schema_box(&mut subschemas.then_schema);
        rename_partial_references_in_optional_schema_box(&mut subschemas.else_schema);
    }
}

fn rename_partial_references_in_optional_schema_box(schema: &mut Option<Box<Schema>>) {
    if let Some(schema) = schema {
        if let Schema::Object(object) = schema.as_mut() {
            rename_partial_references_in_schema_object(object);
        }
    }
}

fn rename_partial_references_in_optional_schema_vec(schemas: &mut Option<Vec<Schema>>) {
    if let Some(schemas) = schemas {
        rename_partial_references_in_schema_slice(schemas);
    }
}

fn rename_partial_references_in_schema_slice(schemas: &mut [Schema]) {
    for schema in schemas {
        if let Schema::Object(object) = schema {
            rename_partial_references_in_schema_object(object);
        }
    }
}
