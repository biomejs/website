use crate::project_root;
use anyhow::Result;
use biome_service::workspace_types::methods;
use serde_json::Value;
use std::fs;

const START_MARKER: &str = "\n[//]: # (Start-custom-requests)\n";
const END_MARKER: &str = "\n[//]: # (End-custom-requests)";

pub fn generate_lsp_docs() -> Result<()> {
    let all_methods = methods();

    let mut output = String::new();

    output.push_str("## Custom Requests\n\n");

    for method in &all_methods {
        // Using h4 on purpose to avoid polluting the table of contents.
        output.push_str(&format!("### `biome/{}`\n\n", method.name));

        let params_schema = method.params.as_value();

        if !is_primitive_schema(params_schema) {
            let title = schema_title(params_schema);
            output.push_str(&format!("Accepts `{title}`.\n\n"));
            output.push_str("```ts\n");
            output.push_str(&format_interface(params_schema));
            output.push_str("\n```\n\n");
        }

        let result_schema = method.result.as_value();

        if let Some(primitive) = primitive_ts_name(result_schema) {
            output.push_str(&format!("Returns `{primitive}`.\n\n"));
        } else {
            let title = schema_title(result_schema);
            output.push_str(&format!("Returns `{title}`.\n\n"));
            output.push_str("```ts\n");
            output.push_str(&format_interface(result_schema));
            output.push_str("\n```\n\n");
        }
    }

    let mdx_path = project_root().join("src/content/docs/reference/daemon.md");
    let mut content = fs::read_to_string(&mdx_path)?;

    let start_idx = content
        .find(START_MARKER)
        .expect("introduction.mdx should contain start marker")
        + START_MARKER.len();
    let end_idx = content
        .find(END_MARKER)
        .expect("introduction.mdx should contain end marker");

    content.replace_range(start_idx..end_idx, &output);
    fs::write(mdx_path, content)?;

    Ok(())
}

fn schema_title(schema: &Value) -> String {
    schema
        .get("title")
        .and_then(|v| v.as_str())
        .unwrap_or("Unknown")
        .to_string()
}

fn is_primitive_schema(schema: &Value) -> bool {
    matches!(
        schema.get("type").and_then(|v| v.as_str()),
        Some("null" | "boolean" | "string")
    )
}

fn primitive_ts_name(schema: &Value) -> Option<&'static str> {
    match schema.get("type").and_then(|v| v.as_str()) {
        Some("null") => Some("void"),
        Some("boolean") => Some("boolean"),
        Some("string") => Some("string"),
        _ => None,
    }
}

struct PropertyInfo {
    name: String,
    ts_type: String,
    optional: bool,
    description: Option<String>,
}

fn extract_properties(schema: &Value) -> Vec<PropertyInfo> {
    let Some(properties) = schema.get("properties").and_then(|v| v.as_object()) else {
        return Vec::new();
    };

    let required: Vec<&str> = schema
        .get("required")
        .and_then(|v| v.as_array())
        .map(|arr| arr.iter().filter_map(|v| v.as_str()).collect())
        .unwrap_or_default();

    let defs = schema.get("$defs").and_then(|v| v.as_object());

    let mut result: Vec<PropertyInfo> = properties
        .iter()
        .map(|(name, prop_schema)| {
            let is_optional = !required.contains(&name.as_str());
            let ts_type = resolve_ts_type(prop_schema, defs, is_optional);
            let description = prop_schema
                .get("description")
                .and_then(|v| v.as_str())
                .map(clean_description);

            PropertyInfo {
                name: name.clone(),
                ts_type,
                optional: is_optional,
                description,
            }
        })
        .collect();

    result.sort_by(|a, b| a.name.cmp(&b.name));
    result
}

fn clean_description(s: &str) -> String {
    s.split_whitespace().collect::<Vec<_>>().join(" ")
}

fn resolve_ts_type(
    schema: &Value,
    defs: Option<&serde_json::Map<String, Value>>,
    strip_null: bool,
) -> String {
    if let Some(ref_str) = schema.get("$ref").and_then(|v| v.as_str()) {
        let name = ref_str.strip_prefix("#/$defs/").unwrap_or(ref_str);
        if let Some(defs) = defs {
            if let Some(def) = defs.get(name) {
                if is_type_alias_to_primitive(def) {
                    return resolve_ts_type(def, Some(defs), strip_null);
                }
            }
        }
        return name.to_string();
    }

    if let Some(ty) = schema.get("type").and_then(|v| v.as_str()) {
        return match ty {
            "string" => "string".to_string(),
            "number" | "integer" => "number".to_string(),
            "boolean" => "boolean".to_string(),
            "null" => "null".to_string(),
            "array" => {
                let item_type = schema
                    .get("items")
                    .map(|items| resolve_ts_type(items, defs, false))
                    .unwrap_or_else(|| "unknown".to_string());
                format!("{item_type}[]")
            }
            _ => ty.to_string(),
        };
    }

    if let Some(variants) = schema
        .get("anyOf")
        .or_else(|| schema.get("oneOf"))
        .and_then(|v| v.as_array())
    {
        let mut types: Vec<String> = variants
            .iter()
            .map(|v| resolve_ts_type(v, defs, false))
            .collect();

        if strip_null {
            types.retain(|t| t != "null");
        }

        if types.len() == 1 {
            return types.into_iter().next().unwrap();
        }
        return types.join(" | ");
    }

    if let Some(c) = schema.get("const") {
        return match c {
            Value::String(s) => format!("\"{s}\""),
            Value::Number(n) => n.to_string(),
            Value::Bool(b) => b.to_string(),
            _ => "unknown".to_string(),
        };
    }

    "unknown".to_string()
}

fn is_type_alias_to_primitive(schema: &Value) -> bool {
    if let Some(ty) = schema.get("type").and_then(|v| v.as_str()) {
        return matches!(ty, "string" | "number" | "integer" | "boolean");
    }
    false
}

fn format_interface(schema: &Value) -> String {
    let title = schema_title(schema);
    let props = extract_properties(schema);

    if props.is_empty() {
        return format!("interface {title} {{}}");
    }

    let mut result = format!("interface {title} {{\n");
    for prop in &props {
        if let Some(desc) = &prop.description {
            result.push_str(&format!("\t/**\n\t * {desc}\n\t */\n"));
        }
        let opt = if prop.optional { "?" } else { "" };
        result.push_str(&format!("\t{}{opt}: {};\n", prop.name, prop.ts_type));
    }
    result.push('}');
    result
}
