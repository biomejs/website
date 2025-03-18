use crate::domains::{DocDomains, generate_domains};
use crate::project_root;
use crate::rules_sources::generate_rule_sources;
use crate::shared::add_codegen_disclaimer_frontmatter;
use anyhow::Context;
use anyhow::{Result, bail};
use biome_analyze::options::JsxRuntime;
use biome_analyze::{
    AnalysisFilter, AnalyzerAction, AnalyzerConfiguration, AnalyzerOptions, ControlFlow, FixKind,
    GroupCategory, Queryable, RegistryVisitor, Rule, RuleCategory, RuleFilter, RuleGroup,
    RuleMetadata, RuleSourceKind,
};
use biome_configuration::Configuration;
use biome_console::fmt::Termcolor;
use biome_console::{
    Markup, MarkupBuf,
    fmt::{Formatter, HTML},
    markup,
};
use biome_css_parser::CssParserOptions;
use biome_css_syntax::CssLanguage;
use biome_deserialize::json::deserialize_from_json_ast;
use biome_diagnostics::termcolor::NoColor;
use biome_diagnostics::{Diagnostic, DiagnosticExt, PrintDiagnostic, Severity, Visit};
use biome_formatter::LineWidth;
use biome_fs::BiomePath;
use biome_graphql_syntax::GraphqlLanguage;
use biome_js_parser::JsParserOptions;
use biome_js_syntax::{EmbeddingKind, JsFileSource, JsLanguage};
use biome_json_factory::make;
use biome_json_formatter::context::JsonFormatOptions;
use biome_json_formatter::format_node;
use biome_json_parser::JsonParserOptions;
use biome_json_syntax::{AnyJsonValue, JsonLanguage, JsonObjectValue};
use biome_rowan::{AstNode, TextSize};
use biome_service::settings::{ServiceLanguage, Settings};
use biome_service::workspace::DocumentFileSource;
use biome_string_case::Case;
use biome_text_edit::TextEdit;
use pulldown_cmark::{CodeBlockKind, Event, LinkType, Parser, Tag, TagEnd};
use std::collections::{BTreeSet, HashMap, HashSet};
use std::error::Error;
use std::path::PathBuf;
use std::{
    collections::BTreeMap,
    fmt::Write as _,
    fs,
    io::{self, Write as _},
    path::Path,
    slice,
    str::{self, FromStr},
};

#[derive(Debug, Default, Clone)]
pub struct RuleToDocument {
    pub language_to_metadata: HashMap<&'static str, RuleMetadata>,
}

#[derive(Default)]
pub struct RulesVisitor {
    pub lints: Rules,
    pub actions: Rules,
}

#[derive(Default, Clone)]
pub struct Rules {
    /// This is mapped to:
    /// - group (correctness) -> list of rules
    /// - list or rules is mapped to
    /// - rule name -> list of languages
    /// - list of languages is mapped to
    /// - language -> metadata
    ///
    groups: BTreeMap<&'static str, BTreeMap<&'static str, RuleToDocument>>,
    number_of_rules: HashSet<&'static str>,
    pub(crate) domains_to_document: DocDomains,
}

enum SupportedLanguages {
    Js,
    Css,
    Graphql,
    Json,
}

impl SupportedLanguages {
    fn to_visitor(&self) -> RulesVisitor {
        let mut visitor = RulesVisitor::default();
        match self {
            SupportedLanguages::Js => biome_js_analyze::visit_registry(&mut visitor),
            SupportedLanguages::Css => biome_css_analyze::visit_registry(&mut visitor),
            SupportedLanguages::Graphql => biome_graphql_analyze::visit_registry(&mut visitor),
            SupportedLanguages::Json => biome_json_analyze::visit_registry(&mut visitor),
        };
        visitor
    }

    fn as_language_path(&self, root: &Path) -> PathBuf {
        match self {
            SupportedLanguages::Js => root.join("javascript"),
            SupportedLanguages::Css => root.join("css"),
            SupportedLanguages::Graphql => root.join("graphql"),
            SupportedLanguages::Json => root.join("json"),
        }
    }

    const fn as_prefix(&self) -> &str {
        match self {
            SupportedLanguages::Js => "JavaScript",
            SupportedLanguages::Css => "CSS",
            SupportedLanguages::Graphql => "GraphQL",
            SupportedLanguages::Json => "JSON",
        }
    }
}

impl RulesVisitor {
    fn push_rule<R, L>(&mut self)
    where
        R: Rule<Options: Default, Query: Queryable<Language = L, Output: Clone>> + 'static,
    {
        if <R::Group as RuleGroup>::Category::CATEGORY == RuleCategory::Lint {
            let lints = &mut self.lints;
            lints.number_of_rules.insert(R::METADATA.name);
            let group = lints
                .groups
                .entry(<R::Group as RuleGroup>::NAME)
                .or_default();
            if let Some(rules_to_document) = group.get_mut(R::METADATA.name) {
                rules_to_document
                    .language_to_metadata
                    .insert(R::METADATA.language, R::METADATA);
            } else {
                let mut rule_to_document = RuleToDocument::default();
                rule_to_document
                    .language_to_metadata
                    .insert(R::METADATA.language, R::METADATA);
                group.insert(R::METADATA.name, rule_to_document);
            };
            self.lints.domains_to_document.add_rule(R::METADATA);
        } else {
            let actions = &mut self.actions;
            actions.number_of_rules.insert(R::METADATA.name);
            let group = actions
                .groups
                .entry(<R::Group as RuleGroup>::NAME)
                .or_default();
            if let Some(rules_to_document) = group.get_mut(R::METADATA.name) {
                rules_to_document
                    .language_to_metadata
                    .insert(R::METADATA.language, R::METADATA);
            } else {
                let mut rule_to_document = RuleToDocument::default();
                rule_to_document
                    .language_to_metadata
                    .insert(R::METADATA.language, R::METADATA);
                group.insert(R::METADATA.name, rule_to_document);
            };
        }
    }
}

impl RegistryVisitor<JsLanguage> for RulesVisitor {
    fn record_category<C: GroupCategory<Language = JsLanguage>>(&mut self) {
        if matches!(C::CATEGORY, RuleCategory::Lint | RuleCategory::Action) {
            C::record_groups(self);
        }
    }

    fn record_rule<R>(&mut self)
    where
        R: Rule<Query: Queryable<Language = JsLanguage, Output: Clone>> + 'static,
    {
        self.push_rule::<R, <R::Query as Queryable>::Language>()
    }
}

impl RegistryVisitor<JsonLanguage> for RulesVisitor {
    fn record_category<C: GroupCategory<Language = JsonLanguage>>(&mut self) {
        if matches!(C::CATEGORY, RuleCategory::Lint | RuleCategory::Action) {
            C::record_groups(self);
        }
    }

    fn record_rule<R>(&mut self)
    where
        R: Rule<Query: Queryable<Language = JsonLanguage, Output: Clone>> + 'static,
    {
        self.push_rule::<R, <R::Query as Queryable>::Language>()
    }
}

