//! Auto generate markdown documentation for the configuration schema.
use biome_configuration::PartialConfiguration;
use schemars::schema::{InstanceType, RootSchema, Schema, SchemaObject, SingleOrVec};
use schemars::schema_for;
use serde_json::Value;
use std::collections::VecDeque;
use std::fmt::{Debug, Display, Formatter};
use std::fs;
use std::io::Write;

#[derive(Default)]
struct Queue<'a> {
    /// Queue of type names and definitions that need to be generated
    queue: VecDeque<(String, &'a SchemaObject)>,
}

impl<'a> Queue<'a> {
    fn push_back(&mut self, name: String, schema: &'a SchemaObject) {
        self.queue.push_back((name, schema))
    }

    fn pop_front(&mut self) -> Option<(String, &'a SchemaObject)> {
        self.queue.pop_front()
    }
}

impl<'a> Display for Queue<'a> {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        for (name, _) in &self.queue {
            f.write_str(&name)?;
        }
        Ok(())
    }
}

impl<'a> Debug for Queue<'a> {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        std::fmt::Display::fmt(self, f)
    }
}

struct Header {
    level: u8,
}

#[derive(Clone, Default)]
struct Title {
    prefix: String,
}

impl Display for Title {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        f.write_str("`")?;
        f.write_str(&self.prefix)?;
        f.write_str("`")?;

        Ok(())
    }
}

impl Title {
    fn add_prefix(&self, prefix: impl Into<String>) -> Title {
        let prefix = if self.prefix.is_empty() {
            prefix.into()
        } else {
            format!("{}.{}", self.prefix, prefix.into())
        };
        Title { prefix }
    }
}

impl Default for Header {
    fn default() -> Self {
        Self { level: 3 }
    }
}

impl Display for Header {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        for _i in 0..self.level {
            f.write_str("#")?;
        }
        Ok(())
    }
}

fn top_level_object<'q, 'a>(
    queue: &'q mut Queue<'a>,
    buffer: &mut Vec<u8>,
    root_schema: &'a RootSchema,
    schema_object: &'a SchemaObject,
    header: &'q mut Header,
    title: Title,
) -> anyhow::Result<()> {
    let metadata = schema_object.metadata.as_ref();

    if let Some(metadata) = metadata {
        if let Some(description) = metadata.description.as_ref() {
            writeln!(buffer, "{description}")?;
            writeln!(buffer)?;
        }
    }

    if let Some(object) = schema_object.object.as_ref() {
        for (prop_name, prop_schema) in &object.properties {
            let key = prop_name.trim_start_matches("#/definitions/");
            match &root_schema.definitions.get(key) {
                Some(Schema::Object(schema)) => {
                    queue.push_back(key.to_string(), schema);
                    top_level_object(queue, buffer, root_schema, schema, header, title.clone())?
                }
                None => {
                    let object = prop_schema.clone().into_object();

                    if let Some(metadata) = &object.metadata {
                        let new_title = title.add_prefix(key);
                        writeln!(buffer, "{header} {new_title}")?;

                        writeln!(buffer)?;

                        if let Some(description) = metadata.description.as_ref() {
                            writeln!(buffer, "{description}")?;
                            writeln!(buffer)?;
                        }
                    }
                    if let Some(instance_type) = &object.instance_type {
                        match instance_type {
                            SingleOrVec::Single(ty) => {
                                if !ty.as_ref().eq(&InstanceType::Null) {
                                    writeln!(buffer, "> **Type**: {ty:?}")?;
                                }
                            }
                            SingleOrVec::Vec(tys) => {
                                for ty in tys {
                                    if !ty.eq(&InstanceType::Null) {
                                        writeln!(buffer, "> **Type**: {ty:?}")?;
                                    }
                                }
                            }
                        }
                        writeln!(buffer)?;
                    }
                    let references = pull_sub_schemas(&object);
                    if let Some(references) = references {
                        push_definitions(queue, references, root_schema);
                        while let Some((_name, schema)) = queue.pop_front() {
                            let new_title = title.add_prefix(key);
                            top_level_object(queue, buffer, root_schema, schema, header, new_title)?
                        }
                    }
                }
                _ => {
                    unimplemented!("To implement.")
                }
            }
        }
    }

    let references = pull_sub_schemas(&schema_object);

    if let Some(references) = references {
        push_definitions(queue, references, root_schema);
        while let Some((_name, schema)) = queue.pop_front() {
            top_level_object(queue, buffer, root_schema, schema, header, title.clone())?
        }
    }

    Ok(())
}

