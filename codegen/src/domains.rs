use crate::project_root;
use crate::shared::{CodegenEditUrl, add_codegen_disclaimer_frontmatter};
use biome_analyze::{RuleDomain, RuleMetadata};
use biome_formatter::Expand;
use biome_json_factory::make::{
    json_member, json_member_list, json_member_name, json_object_value, json_string_literal,
    json_string_value, token,
};
use biome_json_formatter::context::JsonFormatOptions;
use biome_json_formatter::format_node;
use biome_json_syntax::{AnyJsonMemberName, AnyJsonValue, JsonObjectValue, T};
use biome_rowan::AstNode;
use biome_string_case::Case;
use std::collections::HashMap;
use std::fs;
use std::io::Write;

const DOMAINS_EDIT_URL: &str =
    "https://github.com/biomejs/website/edit/main/codegen/src/domains.rs";

pub fn generate_domains() -> anyhow::Result<()> {
    let mut visitor = crate::lintdoc::RulesVisitor::default();
    biome_js_analyze::visit_registry(&mut visitor);
    biome_json_analyze::visit_registry(&mut visitor);
    biome_css_analyze::visit_registry(&mut visitor);
    biome_graphql_analyze::visit_registry(&mut visitor);
    biome_html_analyze::visit_registry(&mut visitor);
    let crate::lintdoc::RulesVisitor { lints, .. } = visitor;
    let domains = lints.domains_to_document;
    let mut buffer = Vec::new();

    writeln!(buffer, "---")?;
    add_codegen_disclaimer_frontmatter(&mut buffer, CodegenEditUrl::Url(DOMAINS_EDIT_URL))?;
    writeln!(buffer, "title: Domains")?;
    writeln!(buffer, "description: List of available domains")?;
    writeln!(buffer, "---")?;

    domains.write_description(&mut buffer)?;

    fs::write(
        project_root().join("src/content/docs/linter/domains.mdx"),
        buffer,
    )?;

    Ok(())
}

#[derive(Default, Debug, Clone)]
pub struct DocDomains {
    /// A list where we associate a rule domain with the rules that belong to it
    domain_to_rules: HashMap<RuleDomain, Vec<(String, RuleMetadata)>>,
}

impl DocDomains {
    pub(crate) fn add_rule(&mut self, group: &str, rule: RuleMetadata) {
        if !rule.domains.is_empty() {
            for domain in rule.domains {
                let domain_to_update = self.domain_to_rules.entry(*domain).or_default();

                domain_to_update.push((group.to_string(), rule.clone()));
            }
        }
    }

    fn write_description(self, buffer: &mut Vec<u8>) -> anyhow::Result<()> {
        let mut domains = self.domain_to_rules.into_iter().collect::<Vec<_>>();
        domains.sort_by_key(|(domain, _)| *domain);
        for (domain, rules) in &domains {
            let name = Case::Pascal.convert(format!("{domain:?}").as_str());
            if rules.is_empty() {
                continue;
            }
            writeln!(buffer, "## {name}")?;
            writeln!(buffer, "{}", domain.as_description())?;

            Self::write_activation(name.as_str(), rules.as_slice(), buffer)?;
            Self::write_dependencies(domain, name.as_str(), buffer)?;
            Self::write_globals(domain, name.as_str(), buffer)?;
            Self::write_rules(rules.as_slice(), name.as_str(), buffer)?
        }

        Ok(())
    }

    fn write_rules(
        rules: &[(String, RuleMetadata)],
        name: &str,
        buffer: &mut Vec<u8>,
    ) -> anyhow::Result<()> {
        if !rules.is_empty() {
            writeln!(buffer, "### {name} rules")?;
            writeln!(buffer, "Rules that belong to the domain:")?;

            for (group, rule) in rules {
                let dashed_rule = Case::Kebab.convert(rule.name);

                write!(buffer, "- [{}](/linter/rules/{dashed_rule})", rule.name)?;

                if rule.recommended && group != "nursery" {
                    write!(buffer, " (recommended)")?;
                }
                if group == "nursery" {
                    write!(buffer, " [(nursery)](/linter/#nursery)")?;
                }
                writeln!(buffer)?;
            }
        }

        Ok(())
    }