impl RegistryVisitor<CssLanguage> for RulesVisitor {
    fn record_category<C: GroupCategory<Language = CssLanguage>>(&mut self) {
        if matches!(C::CATEGORY, RuleCategory::Lint | RuleCategory::Action) {
            C::record_groups(self);
        }
    }

    fn record_rule<R>(&mut self)
    where
        R: Rule<Query: Queryable<Language = CssLanguage, Output: Clone>> + 'static,
    {
        self.push_rule::<R, <R::Query as Queryable>::Language>()
    }
}
impl RegistryVisitor<GraphqlLanguage> for RulesVisitor {
    fn record_category<C: GroupCategory<Language = GraphqlLanguage>>(&mut self) {
        if matches!(C::CATEGORY, RuleCategory::Lint | RuleCategory::Action) {
            C::record_groups(self);
        }
    }

    fn record_rule<R>(&mut self)
    where
        R: Rule<Query: Queryable<Language = GraphqlLanguage, Output: Clone>> + 'static,
    {
        self.push_rule::<R, <R::Query as Queryable>::Language>()
    }
}

pub fn generate_rule_docs() -> Result<()> {
    let linter_root = project_root().join("src/content/docs/linter");
    let actions_root = project_root().join("src/content/docs/assist");
    generate_language_rule_docs(&linter_root, &actions_root, SupportedLanguages::Js)?;
    generate_language_rule_docs(&linter_root, &actions_root, SupportedLanguages::Json)?;
    generate_language_rule_docs(&linter_root, &actions_root, SupportedLanguages::Css)?;
    generate_language_rule_docs(&linter_root, &actions_root, SupportedLanguages::Graphql)?;

    generate_domains()?;
    generate_number_of_rules_and_actions()?;
    generate_rule_pages()?;
    Ok(())
}

fn generate_number_of_rules_and_actions() -> Result<()> {
    let mut visitor = RulesVisitor::default();
    biome_js_analyze::visit_registry(&mut visitor);
    biome_json_analyze::visit_registry(&mut visitor);
    biome_css_analyze::visit_registry(&mut visitor);
    biome_graphql_analyze::visit_registry(&mut visitor);

    let RulesVisitor { actions, lints } = visitor;
    let number_of_rules = lints.number_of_rules.len();
    let number_of_actions = actions.number_of_rules.len();
    let number_of_rules_buffer = format!(
        "<!-- this file is auto generated, use `pnpm codegen:rules` to update it -->\n{number_of_rules}"
    );
    let number_of_actions_buffer = format!(
        "<!-- this file is auto generated, use `pnpm codegen:rules` to update it -->\n{number_of_actions}"
    );

    fs::write(
        project_root().join("src/components/generated/linter/NumberOfRules.astro"),
        number_of_rules_buffer,
    )?;
    fs::write(
        project_root().join("src/components/generated/assist/NumberOfRules.astro"),
        number_of_actions_buffer,
    )?;

    Ok(())
}

fn generate_language_rule_docs(
    linter_root: &Path,
    actions_root: &Path,
    supported_languages: SupportedLanguages,
) -> Result<()> {
    let visitor = supported_languages.to_visitor();
    let linter_root = supported_languages.as_language_path(linter_root);
    let actions_root = supported_languages.as_language_path(actions_root);

    if linter_root.exists() {
        if let Err(err) = fs::remove_dir_all(&linter_root) {
            let is_not_found = err
                .source()
                .and_then(|err| err.downcast_ref::<io::Error>())
                .is_some_and(|err| matches!(err.kind(), io::ErrorKind::NotFound));

            if !is_not_found {
                return Err(err.into());
            }
        }
    }
    fs::create_dir_all(&linter_root)?;

    if actions_root.exists() {
        if let Err(err) = fs::remove_dir_all(&actions_root) {
            let is_not_found = err
                .source()
                .and_then(|err| err.downcast_ref::<io::Error>())
                .is_some_and(|err| matches!(err.kind(), io::ErrorKind::NotFound));

            if !is_not_found {
                return Err(err.into());
            }
        }
    }
    fs::create_dir_all(&actions_root)?;

    let RulesVisitor { actions, lints } = visitor;
    let lint_sources = linter_root.join("sources.mdx");
    let actions_sources = actions_root.join("sources.mdx");
    generate_language_page(
        RuleCategory::Lint,
        lints.clone(),
        linter_root.join("rules.mdx"),
        &supported_languages,
    )?;
    generate_language_page(
        RuleCategory::Action,
        actions.clone(),
        actions_root.join("actions.mdx"),
        &supported_languages,
    )?;

    let rule_sources_buffer = generate_rule_sources(lints.groups.clone(), RuleCategory::Lint)?;
    fs::write(lint_sources, rule_sources_buffer)?;
    let rule_sources_buffer = generate_rule_sources(actions.groups.clone(), RuleCategory::Action)?;
    fs::write(actions_sources, rule_sources_buffer)?;

    Ok(())
}

/// Generate the pages of all rules
fn generate_rule_pages() -> Result<()> {
    let mut visitor = RulesVisitor::default();
    biome_js_analyze::visit_registry(&mut visitor);
    biome_json_analyze::visit_registry(&mut visitor);
    biome_css_analyze::visit_registry(&mut visitor);
    biome_graphql_analyze::visit_registry(&mut visitor);

    let RulesVisitor { actions, lints } = visitor;

    let linter_root = project_root().join("src/content/docs/linter/rules");
    let actions_root = project_root().join("src/content/docs/assist/actions");

    for (group, rules) in &lints.groups {
        let is_nursery = *group == "nursery";
        for (rule_name, rule_to_document) in rules {
            generate_rule(
                GenRule {
                    content_root: &linter_root,
                    group,
                    rule_name,
                    is_nursery,
                    rule_to_document,
                },
                "linter",
                "rules",
                RuleCategory::Lint,
            )?;
        }
    }

    for (group, rules) in &actions.groups {
        let is_nursery = *group == "nursery";
        for (rule_name, rule_to_document) in rules {
            generate_rule(
                GenRule {
                    content_root: &actions_root,
                    group,
                    rule_name,
                    is_nursery,
                    rule_to_document,
                },
                "assist",
                "action",
                RuleCategory::Action,
            )?;
        }
    }

    Ok(())
}