fn push_definitions<'q, 'a>(
    queue: &'q mut Queue<'a>,
    references: Vec<String>,
    root_schema: &'a RootSchema,
) {
    for reference in references {
        let key = reference.trim_start_matches("#/definitions/");
        match root_schema.definitions.get(key) {
            Some(Schema::Object(schema)) => {
                queue.push_back(key.to_string(), schema);
            }
            None => {}
            _ => {
                unimplemented!("To implement.")
            }
        }
    }
}

fn pull_sub_schemas(schema_object: &SchemaObject) -> Option<Vec<String>> {
    let result: Option<Vec<_>> = schema_object
        .subschemas
        .as_ref()
        .and_then(|validation| validation.any_of.as_ref())
        .map(|any_of| {
            let res = any_of
                .into_iter()
                .filter(|any_of| any_of.is_ref())
                .map(|any_of| any_of.clone().into_object())
                .map(|schema| schema.reference.unwrap_or_default())
                .collect();

            res
        });

    result
}

pub fn generate_buffer(buffer: &mut Vec<u8>) -> anyhow::Result<()> {
    let root = schema_for!(PartialConfiguration);
    writeln!(buffer, "{}", generate_markdown_hearer())?;

    writeln!(
        buffer,
        "{}",
        &root.schema.metadata.clone().unwrap().description.unwrap()
    )?;
    writeln!(buffer)?;

    if let Some(object) = &root.schema.object {
        let iter = object.properties.iter().enumerate();
        for (_index, (property_name, property_schema)) in iter {
            let mut queue = Queue::default();
            let schema_object = property_schema.clone().into_object();
            writeln!(buffer, "## `{property_name}`")?;
            writeln!(buffer)?;
            let mut header = Header::default();
            let title = Title {
                prefix: property_name.to_string(),
            };
            top_level_object(
                &mut queue,
                buffer,
                &root,
                &schema_object,
                &mut header,
                title,
            )?;
        }
    }

    Ok(())
}

pub fn generate_configuration() -> anyhow::Result<()> {
    let mut buffer = Vec::new();

    generate_buffer(&mut buffer)?;

    fs::write("src/content/docs/reference/configuration_v2.mdx", buffer)?;

    Ok(())
}

fn generate_markdown_hearer() -> String {
    let header = r#"---
title: Configuration
emoji: ⚙️
category: reference
description: How to customize and configure Biome with biome.json.
---
"#;

    header.to_string()
}

pub fn format_code_block(description: &str) -> Result<String, serde_json::Error> {
    let mut formatted_description = String::new();

    for line in description.split('\n') {
        let line = line.trim();

        if line.starts_with("```json title=") {
            formatted_description.push_str(&format_json_block(line)?);
        } else {
            formatted_description.push_str(&format_list_line(line));
        }
        formatted_description.push('\n');
    }

    Ok(formatted_description)
}

fn format_json_block(line: &str) -> Result<String, serde_json::Error> {
    let title = extract_title(line);
    let json_body = extract_json_body(line);

    let parsed_json = serde_json::from_str::<Value>(&json_body)?;
    let pretty_json = serde_json::to_string_pretty(&parsed_json)?;

    Ok(format!("{}\n{}\n", title, pretty_json))
}

fn extract_title(line: &str) -> String {
    line.split_once('\"')
        .and_then(|(_, rest)| rest.split_once('\"'))
        .map_or(String::new(), |(title, _)| {
            format!("```json title=\"{}\"", title)
        })
}

fn extract_json_body(line: &str) -> String {
    line.split_once('{')
        .and_then(|(_, rest)| rest.rsplit_once('}'))
        .map_or(String::new(), |(json_body, _)| format!("{{{}}}", json_body))
}

fn format_list_line(line: &str) -> String {
    if line.contains(": -") || line.contains(". -") {
        format_list(line)
    } else {
        line.to_string()
    }
}

fn format_list(description: &str) -> String {
    if let Some((header, items)) = description.split_once(':') {
        let formatted_header = format!("{}:\n", header.trim());
        let formatted_items = items
            .split("; -")
            .enumerate()
            .map(|(index, item)| format_list_item(item, index > 0))
            .collect::<Vec<String>>()
            .join("\n");

        format!("{}{}", formatted_header, formatted_items)
    } else {
        description.to_string()
    }
}

fn format_list_item(item: &str, needs_bullet_point: bool) -> String {
    let trimmed_item = item.trim();
    let bullet_point = if needs_bullet_point { "- " } else { "" };
    format!("{}{}", bullet_point, trimmed_item)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::path::PathBuf;

    #[test]
    fn test_format_code_block() {
        let mut buffer = vec![];
        generate_buffer(&mut buffer).unwrap();
        let string = String::from_utf8(buffer).unwrap();
        println!("{string}")
    }
}