    fn write_dependencies(
        domain: &RuleDomain,
        name: &str,
        buffer: &mut Vec<u8>,
    ) -> anyhow::Result<()> {
        let dependencies = domain.manifest_dependencies();
        if !dependencies.is_empty() {
            writeln!(buffer, "### {name} dependencies")?;
            writeln!(
                buffer,
                "Enabled when the following dependencies are declared:"
            )?;
            for (name, version) in domain.manifest_dependencies() {
                writeln!(buffer, "- `{name}`: `{version}`")?;
            }

            writeln!(buffer)?;
        }
        Ok(())
    }

    fn write_activation(
        name: &str,
        rules: &[(String, RuleMetadata)],
        buffer: &mut Vec<u8>,
    ) -> anyhow::Result<()> {
        writeln!(buffer, "### {name} activation")?;
        let recommended = format_node(
            JsonFormatOptions::default().with_expand(Expand::Always),
            make_config_json(Case::Lower.convert(name).as_str(), "recommended").syntax(),
        )?
        .print()?;

        writeln!(
            buffer,
            "Enable the **recommended, non-nursery** rules of the domain:"
        )?;
        writeln!(buffer, "```json title=\"biome.json\" ins={{3-5}}")?;
        writeln!(buffer, "{}", recommended.as_code())?;
        writeln!(buffer, "```")?;

        // Check if all rules are nursery rules
        let all_nursery = !rules.is_empty() && rules.iter().all(|(group, _)| group == "nursery");
        if all_nursery {
            writeln!(buffer)?;
            writeln!(
                buffer,
                ":::note[No recommended rules]\nSince all rules in this domain are nursery rules, no rules will be activated when enabling the domain. You need to enable the single rules.\n:::"
            )?;
        }

        let all = format_node(
            JsonFormatOptions::default().with_expand(Expand::Always),
            make_config_json(Case::Lower.convert(name).as_str(), "all").syntax(),
        )?
        .print()?;

        writeln!(buffer, "Enabled the **all** rules of the domain:")?;
        writeln!(buffer, "```json title=\"biome.json\" ins={{3-5}}")?;
        writeln!(buffer, "{}", all.as_code())?;
        writeln!(buffer, "```")?;

        let none = format_node(
            JsonFormatOptions::default().with_expand(Expand::Always),
            make_config_json(Case::Lower.convert(name).as_str(), "none").syntax(),
        )?
        .print()?;

        writeln!(buffer, "**Disable** all rules of the domain:")?;
        writeln!(buffer, "```json title=\"biome.json\" ins={{3-5}}")?;
        writeln!(buffer, "{}", none.as_code())?;
        writeln!(buffer, "```")?;

        Ok(())
    }

    fn write_globals(domain: &RuleDomain, name: &str, buffer: &mut Vec<u8>) -> anyhow::Result<()> {
        let globals = domain.globals();

        if !globals.is_empty() {
            writeln!(buffer, "### {name} globals")?;
            writeln!(
                buffer,
                "When enabled, the following global bindings are recognised by Biome:"
            )?;
            for global in globals {
                writeln!(buffer, "- `{global}`")?;
            }
            writeln!(buffer)?;
        }

        Ok(())
    }
}

fn make_config_json(domain_name: &str, value: &str) -> JsonObjectValue {
    json_object_value(
        token(T!['{']),
        json_member_list(
            vec![json_member(
                AnyJsonMemberName::JsonMemberName(json_member_name(json_string_literal("linter"))),
                token(T![:]),
                AnyJsonValue::JsonObjectValue(json_object_value(
                    token(T!['{']),
                    json_member_list(
                        vec![json_member(
                            AnyJsonMemberName::JsonMemberName(json_member_name(
                                json_string_literal("domains"),
                            )),
                            token(T![:]),
                            AnyJsonValue::JsonObjectValue(json_object_value(
                                token(T!['{']),
                                json_member_list(
                                    vec![json_member(
                                        AnyJsonMemberName::JsonMemberName(json_member_name(
                                            json_string_literal(domain_name),
                                        )),
                                        token(T![:]),
                                        AnyJsonValue::JsonStringValue(json_string_value(
                                            json_string_literal(value),
                                        )),
                                    )],
                                    vec![],
                                ),
                                token(T!['}']),
                            )),
                        )],
                        vec![],
                    ),
                    token(T!['}']),
                )),
            )],
            vec![],
        ),
        token(T!['}']),
    )
}