/// It generates the summary page for each language, which present the rules that belong to this language
fn generate_language_page(
    rule_category: RuleCategory,
    rules: Rules,
    index_page: PathBuf,
    language_prefix: &SupportedLanguages,
) -> Result<()> {
    let language_prefix = language_prefix.as_prefix();
    let mut recommended_rules = String::new();

    let Rules { groups, .. } = rules;

    let title = match rule_category {
        RuleCategory::Lint => "Rules",
        RuleCategory::Action => "Actions",
        _ => unimplemented!(""),
    };

    let description = match rule_category {
        RuleCategory::Lint => "List of available lint rules",
        RuleCategory::Action => "List of available lint actions",
        _ => unimplemented!(""),
    };

    let path_prefix = match rule_category {
        RuleCategory::Lint => "linter",
        RuleCategory::Action => "assist",
        _ => unimplemented!(""),
    };

    // Content of the index page
    let mut index = Vec::new();
    let mut reference_buffer = Vec::new();
    writeln!(index, "---")?;
    add_codegen_disclaimer_frontmatter(&mut index)?;
    writeln!(index, "title: {language_prefix} {title}")?;
    writeln!(index, "description: {description} for {language_prefix}")?;
    writeln!(index, "---")?;
    writeln!(index)?;

    write!(
        index,
        r#"
import {{ Icon }} from "@astrojs/starlight/components";

Below the list of rules supported by Biome, divided by group. Here's a legend of the emojis:
- The icon <span class='inline-icon' title="This rule is recommended"><Icon name="approve-check-circle"x label="This rule is recommended" /></span> indicates that the rule is part of the recommended rules.
- The icon <span class='inline-icon' title="This rule has a safe fix"><Icon name="seti:config" label="The rule has a safe fix" /></span> indicates that the rule provides a code action (fix) that is **safe** to apply.
- The icon <span class='inline-icon' title="This rule has an unsafe fix"><Icon name="warning" label="The rule has an unsafe fix" /></span> indicates that the rule provides a code action (fix) that is **unsafe** to apply.
- The icon <span class='inline-icon' title="This rule hasn't been released"><Icon name="error" label="This rule hasn't been released" /></span> indicates that the rule hasn't been released yet.
"#
    )?;

    writeln!(
        reference_buffer,
        "<!-- this file is auto generated, use `pnpm codegen:all` to update it -->"
    )?;
    for (group, rules) in &groups {
        generate_group(
            group,
            rules,
            &mut index,
            &mut recommended_rules,
            path_prefix,
            rule_category,
        )?;
    }

    let recommended_rules_buffer = format!("## Recommended rules \n{recommended_rules}");

    writeln!(index, "{recommended_rules_buffer}")?;

    fs::write(index_page, index)?;

    Ok(())
}

#[allow(clippy::too_many_arguments)]
fn generate_group(
    group: &'static str,
    rules: &BTreeMap<&'static str, RuleToDocument>,
    content: &mut dyn io::Write,
    recommended_rules: &mut String,
    path_prefix: &str,
    rule_category: RuleCategory,
) -> Result<()> {
    let is_nursery = group == "nursery";
    let middle_path = match rule_category {
        RuleCategory::Lint => "rules",
        RuleCategory::Action => "actions",
        _ => unimplemented!(""),
    };
    writeln!(content, "\n## `{group}`")?;
    writeln!(content)?;
    writeln!(content, "| Rule name | Description | Properties |")?;
    writeln!(content, "| --- | --- | --- |")?;

    for (rule_name, rule_to_document) in rules {
        for meta in rule_to_document.clone().language_to_metadata.values() {
            let is_recommended = !is_nursery && meta.recommended && meta.domains.is_empty();
            let dashed_rule = Case::Kebab.convert(rule_name);
            let severity = match meta.severity {
                Severity::Information => "(Severity: Information".to_string(),
                Severity::Warning => "Severity: Warning".to_string(),
                Severity::Error => "Severity: Error".to_string(),
                Severity::Hint | Severity::Fatal => {
                    unreachable!("A rule doesn't have this severity.")
                }
            };
            if is_recommended {
                recommended_rules.push_str(&format!(
                    "- [{rule_name}](/{path_prefix}/{middle_path}/{dashed_rule}) ({severity})\n"
                ));
            }

            let mut properties = String::new();
            if is_recommended {
                properties.push_str("<span class='inline-icon' title=\"This rule is recommended\" ><Icon name=\"approve-check-circle\" size=\"1.2rem\" label=\"This rule is recommended\" /></span>");
            }

            match meta.fix_kind {
                FixKind::Safe => {
                    properties.push_str("<span class='inline-icon' title='The rule has a safe fix.'><Icon name=\"seti:config\" label=\"The rule has a safe fix\" size=\"1.2rem\"  /></span>");
                }
                FixKind::Unsafe => {
                    properties.push_str("<span class='inline-icon' title=\"The rule has an unsafe fix\" ><Icon name=\"warning\" label=\"The rule has an unsafe fix\" size=\"1.2rem\" /></span>");
                }
                FixKind::None => {}
            }

            if meta.version == "next" {
                properties.push_str("<span class='inline-icon' title=\"This rule hasn't been released yet\"><Icon name=\"error\" label=\"This rule hasn't been released yet\" size=\"1.2rem\" /></span>");
            }

            let summary_html = extract_summary_from_rule(meta.docs);
            write!(
                content,
                "| [{rule_name}](/{path_prefix}/{middle_path}/{dashed_rule}) | {summary_html} | {properties} |"
            )?;

            writeln!(content)?;
        }
    }

    Ok(())
}

struct GenRule<'a> {
    content_root: &'a Path,
    group: &'static str,
    rule_name: &'static str,
    is_nursery: bool,
    rule_to_document: &'a RuleToDocument,
}

/// Generates the documentation page for a single lint rule
fn generate_rule(
    payload: GenRule,
    path_prefix: &str,
    middle_path: &str,
    rule_category: RuleCategory,
) -> Result<()> {
    let mut content = Vec::new();

    let mut errors = Vec::new();

    let result: BTreeSet<_> = payload
        .rule_to_document
        .language_to_metadata
        .iter()
        .filter_map(|(language, meta)| {
            let result = generate_rule_content(RuleContent {
                language,
                group: payload.group,
                rule_name: payload.rule_name,
                is_nursery: payload.is_nursery,
                meta,
                path_prefix,
                middle_path,
                rule_category,
            });

            match result {
                Ok(result) => Some(result),
                Err(err) => {
                    errors.push(err);
                    None
                }
            }
        })
        .collect();

    if !errors.is_empty() {
        bail!(
            "Errors generate while generating rule content for {}: {:?}",
            payload.rule_name,
            errors
        );
    }

    writeln!(content, "---")?;
    add_codegen_disclaimer_frontmatter(&mut content)?;
    writeln!(content, "title: {}", payload.rule_name)?;
    writeln!(
        content,
        "description: Learn more about {}",
        payload.rule_name
    )?;
    writeln!(content, "---")?;

    writeln!(
        content,
        r#"import {{ Tabs, TabItem }} from '@astrojs/starlight/components';"#
    )?;

    if rule_category == RuleCategory::Action {
        writeln!(
            content,
            "import EditorAction from \"@/components/EditorAction.astro\";"
        )?;
    }

    writeln!(content)?;

    writeln!(content, "<Tabs>")?;

    for (rule_content, language, icon) in result {
        writeln!(content, "<TabItem label=\"{language}\" icon=\"{icon}\">")?;
        writeln!(content, "{}", String::from_utf8(rule_content).unwrap())?;
        writeln!(content, "</TabItem>")?;
    }

    writeln!(content, "</Tabs>\n")?;

    let rule_name_case = Case::Kebab.convert(payload.rule_name);
    fs::write(
        payload.content_root.join(format!("{rule_name_case}.mdx")),
        content,
    )?;

    Ok(())
}

#[derive(Debug)]
struct RuleContent<'a> {
    language: &'static str,
    group: &'static str,
    rule_name: &'static str,
    is_nursery: bool,
    meta: &'a RuleMetadata,
    path_prefix: &'a str,
    middle_path: &'a str,
    rule_category: RuleCategory,
}

