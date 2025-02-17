use crate::lintdoc::RuleToDocument;
use crate::shared::add_codegen_disclaimer_frontmatter;
use anyhow::Result;
use biome_analyze::RuleCategory;
use biome_string_case::Case;
use std::cmp::Ordering;
use std::collections::{BTreeMap, BTreeSet};
use std::io::Write;

#[derive(Debug, Eq, PartialEq)]
struct SourceSet {
    source_rule_name: String,
    source_link: String,
    biome_rule_name: String,
    biome_link: String,
    inspired: bool,
}

impl Ord for SourceSet {
    fn cmp(&self, other: &Self) -> Ordering {
        self.source_rule_name.cmp(&other.source_rule_name)
    }
}

impl PartialOrd for SourceSet {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

pub(crate) fn generate_rule_sources(
    rules: BTreeMap<&str, BTreeMap<&'static str, RuleToDocument>>,
    rule_category: RuleCategory,
) -> Result<Vec<u8>> {
    let mut buffer = vec![];

    let name = match rule_category {
        RuleCategory::Lint => "Rules",
        RuleCategory::Action => "Actions",
        _ => unreachable!(""),
    };

    let name_lower_case = match rule_category {
        RuleCategory::Lint => "rules",
        RuleCategory::Action => "actions",
        _ => unreachable!(""),
    };

    writeln!(buffer, "---")?;
    add_codegen_disclaimer_frontmatter(&mut buffer)?;
    writeln!(
        buffer,
        r#"
title: {name} sources
description: A page that maps {name_lower_case} from other sources to Biome
---
    "#
    )?;

    let rules = rules
        .into_iter()
        .flat_map(|(_, rule)| rule)
        .collect::<BTreeMap<&str, RuleToDocument>>();

    let mut rules_by_source = BTreeMap::<String, BTreeSet<SourceSet>>::new();
    let mut exclusive_biome_rules = BTreeSet::<(String, String)>::new();
    let prefix_path = match rule_category {
        RuleCategory::Lint => "linter/rules",
        RuleCategory::Action => "assist/actions",
        _ => unreachable!(""),
    };

    for (rule_name, rule_to_document) in rules {
        for (_, metadata) in rule_to_document.language_to_metadata {
            if metadata.version == "next" {
                continue;
            }
            let kebab_rule_name = Case::Kebab.convert(rule_name);
            if metadata.sources.is_empty() {
                exclusive_biome_rules.insert((
                    rule_name.to_string(),
                    format!("/{prefix_path}/{kebab_rule_name}"),
                ));
            } else {
                for source in metadata.sources {
                    let set = rules_by_source.get_mut(&format!("{source}"));
                    if let Some(set) = set {
                        set.insert(SourceSet {
                            biome_rule_name: rule_name.to_string(),
                            biome_link: format!("/{prefix_path}/{kebab_rule_name}"),
                            source_link: source.to_rule_url(),
                            source_rule_name: source.as_rule_name().to_string(),
                            inspired: metadata
                                .source_kind
                                .map_or(false, |kind| kind.is_inspired()),
                        });
                    } else {
                        let mut set = BTreeSet::new();
                        set.insert(SourceSet {
                            biome_rule_name: rule_name.to_string(),
                            biome_link: format!("/{prefix_path}/{kebab_rule_name}"),
                            source_link: source.to_rule_url(),
                            source_rule_name: source.as_rule_name().to_string(),
                            inspired: metadata.source_kind.map_or(true, |kind| kind.is_inspired()),
                        });
                        rules_by_source.insert(format!("{source}"), set);
                    }
                }
            }
        }
    }

    writeln!(buffer, "## Biome exclusive {name_lower_case}",)?;
    for (rule, link) in exclusive_biome_rules {
        writeln!(buffer, "- [{rule}]({link}) ")?;
    }

    writeln!(buffer, "## {name} from other sources",)?;
    writeln!(
        buffer,
        r#":::note
Some **Biome** rules might **not** have options, compared to the original rule.
:::"#
    )?;

    for (source, rules) in rules_by_source {
        writeln!(buffer, "### {source}")?;
        writeln!(buffer, r#"| {source} {name} name | Biome {name} name |"#)?;
        writeln!(buffer, r#"| ---- | ---- |"#)?;

        push_to_table(rules, &mut buffer)?;
    }

    Ok(buffer)
}

fn push_to_table(source_set: BTreeSet<SourceSet>, buffer: &mut Vec<u8>) -> Result<u8> {
    let mut footnotes = 0;
    for source_set in source_set {
        write!(
            buffer,
            "| [{}]({}) |[{}]({})",
            source_set.source_rule_name,
            source_set.source_link,
            source_set.biome_rule_name,
            source_set.biome_link
        )?;

        if source_set.inspired {
            footnotes += 1;
            write!(buffer, " (inspired)")?;
        }
        writeln!(buffer, " |")?;
    }

    Ok(footnotes)
}
