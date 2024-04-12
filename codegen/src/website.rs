use crate::project_root;
use biome_cli::biome_command;
use biome_configuration::PartialConfiguration;
use biome_js_formatter::context::JsFormatOptions;
use biome_js_parser::{parse_module, JsParserOptions};
use biome_json_formatter::context::JsonFormatOptions;
use biome_json_formatter::format_node;
use biome_json_parser::{parse_json, JsonParserOptions};
use biome_service::VERSION;
use schemars::schema::{RootSchema, Schema, SchemaObject};
use schemars::schema_for;
use serde_json::to_string;
use std::convert::TryInto;
use std::fs;
use biome_js_syntax::{JsFileSource};
use biome_rowan::AstNode;

const CHANGELOG_FRONTMATTER: &str = r#"---
title: Changelog
description: The changelog of Biome
tableOfContents:
    maxHeadingLevel: 2
---
"#;

/// Generates the following files:
/// - src/content/docs/internals/changelog.md
/// - src/components/generated/DefaultConfiguration.mdx
/// - src/content/docs/reference/cli.mdx
/// - the schema of the current version
///
/// To generate the schema of the current version, pass the environment variable `BIOME_VERSION`
pub fn generate_files() -> anyhow::Result<()> {
    let schema_content = generate_configuration_schema()?;
    let changelog = fs::read_to_string(project_root().join("biome/CHANGELOG.md"))?;
    let default_configuration =
        project_root().join("src/components/generated/DefaultConfiguration.mdx");
    fs::remove_file(project_root().join("src/content/docs/internals/changelog.md")).ok();
    let changelog = format!("{CHANGELOG_FRONTMATTER}{changelog}");

    let configuration_content = serde_json::to_string(&PartialConfiguration::init()).unwrap();
    let tree = parse_json(&configuration_content, JsonParserOptions::default());
    let formatted = format_node(
        JsonFormatOptions::default().with_line_width(60.try_into().unwrap()),
        tree.tree().syntax(),
    )
    .unwrap()
    .print()
    .unwrap();

    let configuration = format!(
        r#"
```json title="biome.json"
{}
```
"#,
        formatted.as_code()
    );

    fs::write(default_configuration, configuration)?;

    fs::write(
        project_root().join("src/content/docs/internals/changelog.md"),
        changelog,
    )?;

    if VERSION != "0.0.0" {
        let parser = biome_command();
        let markdown = parser.render_markdown("biome");
        let mut cli_content =
            fs::read_to_string(project_root().join("src/content/docs/reference/cli.mdx"))?;

        let start = "\n[//]: # (Start-codegen)\n";
        let end = "\n[//]: # (End-codegen)";

        debug_assert!(cli_content.contains(start));
        debug_assert!(cli_content.contains(end));

        let start_index = cli_content
            .find(start)
            .expect("To contain start placeholder")
            + start.len();
        let end_index = cli_content.find(end).expect("To contain end placeholder");

        cli_content.replace_range(start_index..end_index, &markdown);

        fs::write(
            project_root().join("src/content/docs/reference/cli.mdx"),
            format!("{cli_content}"),
        )?;
        let schema_root_folder = project_root().join("src/pages/schemas");
        let schema_version_folder = schema_root_folder.join(VERSION);
        let schema_js_file = schema_version_folder.join("schema.json.js");
        if schema_version_folder.exists() {
            fs::remove_file(schema_js_file.clone())?;
            fs::remove_dir(schema_version_folder.clone())?;
        }
        fs::create_dir(schema_version_folder.clone())?;
        let mut content = String::new();
        content.push_str(
            r#"// Run `BIOME_VERSION=<version number> cargo codegen-website
// to generate a new schema
export function GET() {"#,
        );
        content.push_str(&format!("const schema  = {};", schema_content));
        content.push_str(
            r#"return new Response(JSON.stringify(schema), {
            status: 200,
            headers: {
                "content-type": "application/json"
            }
        })
    }"#,
        );
        let node = parse_module(&content, JsParserOptions::default());
        let result = biome_js_formatter::format_node(
            JsFormatOptions::new(JsFileSource::js_module()),
            node.tree().syntax(),
        )
        .unwrap();
        fs::write(schema_js_file.clone(), result.print().unwrap().as_code())?;
    }

    Ok(())
}

pub(crate) fn generate_configuration_schema() -> anyhow::Result<String> {
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
            } else if title == "RuleConfiguration_for_Null" {
                meta.title = Some("RuleConfiguration".to_string());
            } else if let Some(stripped) = title.strip_prefix("RuleWithOptions_for_") {
                meta.title = Some(format!("RuleWith{stripped}"));
            } else if let Some(stripped) = title
                .strip_prefix("RuleConfiguration_for_")
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
            } else if key == "RuleWithOptions_for_Null" {
                key = "RuleWithNoOptions".to_string();
                if let Schema::Object(schema_object) = &mut schema {
                    if let Some(object) = &mut schema_object.object {
                        object.required.remove("options");
                        object.properties.remove("options");
                    }
                }
            } else if key == "RuleConfiguration_for_Null" {
                key = "RuleConfiguration".to_string();
            } else if let Some(stripped) = key.strip_prefix("RuleWithOptions_for_") {
                key = format!("RuleWith{stripped}");
            } else if let Some(stripped) = key
                .strip_prefix("RuleConfiguration_for_")
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
        } else if reference == "#/definitions/RuleConfiguration_for_Null" {
            *reference = "#/definitions/RuleConfiguration".to_string();
        } else if let Some(stripped) = reference.strip_prefix("#/definitions/RuleWithOptions_for_")
        {
            *reference = format!("#/definitions/RuleWith{stripped}");
        } else if let Some(stripped) = reference
            .strip_prefix("#/definitions/RuleConfiguration_for_")
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