#[allow(clippy::too_many_arguments)]
fn generate_rule_content(rule_content: RuleContent) -> Result<(Vec<u8>, String, String)> {
    let RuleContent {
        language,
        group,
        rule_name,
        is_nursery,
        meta,
        path_prefix,
        middle_path,
        rule_category,
    } = rule_content;
    let is_recommended = !is_nursery && meta.recommended && meta.domains.is_empty();
    let mut content = Vec::new();

    if let Some(reason) = &meta.deprecated {
        writeln!(content, ":::caution[Deprecated]")?;
        writeln!(
            content,
            "This rule is deprecated and will be removed in the next major release.\n**Reason**: {reason}"
        )?;
        writeln!(content, ":::")?;
    }
    writeln!(content, "## Summary")?;

    if meta.version == "next" {
        writeln!(content, ":::danger")?;
        writeln!(
            content,
            "This rule hasn't been released yet. If you want to try it, you can request and try a preview release of Biome"
        )?;
        writeln!(content, ":::")?;
    } else {
        writeln!(content, "- Rule available since: `v{}`", meta.version)?;
    }

    let category = match rule_category {
        RuleCategory::Lint => "lint",
        RuleCategory::Action => "assist",
        _ => unimplemented!(""),
    };

    match rule_category {
        RuleCategory::Lint => {
            writeln!(
                content,
                "- Diagnostic Category: [`{category}/{}/{}`](/reference/diagnostics#diagnostic-category)",
                group, rule_name
            )?;
            if is_recommended {
                writeln!(
                    content,
                    "- This rule is **recommended**, which means is enabled by default."
                )?;
            }
            match meta.fix_kind {
                FixKind::Safe => {
                    writeln!(
                        content,
                        "- This rule has a [**safe**](/linter/#safe-fixes) fix."
                    )?;
                }
                FixKind::Unsafe => {
                    writeln!(
                        content,
                        "- This rule has an [**unsafe**](/linter/#unsafe-fixes) fix."
                    )?;
                }
                FixKind::None => {
                    writeln!(content, "- This rule doesn't have a fix.")?;
                }
            }
        }
        RuleCategory::Action => {
            writeln!(
                content,
                "- Diagnostic Category: [`{category}/{}/{}`](/reference/diagnostics#diagnostic-category)",
                group, rule_name
            )?;
            if is_recommended {
                writeln!(content, "- This action is **recommended**.")?;
            }
        }
        RuleCategory::Syntax | RuleCategory::Transformation => {
            unimplemented!("Should be implemented")
        }
    }

    match meta.severity {
        Severity::Information => {
            writeln!(
                content,
                "- The default severity of this rule is [**information**](/reference/diagnostics#information)."
            )?;
        }
        Severity::Warning => {
            writeln!(
                content,
                "- The default severity of this rule is [**warning**](/reference/diagnostics#warning)."
            )?;
        }
        Severity::Error => {
            writeln!(
                content,
                "- The default severity of this rule is [**error**](/reference/diagnostics#error)."
            )?;
        }
        Severity::Hint | Severity::Fatal => panic!("Unsupported severity {}", meta.severity),
    }

    if !meta.domains.is_empty() {
        writeln!(content, "- This rule belongs to the following domains:")?;
        for domain in meta.domains {
            let domain = markup_to_string(&markup!({ domain }).to_owned());
            writeln!(content, "  - [`{domain}`](/linter/domains#{domain})")?;
        }
    }

    if !meta.sources.is_empty() {
        writeln!(content, "- Sources: ")?;

        for source in meta.sources {
            let rule_name = source.to_namespaced_rule_name();
            let source_rule_url = source.to_rule_url();
            match meta.source_kind.as_ref().copied().unwrap_or_default() {
                RuleSourceKind::Inspired => {
                    write!(content, "{:2}- Inspired from ", " ")?;
                }
                RuleSourceKind::SameLogic => {
                    write!(content, "{:2}- Same as ", " ")?;
                }
            };
            writeln!(content, "[`{rule_name}`]({source_rule_url})")?;
        }
        writeln!(content)?;
    }

    if group == "nursery" {
        writeln!(content, ":::caution")?;
        writeln!(
            content,
            "This rule is part of the [nursery](/{path_prefix}/{middle_path}/#nursery) group."
        )?;
        writeln!(content, ":::")?;
    }

    if rule_category == RuleCategory::Action {
        writeln!(content, "## How to enable in your editor")?;
        let action = if rule_name == "organizeImports" {
            "source.organizeImports.biome".to_string()
        } else {
            format!("source.action.{}.biome", rule_name)
        };
        writeln!(content, "<EditorAction action=\"{}\" />", action)?;
    }

    write_documentation(group, rule_name, meta.docs, &mut content)?;
    write_how_to_configure(group, rule_name, &mut content, &rule_category)?;

    if rule_category == RuleCategory::Lint {
        writeln!(content, "## Related links")?;
        writeln!(content)?;
        writeln!(
            content,
            "- [Disable a rule](/{path_prefix}/#disable-a-lint-rule)"
        )?;
        writeln!(
            content,
            "- [Configure the rule fix](/{path_prefix}#configure-the-rule-fix)"
        )?;
        writeln!(content, "- [Rule options](/{path_prefix}/#rule-options)")?;
    }

    Ok((
        content,
        to_language_tab(language).to_string(),
        to_language_icon(language).to_string(),
    ))
}

/// Creates a synthetic JSON AST for an object literal with a single member.
fn make_json_object_with_single_member<V: Into<AnyJsonValue>>(
    name: &str,
    value: V,
) -> JsonObjectValue {
    make::json_object_value(
        make::token(biome_json_syntax::JsonSyntaxKind::L_CURLY),
        make::json_member_list(
            [make::json_member(
                make::json_member_name(make::json_string_literal(name)),
                make::token(biome_json_syntax::JsonSyntaxKind::COLON),
                value.into(),
            )],
            [],
        ),
        make::token(biome_json_syntax::JsonSyntaxKind::R_CURLY),
    )
}

fn get_first_member<V: Into<AnyJsonValue>>(parent: V, expected_name: &str) -> Option<AnyJsonValue> {
    let parent_value: AnyJsonValue = parent.into();
    let member = parent_value
        .as_json_object_value()?
        .json_member_list()
        .into_iter()
        .next()?
        .ok()?;
    let member_name = member.name().ok()?.inner_string_text().ok()?.to_string();

    if member_name.as_str() == expected_name {
        member.value().ok()
    } else {
        None
    }
}

/// Parse the options fragment for a lint rule and return the parsed options.
fn parse_rule_options(
    group: &'static str,
    rule: &'static str,
    test: &CodeBlockTest,
    code: &str,
    content: &mut Vec<u8>,
) -> anyhow::Result<Option<Configuration>> {
    let file_path = format!("code-block.{}", test.tag);

    let mut write = HTML::new(content).with_mdx();

    let mut write_diagnostic = |_: &str, diag: biome_diagnostics::Error| {
        Formatter::new(&mut write).write_markup(markup! {
            {PrintDiagnostic::verbose(&diag)}
        })?;
        anyhow::Ok(Option::<Configuration>::None)
    };

    match test.document_file_source() {
        DocumentFileSource::Json(file_source) => {
            let parse = biome_json_parser::parse_json(code, JsonParserOptions::from(&file_source));

            if parse.has_errors() {
                for diag in parse.into_diagnostics() {
                    let error = diag.with_file_path(&file_path).with_file_source_code(code);
                    write_diagnostic(code, error)?;
                }
                // Parsing failed, but test.expect_diagnostic is true
                return Ok(None);
            }

            let parsed_root = parse.tree();
            let parsed_options = parsed_root.value()?;

            let (root, subtract_offset) = match test.options {
                OptionsParsingMode::NoOptions => {
                    unreachable!("parse_rule_options should only be called for options blocks")
                }
                OptionsParsingMode::RuleOptionsOnly => {
                    // By convention, the configuration blocks in the documentation
                    // only contain the settings for the lint rule itself, like so:
                    //
                    // ```json,options
                    // {
                    //     "options": {
                    //         ...
                    //     }
                    // }
                    // ```
                    //
                    // We therefore extend the JSON AST with some synthetic elements
                    // to make it match the structure expected by the configuration parse:
                    //
                    // {
                    //     "linter": {
                    //         "rules": {
                    //             "<group>": {
                    //                 "<rule>": {<options>}
                    //             }
                    //         }
                    //     }
                    // }
                    let synthetic_tree = make_json_object_with_single_member(
                        "linter",
                        make_json_object_with_single_member(
                            "rules",
                            make_json_object_with_single_member(
                                group,
                                make_json_object_with_single_member(rule, parsed_options),
                            ),
                        ),
                    );

                    // Create a new JsonRoot from the synthetic AST
                    let eof_token = parsed_root.eof_token()?;
                    let mut root_builder = make::json_root(synthetic_tree.into(), eof_token);
                    if let Some(bom_token) = parsed_root.bom_token() {
                        root_builder = root_builder.with_bom_token(bom_token);
                    }
                    let synthetic_root = root_builder.build();

                    // Adjust source code spans to account for the synthetic nodes
                    // so that errors are reported at the correct source code locations:
                    let original_offset =
                        parsed_root.value().ok().map(|v| AstNode::range(&v).start());
                    let wrapped_offset = synthetic_root
                        .value()
                        .ok()
                        .and_then(|v| get_first_member(v, "linter"))
                        .and_then(|v| get_first_member(v, "rules"))
                        .and_then(|v| get_first_member(v, group))
                        .and_then(|v| get_first_member(v, rule))
                        .map(|v| AstNode::range(&v).start());
                    let subtract_offset = wrapped_offset
                        .zip(original_offset)
                        .and_then(|(wrapped, original)| wrapped.checked_sub(original))
                        .unwrap_or_default();

                    (synthetic_root, subtract_offset)
                }
                OptionsParsingMode::FullConfiguration => {
                    // In some rare cases, we want to be able to display full JSON configuration
                    // instead, e.t. to be able to show off per-file overrides:
                    //
                    // ```json,full-options
                    // {
                    //     "linter": {
                    //         "rules": {
                    //             "<group>": {
                    //                 "<rule>": {<options>}
                    //             }
                    //         }
                    //     }
                    // }
                    // ```
                    (parsed_root, TextSize::from(0))
                }
            };

            // Deserialize the configuration from the partially-synthetic AST,
            // and report any errors encountered during deserialization.
            let deserialized = deserialize_from_json_ast::<Configuration>(&root, "");
            let (partial_configuration, deserialize_diagnostics) = deserialized.consume();

            if !deserialize_diagnostics.is_empty() {
                for diag in deserialize_diagnostics {
                    // Adjust source code spans to account for the synthetic nodes
                    // so that errors are reported at the correct source code locations:
                    let new_span = diag
                        .location()
                        .span
                        .and_then(|span| span.checked_sub(subtract_offset));

                    let error = diag
                        .with_file_path(&file_path)
                        .with_file_source_code(code)
                        .with_file_span(new_span);

                    write_diagnostic(code, error)?;
                }
                // Deserialization failed, but test.expect_diagnostic is true
                return Ok(None);
            }

            let Some(result) = partial_configuration else {
                bail!(
                    "Failed to deserialize configuration options for '{group}/{rule}' from the following code block due to unknown error.\n\n{code}"
                );
            };

            Ok(Some(result))
        }
        _ => {
            // Only JSON code blocks can contain configuration options
            bail!(
                "The following non-JSON code block for '{group}/{rule}' was marked as containing configuration options. Only JSON code blocks can used to provide configuration options.\n\n{code}"
            );
        }
    }
}

fn write_how_to_configure(
    group: &'static str,
    rule: &'static str,
    content: &mut Vec<u8>,
    category: &RuleCategory,
) -> Result<()> {
    writeln!(content, "## How to configure")?;
    let json = match category {
        RuleCategory::Lint => {
            format!(
                r#"{{
    "linter": {{ "rules": {{ "{group}": {{ "{rule}": "error" }} }} }}
}}"#
            )
        }
        RuleCategory::Action => {
            format!(
                r#"{{
    "assist": {{ "actions": {{ "{group}": {{ "{rule}": "on" }} }} }}
}}"#
            )
        }
        _ => unimplemented!(""),
    };

    let parsed = biome_json_parser::parse_json(&json, JsonParserOptions::default());
    let printed = format_node(
        JsonFormatOptions::default().with_line_width(LineWidth::try_from(1).unwrap()),
        &parsed.syntax(),
    )?
    .print()?;

    writeln!(content, "```json title=\"biome.json\"")?;
    writeln!(content, "{}", printed.as_code())?;
    writeln!(content, "```")?;

    Ok(())
}

/// Parse the documentation fragment for a lint rule (in markdown) and generates
/// the content for the corresponding documentation page
fn write_documentation(
    group: &'static str,
    rule: &'static str,
    docs: &'static str,
    content: &mut Vec<u8>,
) -> Result<()> {
    writeln!(content, "## Description")?;

    let parser = Parser::new(docs);

    // Track the last configuration options block that was encountered
    let mut last_options: Option<Configuration> = None;

    // Tracks the content of the current code block if it's using a
    // language supported for analysis
    let mut language = None;
    let mut list_order = None;
    let mut list_indentation = 0;

    // Tracks the type and metadata of the link
    let mut start_link_tag: Option<Tag> = None;

    for event in parser {
        match event {
            // CodeBlock-specific handling
            Event::Start(Tag::CodeBlock(CodeBlockKind::Fenced(meta))) => {
                // Track the content of code blocks to pass them through the analyzer
                let test = CodeBlockTest::from_str(meta.as_ref())?;

                // Erase the lintdoc-specific attributes in the output by
                // re-generating the language ID from the source type
                write!(content, "```{}", &test.tag)?;
                writeln!(content)?;

                language = Some((test, String::new()));
            }

            Event::End(TagEnd::CodeBlock) => {
                writeln!(content, "```")?;
                writeln!(content)?;

                if let Some((test, block)) = language.take() {
                    if test.expect_diagnostic {
                        write!(
                            content,
                            "<pre class=\"language-text\"><code class=\"language-text\">"
                        )?;
                    } else if test.expect_diff {
                        write!(
                            content,
                            "<pre class=\"language-diff\"><code class=\"language-diff\">"
                        )?;
                    }

                    let mut buffer = HTML::new(&mut *content).with_mdx();
                    if test.options != OptionsParsingMode::NoOptions {
                        last_options = parse_rule_options(group, rule, &test, &block, content)
                            .context("snapshot test failed")?;
                    } else if test.expect_diagnostic {
                        print_diagnostics_or_actions(
                            group,
                            rule,
                            &test,
                            &block,
                            &last_options,
                            &mut buffer,
                            ToPrintKind::Diagnostics,
                        )
                        .context("snapshot test failed")?;
                    } else if test.expect_diff {
                        print_diagnostics_or_actions(
                            group,
                            rule,
                            &test,
                            &block,
                            &last_options,
                            &mut buffer,
                            ToPrintKind::Actions,
                        )
                        .context("snapshot test failed")?;
                    }

                    if test.expect_diagnostic || test.expect_diff {
                        writeln!(content, "</code></pre>")?;
                        writeln!(content)?;
                    }
                }
            }

            Event::Text(text) => {
                let mut hide_line = false;

                if let Some((test, block)) = &mut language {
                    if let Some(inner_text) = text.strip_prefix("# ") {
                        // Lines prefixed with "# " are hidden from the public documentation
                        write!(block, "{inner_text}")?;
                        hide_line = true;
                        test.hidden_lines.push(test.line_count);
                    } else {
                        write!(block, "{text}")?;
                    }
                    test.line_count += 1;
                }

                if hide_line {
                    // Line should not be emitted into the output
                } else if matches!(text.as_ref(), "`" | "*" | "_") {
                    write!(content, "\\{text}")?;
                } else {
                    write!(content, "{text}")?;
                }
            }

            // Other markdown events are emitted as-is
            Event::Start(Tag::Heading { level, .. }) => {
                write!(content, "{} ", "#".repeat(level as usize))?;
            }
            Event::End(TagEnd::Heading { .. }) => {
                writeln!(content)?;
                writeln!(content)?;
            }

            Event::Start(Tag::Paragraph) => {}
            Event::End(TagEnd::Paragraph) => {
                writeln!(content)?;
                writeln!(content)?;
            }

            Event::Code(text) => {
                write!(content, "`{text}`")?;
            }
            Event::Start(ref link_tag @ Tag::Link { link_type, .. }) => {
                start_link_tag = Some(link_tag.clone());
                match link_type {
                    LinkType::Autolink => {
                        write!(content, "<")?;
                    }
                    LinkType::Inline | LinkType::Reference | LinkType::Shortcut => {
                        write!(content, "[")?;
                    }
                    _ => {
                        panic!("unimplemented link type")
                    }
                }
            }
            Event::End(TagEnd::Link) => {
                if let Some(Tag::Link {
                    link_type,
                    dest_url,
                    title,
                    ..
                }) = start_link_tag
                {
                    match link_type {
                        LinkType::Autolink => {
                            write!(content, ">")?;
                        }
                        LinkType::Inline | LinkType::Reference | LinkType::Shortcut => {
                            write!(content, "]({dest_url}")?;
                            if !title.is_empty() {
                                write!(content, " \"{title}\"")?;
                            }
                            write!(content, ")")?;
                        }
                        _ => {
                            panic!("unimplemented link type")
                        }
                    }
                    start_link_tag = None;
                } else {
                    panic!("missing start link tag");
                }
            }

            Event::SoftBreak => {
                writeln!(content)?;
            }

            Event::HardBreak => {
                writeln!(content, "<br />")?;
            }

            Event::Start(Tag::List(num)) => {
                list_indentation += 1;
                if let Some(num) = num {
                    list_order = Some(num);
                }
                if list_indentation > 1 {
                    writeln!(content)?;
                }
            }

            Event::End(TagEnd::List(_)) => {
                list_order = None;
                list_indentation -= 1;
                writeln!(content)?;
            }
            Event::Start(Tag::Item) => {
                write!(content, "{}", "  ".repeat(list_indentation - 1))?;
                if let Some(num) = list_order {
                    write!(content, "{num}. ")?;
                } else {
                    write!(content, "- ")?;
                }
            }

            Event::End(TagEnd::Item) => {
                list_order = list_order.map(|item| item + 1);
                writeln!(content)?;
            }

            Event::Start(Tag::Strong) => {
                write!(content, "**")?;
            }

            Event::End(TagEnd::Strong) => {
                write!(content, "**")?;
            }

            Event::Start(Tag::Emphasis) => {
                write!(content, "_")?;
            }

            Event::End(TagEnd::Emphasis) => {
                write!(content, "_")?;
            }

            Event::Start(Tag::Strikethrough) => {
                write!(content, "~")?;
            }

            Event::End(TagEnd::Strikethrough) => {
                write!(content, "~")?;
            }

            Event::Start(Tag::BlockQuote(_)) => {
                write!(content, ">")?;
            }

            Event::End(TagEnd::BlockQuote(_)) => {
                writeln!(content)?;
            }

            Event::InlineHtml(html) => {
                write!(content, "{}", html)?;
            }

            _ => {
                // TODO: Implement remaining events as required
                bail!("unimplemented event {event:?}")
            }
        }
    }

    Ok(())
}

struct CodeBlockTest {
    /// The language tag of this code block.
    tag: String,

    /// True if this is an invalid example that should trigger a diagnostic.
    expect_diagnostic: bool,

    /// Whether to expect a code diff
    expect_diff: bool,

    /// Whether to ignore this code block.
    ignore: bool,

    /// Whether this is a block of configuration options instead
    /// of a valid/invalid code example, and if yes, how that
    /// block of configuration options should be parsed:
    options: OptionsParsingMode,

    /// Whether to use the last code block that was marked with
    /// `options` as the configuration settings for this code block.
    use_options: bool,

    /// The number of lines in this code block.
    line_count: u32,

    // The indices of lines that should be hidden from the public documentation.
    hidden_lines: Vec<u32>,
}

#[derive(Clone, Copy, Debug, Default, Eq, PartialEq)]
enum OptionsParsingMode {
    /// This code block does not contain configuration options.
    #[default]
    NoOptions,

    /// This code block contains the options for a single rule only.
    RuleOptionsOnly,

    /// This code block contains JSON that adheres to the full `biome.json` schema.
    FullConfiguration,
}

impl CodeBlockTest {
    fn document_file_source(&self) -> DocumentFileSource {
        DocumentFileSource::from_extension(&self.tag)
    }
}

impl FromStr for CodeBlockTest {
    type Err = anyhow::Error;

    fn from_str(input: &str) -> Result<Self> {
        // This is based on the parsing logic for code block languages in `rustdoc`:
        // https://github.com/rust-lang/rust/blob/6ac8adad1f7d733b5b97d1df4e7f96e73a46db42/src/librustdoc/html/markdown.rs#L873
        let tokens = input
            .split([',', ' ', '\t'])
            .map(str::trim)
            .filter(|token| !token.is_empty());

        let mut test = CodeBlockTest {
            tag: String::new(),
            expect_diagnostic: false,
            expect_diff: false,
            ignore: false,
            options: OptionsParsingMode::NoOptions,
            use_options: false,
            line_count: 0,
            hidden_lines: vec![],
        };

        for token in tokens {
            match token {
                // Other attributes
                "expect_diagnostic" => test.expect_diagnostic = true,
                "expect_diff" => test.expect_diff = true,
                "ignore" => test.ignore = true,
                "options" => test.options = OptionsParsingMode::RuleOptionsOnly,
                "full_options" => test.options = OptionsParsingMode::FullConfiguration,
                "use_options" => test.use_options = true,
                // Regard as language tags, last one wins
                _ => test.tag = token.to_string(),
            }
        }

        Ok(test)
    }
}

fn create_analyzer_options<L>(
    settings: &Settings,
    file_path: &String,
    test: &CodeBlockTest,
) -> AnalyzerOptions
where
    L: ServiceLanguage,
{
    let path = BiomePath::new(file_path);
    let file_source = &test.document_file_source();
    let supression_reason = None;

    let language_settings = L::lookup_settings(&settings.languages);
    let environment = L::resolve_environment(Some(settings));

    L::resolve_analyzer_options(
        Some(settings),
        Some(&language_settings.linter),
        environment,
        &path,
        file_source,
        supression_reason,
    )
}

enum ToPrintKind {
    Diagnostics,
    Actions,
}

fn write_diagnostic(buffer: &mut HTML<&mut Vec<u8>>, diag: biome_diagnostics::Error) -> Result<()> {
    Formatter::new(buffer).write_markup(markup! {
        {PrintDiagnostic::verbose(&diag)}
    })?;
    Ok(())
}

#[derive(Debug)]
struct CodeAction(TextEdit);

impl Diagnostic for CodeAction {
    fn message(&self, fmt: &mut Formatter<'_>) -> io::Result<()> {
        fmt.write_markup(markup!("Source action diff:"))
    }

    fn severity(&self) -> Severity {
        Severity::Information
    }

    fn advices(&self, visitor: &mut dyn Visit) -> io::Result<()> {
        visitor.record_diff(&self.0)
    }
}

fn write_action<L: ServiceLanguage>(
    buffer: &mut HTML<&mut Vec<u8>>,
    source: &str,
    file_path: &str,
    action: AnalyzerAction<L>,
) -> Result<()> {
    let (_, text_edit) = action.mutation.as_text_range_and_edit().unwrap_or_default();
    let action = CodeAction(text_edit)
        .with_file_source_code(source)
        .with_file_path(file_path);
    Formatter::new(buffer).write_markup(markup! {
        {PrintDiagnostic::simple(&action)}
    })?;
    Ok(())
}

/// Parse and analyze the provided code block, and asserts that it emits
/// exactly zero or one diagnostic depending on the value of `expect_diagnostic`.
/// That diagnostic is then emitted as text into the `content` buffer
fn print_diagnostics_or_actions(
    group: &'static str,
    rule: &'static str,
    test: &CodeBlockTest,
    code: &str,
    config: &Option<Configuration>,
    buffer: &mut HTML<&mut Vec<u8>>,
    to_print_kind: ToPrintKind,
) -> Result<()> {
    let file_path = format!("code-block.{}", test.tag);

    if test.ignore {
        return Ok(());
    }
    let mut rule_has_code_action = false;

    // Create a synthetic workspace configuration
    let mut settings = Settings::default();
    // let key = settings.insert_project(PathBuf::new());
    // settings.register_current_project(key);

    // Load settings from the preceding `json,options` block if requested
    if test.use_options {
        let Some(partial_config) = config else {
            bail!(
                "Code blocks tagged with 'use_options' must be preceded by a valid 'json,options' code block."
            );
        };

        settings.merge_with_configuration(partial_config.clone(), None)?;
    }

    match test.document_file_source() {
        DocumentFileSource::Js(file_source) => {
            // Temporary support for astro, svelte and vue code blocks
            let (code, file_source) = match file_source.as_embedding_kind() {
                EmbeddingKind::Astro => (
                    biome_service::file_handlers::AstroFileHandler::input(code),
                    JsFileSource::ts(),
                ),
                EmbeddingKind::Svelte => (
                    biome_service::file_handlers::SvelteFileHandler::input(code),
                    biome_service::file_handlers::SvelteFileHandler::file_source(code),
                ),
                EmbeddingKind::Vue => (
                    biome_service::file_handlers::VueFileHandler::input(code),
                    biome_service::file_handlers::VueFileHandler::file_source(code),
                ),
                _ => (code, file_source),
            };

            let parse = biome_js_parser::parse(code, file_source, JsParserOptions::default());

            if parse.has_errors() {
                for diag in parse.into_diagnostics() {
                    let error = diag.with_file_path(&file_path).with_file_source_code(code);
                    write_diagnostic(buffer, error)?;
                }
            } else {
                let root = parse.tree();

                let rule_filter = RuleFilter::Rule(group, rule);
                let filter = AnalysisFilter {
                    enabled_rules: Some(slice::from_ref(&rule_filter)),
                    ..AnalysisFilter::default()
                };

                let options = create_analyzer_options::<JsLanguage>(&settings, &file_path, test)
                    .with_configuration(
                        AnalyzerConfiguration::default().with_jsx_runtime(JsxRuntime::default()),
                    );

                // TODO: JsAnalyzerServices doesn't have a builder API yet, so we can't just do `.with_file_source(file_source)`
                let analyzer_services =
                    (Default::default(), Default::default(), file_source).into();

                biome_js_analyze::analyze(
                    &root,
                    filter,
                    &options,
                    &[],
                    analyzer_services,
                    |signal| {
                        match to_print_kind {
                            ToPrintKind::Diagnostics => {
                                if let Some(mut diag) = signal.diagnostic() {
                                    for action in signal.actions() {
                                        if !action.is_suppression() {
                                            rule_has_code_action = true;
                                            diag = diag.add_code_suggestion(action.into());
                                        }
                                    }

                                    let error =
                                        diag.with_file_path(&file_path).with_file_source_code(code);
                                    let res = write_diagnostic(buffer, error);

                                    // Abort the analysis on error
                                    if let Err(err) = res {
                                        return ControlFlow::Break(err);
                                    }
                                }
                            }
                            ToPrintKind::Actions => {
                                for action in signal.actions() {
                                    if !action.is_suppression() {
                                        let res =
                                            write_action(buffer, code, file_path.as_str(), action);
                                        // Abort the analysis on error
                                        if let Err(err) = res {
                                            return ControlFlow::Break(err);
                                        }
                                    }
                                }
                            }
                        }

                        ControlFlow::Continue(())
                    },
                );
            }
        }
        DocumentFileSource::Json(file_source) => {
            let parse = biome_json_parser::parse_json(code, JsonParserOptions::from(&file_source));

            if parse.has_errors() {
                for diag in parse.into_diagnostics() {
                    let error = diag.with_file_path(&file_path).with_file_source_code(code);
                    write_diagnostic(buffer, error)?;
                }
            } else {
                let root = parse.tree();

                let rule_filter = RuleFilter::Rule(group, rule);
                let filter = AnalysisFilter {
                    enabled_rules: Some(slice::from_ref(&rule_filter)),
                    ..AnalysisFilter::default()
                };

                let options: AnalyzerOptions =
                    create_analyzer_options::<JsonLanguage>(&settings, &file_path, test);

                biome_json_analyze::analyze(&root, filter, &options, file_source, |signal| {
                    match to_print_kind {
                        ToPrintKind::Diagnostics => {
                            if let Some(mut diag) = signal.diagnostic() {
                                for action in signal.actions() {
                                    if !action.is_suppression() {
                                        rule_has_code_action = true;
                                        diag = diag.add_code_suggestion(action.into());
                                    }
                                }

                                let error =
                                    diag.with_file_path(&file_path).with_file_source_code(code);
                                let res: Result<()> = write_diagnostic(buffer, error);

                                // Abort the analysis on error
                                if let Err(err) = res {
                                    return ControlFlow::Break(err);
                                }
                            }
                        }
                        ToPrintKind::Actions => {
                            for action in signal.actions() {
                                if !action.is_suppression() {
                                    let res =
                                        write_action(buffer, code, file_path.as_str(), action);
                                    // Abort the analysis on error
                                    if let Err(err) = res {
                                        return ControlFlow::Break(err);
                                    }
                                }
                            }
                        }
                    }

                    ControlFlow::Continue(())
                });
            }
        }
        DocumentFileSource::Css(..) => {
            let parse = biome_css_parser::parse_css(code, CssParserOptions::default());

            if parse.has_errors() {
                for diag in parse.into_diagnostics() {
                    let error = diag.with_file_path(&file_path).with_file_source_code(code);
                    write_diagnostic(buffer, error)?;
                }
            } else {
                let root = parse.tree();

                let rule_filter = RuleFilter::Rule(group, rule);
                let filter = AnalysisFilter {
                    enabled_rules: Some(slice::from_ref(&rule_filter)),
                    ..AnalysisFilter::default()
                };

                let options = create_analyzer_options::<JsonLanguage>(&settings, &file_path, test);

                biome_css_analyze::analyze(&root, filter, &options, &[], |signal| {
                    match to_print_kind {
                        ToPrintKind::Diagnostics => {
                            if let Some(mut diag) = signal.diagnostic() {
                                for action in signal.actions() {
                                    if !action.is_suppression() {
                                        rule_has_code_action = true;
                                        diag = diag.add_code_suggestion(action.into());
                                    }
                                }

                                let error =
                                    diag.with_file_path(&file_path).with_file_source_code(code);
                                let res = write_diagnostic(buffer, error);

                                // Abort the analysis on error
                                if let Err(err) = res {
                                    return ControlFlow::Break(err);
                                }
                            }
                        }
                        ToPrintKind::Actions => {
                            for action in signal.actions() {
                                if !action.is_suppression() {
                                    let res =
                                        write_action(buffer, code, file_path.as_str(), action);
                                    // Abort the analysis on error
                                    if let Err(err) = res {
                                        return ControlFlow::Break(err);
                                    }
                                }
                            }
                        }
                    }

                    ControlFlow::Continue(())
                });
            }
        }

        DocumentFileSource::Graphql(_) => {
            let parse = biome_graphql_parser::parse_graphql(code);

            if parse.has_errors() {
                for diag in parse.into_diagnostics() {
                    let error = diag.with_file_path(&file_path).with_file_source_code(code);
                    write_diagnostic(buffer, error)?;
                }
            } else {
                let root = parse.tree();

                let rule_filter = RuleFilter::Rule(group, rule);
                let filter = AnalysisFilter {
                    enabled_rules: Some(slice::from_ref(&rule_filter)),
                    ..AnalysisFilter::default()
                };

                let options = AnalyzerOptions::default().with_file_path(&file_path);
                biome_graphql_analyze::analyze(&root, filter, &options, |signal| {
                    match to_print_kind {
                        ToPrintKind::Diagnostics => {
                            if let Some(mut diag) = signal.diagnostic() {
                                for action in signal.actions() {
                                    if !action.is_suppression() {
                                        rule_has_code_action = true;
                                        diag = diag.add_code_suggestion(action.into());
                                    }
                                }

                                let error =
                                    diag.with_file_path(&file_path).with_file_source_code(code);
                                let res = write_diagnostic(buffer, error);

                                // Abort the analysis on error
                                if let Err(err) = res {
                                    return ControlFlow::Break(err);
                                }
                            }
                        }
                        ToPrintKind::Actions => {
                            for action in signal.actions() {
                                if !action.is_suppression() {
                                    let res =
                                        write_action(buffer, code, file_path.as_str(), action);
                                    // Abort the analysis on error
                                    if let Err(err) = res {
                                        return ControlFlow::Break(err);
                                    }
                                }
                            }
                        }
                    }

                    ControlFlow::Continue(())
                });
            }
        }
        DocumentFileSource::Html(_) | DocumentFileSource::Grit(_) => todo!(),
        // Unknown code blocks should be ignored by tests
        DocumentFileSource::Unknown => {}
        _ => {}
    }

    Ok(())
}

pub fn write_markup_to_string(buffer: &mut dyn io::Write, markup: Markup) -> io::Result<()> {
    let mut write = HTML::new(buffer).with_mdx();
    let mut fmt = Formatter::new(&mut write);
    fmt.write_markup(markup)
}

fn markup_to_string(markup: &MarkupBuf) -> String {
    let mut buffer = Vec::new();
    let mut write = Termcolor(NoColor::new(&mut buffer));
    let mut fmt = Formatter::new(&mut write);
    fmt.write_markup(markup! { {markup} })
        .expect("to have written in the buffer");

    String::from_utf8(buffer).expect("to have convert a buffer into a String")
}

fn to_language_tab(language: &str) -> &str {
    match language {
        "js" => "JavaScript (and super languages)",
        "jsx" => "JSX and TSX",
        "ts" => "TypeScript and TSX",
        "json" => "JSON (and super languages)",
        "css" => "CSS",
        "graphql" => "GraphQL",
        _ => {
            panic!("Language {language} isn't supported.")
        }
    }
}

fn to_language_icon(language: &str) -> &str {
    match language {
        "js" => "seti:javascript",
        "jsx" => "seti:javascript",
        "ts" => "seti:typescript",
        "json" => "seti:json",
        "css" => "seti:css",
        "graphql" => "seti:graphql",
        _ => {
            panic!("Language {language} isn't supported.")
        }
    }
}

fn events_to_text(events: Vec<Event>) -> String {
    let mut buffer = String::new();

    for event in events {
        match event {
            Event::Text(text) => buffer.push_str(&text),
            Event::Code(text) => buffer.push_str(format!("`{text}`").as_str()),
            _ => {}
        }
    }

    buffer
}

fn extract_summary_from_rule(content: &str) -> String {
    let mut lines = content.lines();
    let parser = Parser::new(lines.next().unwrap());
    let events: Vec<_> = parser.collect();

    events_to_text(events)
}
