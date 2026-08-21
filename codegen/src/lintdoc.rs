use crate::domains::{DocDomains, generate_domains};
use crate::project_root;
use crate::rules_sources::generate_rule_sources;
use crate::shared::{
    CodegenEditUrl, add_codegen_disclaimer_frontmatter, add_codegen_rule_suggestion,
};
use anyhow::Context;
use anyhow::{Result, bail};
use biome_analyze::{
    FixKind, GroupCategory, Queryable, RegistryVisitor, Rule, RuleCategory, RuleDomain, RuleGroup,
    RuleMetadata, RuleSourceKind,
};
use biome_configuration::Configuration;
use biome_console::fmt::Termcolor;
use biome_console::{
    Markup, MarkupBuf,
    fmt::{Formatter, HTML},
    markup,
};
use biome_css_syntax::CssLanguage;
use biome_diagnostics::Severity;
use biome_diagnostics::termcolor::NoColor;
use biome_formatter::{Expand, LineWidth};
use biome_graphql_syntax::GraphqlLanguage;
use biome_html_syntax::HtmlLanguage;
use biome_js_syntax::JsLanguage;
use biome_json_factory::make;
use biome_json_formatter::context::JsonFormatOptions;
use biome_json_formatter::format_node;
use biome_json_parser::JsonParserOptions;
use biome_json_syntax::{
    AnyJsonMemberName, AnyJsonValue, JsonLanguage, JsonMember, JsonObjectValue,
};
use biome_languages::DocumentFileSource;
use biome_markdown_syntax::MarkdownLanguage;
use biome_rowan::{AstNode, AstSeparatedList};
use biome_ruledoc_utils::{
    AnalyzerServicesBuilder, CodeBlock, DiagnosticConsoleWriter, DiagnosticHtmlWriter,
    DiagnosticHtmlWriterMode, DiagnosticWriter, OptionsParsingMode, RuleCodeAnalyzer,
    parse_rule_options,
};
use biome_string_case::Case;
use pulldown_cmark::{CodeBlockKind, Event, HeadingLevel, LinkType, Parser, Tag, TagEnd};
use std::collections::{HashMap, HashSet};
use std::error::Error;
use std::hash::RandomState;
use std::path::PathBuf;
use std::{
    collections::BTreeMap,
    fmt::Write as _,
    fs,
    io::{self, Write as _},
    path::Path,
    str::{self, FromStr},
};

const LINTDOC_EDIT_URL: &str =
    "https://github.com/biomejs/website/edit/main/codegen/src/lintdoc.rs";

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
    Html,
    Markdown,
}

impl SupportedLanguages {
    fn to_visitor(&self) -> RulesVisitor {
        let mut visitor = RulesVisitor::default();
        match self {
            SupportedLanguages::Js => biome_js_analyze::visit_registry(&mut visitor),
            SupportedLanguages::Css => biome_css_analyze::visit_registry(&mut visitor),
            SupportedLanguages::Graphql => biome_graphql_analyze::visit_registry(&mut visitor),
            SupportedLanguages::Json => biome_json_analyze::visit_registry(&mut visitor),
            SupportedLanguages::Html => biome_html_analyze::visit_registry(&mut visitor),
            SupportedLanguages::Markdown => biome_markdown_analyze::visit_registry(&mut visitor),
        };
        visitor
    }

    fn as_language_path(&self, root: &Path) -> PathBuf {
        match self {
            SupportedLanguages::Js => root.join("javascript"),
            SupportedLanguages::Css => root.join("css"),
            SupportedLanguages::Graphql => root.join("graphql"),
            SupportedLanguages::Json => root.join("json"),
            SupportedLanguages::Html => root.join("html"),
            SupportedLanguages::Markdown => root.join("markdown"),
        }
    }

    const fn as_prefix(&self) -> &str {
        match self {
            SupportedLanguages::Js => "JavaScript",
            SupportedLanguages::Css => "CSS",
            SupportedLanguages::Graphql => "GraphQL",
            SupportedLanguages::Json => "JSON",
            SupportedLanguages::Html => "HTML",
            SupportedLanguages::Markdown => "Markdown",
        }
    }

    const fn as_website_language(&self) -> &'static str {
        match self {
            SupportedLanguages::Js => "javascript",
            SupportedLanguages::Css => "css",
            SupportedLanguages::Graphql => "graphql",
            SupportedLanguages::Json => "json",
            SupportedLanguages::Html => "html",
            SupportedLanguages::Markdown => "markdown",
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
            self.lints
                .domains_to_document
                .add_rule(<R::Group as RuleGroup>::NAME, R::METADATA);
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

impl RegistryVisitor<HtmlLanguage> for RulesVisitor {
    fn record_category<C: GroupCategory<Language = HtmlLanguage>>(&mut self) {
        if matches!(C::CATEGORY, RuleCategory::Lint | RuleCategory::Action) {
            C::record_groups(self);
        }
    }

    fn record_rule<R>(&mut self)
    where
        R: Rule<Query: Queryable<Language = HtmlLanguage, Output: Clone>> + 'static,
    {
        self.push_rule::<R, <R::Query as Queryable>::Language>()
    }
}

impl RegistryVisitor<MarkdownLanguage> for RulesVisitor {
    fn record_category<C: GroupCategory<Language = MarkdownLanguage>>(&mut self) {
        if matches!(C::CATEGORY, RuleCategory::Lint | RuleCategory::Action) {
            C::record_groups(self);
        }
    }

    fn record_rule<R>(&mut self)
    where
        R: Rule<Query: Queryable<Language = MarkdownLanguage, Output: Clone>> + 'static,
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
    generate_language_rule_docs(&linter_root, &actions_root, SupportedLanguages::Html)?;
    generate_language_rule_docs(&linter_root, &actions_root, SupportedLanguages::Markdown)?;

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
    biome_html_analyze::visit_registry(&mut visitor);
    biome_markdown_analyze::visit_registry(&mut visitor);

    let RulesVisitor { actions, lints } = visitor;
    let number_of_rules = lints.number_of_rules.len();
    let number_of_actions = actions.number_of_rules.len();
    let number_of_rules_buffer = format!(
        "<!-- this file is auto generated, use `pnpm codegen:rules` to update it -->\n{number_of_rules}\n"
    );
    let number_of_actions_buffer = format!(
        "<!-- this file is auto generated, use `pnpm codegen:rules` to update it -->\n{number_of_actions}\n"
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

    if linter_root.exists()
        && let Err(err) = fs::remove_dir_all(&linter_root)
    {
        let is_not_found = err
            .source()
            .and_then(|err| err.downcast_ref::<io::Error>())
            .is_some_and(|err| matches!(err.kind(), io::ErrorKind::NotFound));

        if !is_not_found {
            return Err(err.into());
        }
    }
    fs::create_dir_all(&linter_root)?;

    if actions_root.exists()
        && let Err(err) = fs::remove_dir_all(&actions_root)
    {
        let is_not_found = err
            .source()
            .and_then(|err| err.downcast_ref::<io::Error>())
            .is_some_and(|err| matches!(err.kind(), io::ErrorKind::NotFound));

        if !is_not_found {
            return Err(err.into());
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
    biome_html_analyze::visit_registry(&mut visitor);
    biome_markdown_analyze::visit_registry(&mut visitor);

    let RulesVisitor { actions, lints } = visitor;

    let linter_root = project_root().join("src/content/docs/linter/rules");
    let actions_root = project_root().join("src/content/docs/assist/actions");

    if linter_root.exists()
        && let Err(err) = fs::remove_dir_all(&linter_root)
    {
        let is_not_found = err
            .source()
            .and_then(|err| err.downcast_ref::<io::Error>())
            .is_some_and(|err| matches!(err.kind(), io::ErrorKind::NotFound));

        if !is_not_found {
            return Err(err.into());
        }
    }
    fs::create_dir_all(&linter_root)?;

    if actions_root.exists()
        && let Err(err) = fs::remove_dir_all(&actions_root)
    {
        let is_not_found = err
            .source()
            .and_then(|err| err.downcast_ref::<io::Error>())
            .is_some_and(|err| matches!(err.kind(), io::ErrorKind::NotFound));

        if !is_not_found {
            return Err(err.into());
        }
    }
    fs::create_dir_all(&actions_root)?;

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
    let website_language = language_prefix.as_website_language();
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
    add_codegen_disclaimer_frontmatter(&mut index, CodegenEditUrl::Url(LINTDOC_EDIT_URL))?;
    writeln!(index, "title: {language_prefix} {title}")?;
    writeln!(index, "description: {description} for {language_prefix}")?;
    writeln!(index, "localized: false")?;
    writeln!(index, "---")?;
    writeln!(index)?;

    write!(
        index,
        r#"
import {{ Icon }} from "@astrojs/starlight/components";

Below the list of rules supported by Biome, divided by group. Here's a legend of the emojis:
- The icon <span class='inline-icon' title="This rule is recommended"><Icon name="approve-check-circle" label="This rule is recommended" /></span> indicates that the rule is part of the recommended rules.
- The icon <span class='inline-icon' title="This rule has a safe fix"><Icon name="seti:config" label="The rule has a safe fix" /></span> indicates that the rule provides a code action (fix) that is **safe** to apply.
- The icon <span class='inline-icon' title="This rule has an unsafe fix"><Icon name="warning" label="The rule has an unsafe fix" /></span> indicates that the rule provides a code action (fix) that is **unsafe** to apply.
- The icon <span class='inline-icon' title="This rule is not released yet"><Icon name="moon" label="This rule is not released yet" /></span> indicates that the rule has been implemented and scheduled for the next release.
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
            website_language,
        )?;
    }

    let recommended_rules_buffer = match rule_category {
        RuleCategory::Lint => format!("## Recommended rules \n{recommended_rules}"),
        RuleCategory::Action => format!("## Recommended actions \n{recommended_rules}"),
        _ => unimplemented!(""),
    };

    write!(index, "{recommended_rules_buffer}")?;

    add_codegen_rule_suggestion(&mut index)?;

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
    website_language: &str,
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
            let is_recommended = !is_nursery && meta.recommended;
            let dashed_rule = Case::Kebab.convert(rule_name);
            let rule_href =
                rule_page_href(path_prefix, middle_path, &dashed_rule, website_language);
            let severity = match meta.severity {
                Severity::Information => {
                    "Severity: [information](/reference/diagnostics#information)".to_string()
                }
                Severity::Warning => {
                    "Severity: [warning](/reference/diagnostics#warning)".to_string()
                }
                Severity::Error => "Severity: [error](/reference/diagnostics#error)".to_string(),
                Severity::Hint | Severity::Fatal => {
                    unreachable!("A rule doesn't have this severity.")
                }
            };
            if is_recommended {
                recommended_rules.push_str(&format!("- [{rule_name}]({rule_href}) ({severity})\n"));
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
                properties.push_str("<span class='inline-icon' title=\"This rule is not released yet\"><Icon name=\"moon\" label=\"This rule is not released yet\" size=\"1.2rem\" /></span>");
            }

            let summary_html = extract_summary_from_rule(meta.docs);
            write!(
                content,
                "| [{rule_name}]({rule_href}) | {summary_html} | {properties} |"
            )?;

            writeln!(content)?;
        }
    }

    Ok(())
}

fn rule_page_href(
    path_prefix: &str,
    middle_path: &str,
    dashed_rule: &str,
    website_language: &str,
) -> String {
    format!("/{path_prefix}/{middle_path}/{dashed_rule}/{website_language}")
}

struct GenRule<'a> {
    content_root: &'a Path,
    group: &'static str,
    rule_name: &'static str,
    is_nursery: bool,
    rule_to_document: &'a RuleToDocument,
}

#[derive(Debug)]
struct GeneratedRuleVariant {
    website_language: &'static str,
    selector_label: &'static str,
    title_label: &'static str,
    content: Vec<u8>,
}

/// Generates the documentation page for a single lint rule
fn generate_rule(payload: GenRule, path_prefix: &str, rule_category: RuleCategory) -> Result<()> {
    let mut errors = Vec::new();

    let mut variants: Vec<_> = payload
        .rule_to_document
        .language_to_metadata
        .iter()
        .filter_map(|(language, meta)| {
            let result = generate_rule_content(RuleContent {
                group: payload.group,
                rule_name: payload.rule_name,
                is_nursery: payload.is_nursery,
                meta,
                path_prefix,
                rule_category,
            });

            match result {
                Ok(content) => Some(GeneratedRuleVariant {
                    website_language: to_website_language(language),
                    selector_label: to_language_selector_label(language),
                    title_label: to_language_title(language),
                    content,
                }),
                Err(err) => {
                    errors.push(err);
                    None
                }
            }
        })
        .collect();

    if !errors.is_empty() {
        bail!(
            "Errors generate while generating rule content for {}: \n{:?}",
            payload.rule_name,
            errors
        );
    }

    variants.sort_by(|left, right| left.selector_label.cmp(right.selector_label));

    for variants in variants.windows(2) {
        if variants[0].website_language == variants[1].website_language {
            bail!(
                "Rule {} has multiple implementations for the same website language {}",
                payload.rule_name,
                variants[0].website_language
            );
        }
    }

    write_language_rule_pages(&payload, &variants, path_prefix, rule_category)
}

fn write_language_rule_pages(
    payload: &GenRule,
    variants: &[GeneratedRuleVariant],
    path_prefix: &str,
    rule_category: RuleCategory,
) -> Result<()> {
    let rule_name_case = Case::Kebab.convert(payload.rule_name);
    let middle_path = match rule_category {
        RuleCategory::Lint => "rules",
        RuleCategory::Action => "actions",
        RuleCategory::Syntax | RuleCategory::Transformation => {
            unimplemented!("Rule pages are only generated for lint rules and assist actions")
        }
    };
    let base_url = format!("/{path_prefix}/{middle_path}/{rule_name_case}");

    let language_options = language_options_to_mdx(variants.iter().map(|variant| {
        (
            variant.website_language,
            variant.selector_label,
            format!("{base_url}/{}/", variant.website_language),
        )
    }));

    fs::create_dir_all(payload.content_root.join(&rule_name_case))?;

    for variant in variants {
        let mut content = Vec::new();

        writeln!(content, "---")?;
        add_codegen_disclaimer_frontmatter(&mut content, CodegenEditUrl::Disabled)?;
        writeln!(
            content,
            "title: {} ({})",
            payload.rule_name, variant.title_label
        )?;
        writeln!(
            content,
            "description: {} documentation for {}",
            variant.selector_label, payload.rule_name
        )?;
        writeln!(content, "localized: false")?;
        writeln!(content, "---")?;
        writeln!(
            content,
            r#"import RuleLanguageLinks from "@/components/RuleLanguageLinks.astro";"#
        )?;
        if rule_category == RuleCategory::Action {
            writeln!(
                content,
                "import EditorAction from \"@/components/EditorAction.astro\";"
            )?;
        }

        writeln!(content)?;
        writeln!(
            content,
            "<RuleLanguageLinks current=\"{}\" languages={{{language_options}}} />",
            variant.website_language
        )?;
        writeln!(content)?;
        writeln!(
            content,
            "{}",
            rule_content_with_language_url(
                &variant.content,
                path_prefix,
                middle_path,
                &rule_name_case,
                variant.website_language,
            )
        )?;

        let output_path = payload
            .content_root
            .join(&rule_name_case)
            .join(format!("{}.mdx", variant.website_language));
        fs::write(output_path, content)?;
    }

    Ok(())
}

fn rule_content_with_language_url(
    content: &[u8],
    path_prefix: &str,
    middle_path: &str,
    rule_name: &str,
    language: &str,
) -> String {
    let content =
        String::from_utf8(content.to_vec()).expect("Generated rule content should be UTF-8");
    let root_url = format!("https://biomejs.dev/{path_prefix}/{middle_path}/{rule_name}");
    content.replace(
        &format!("href=\"{root_url}\""),
        &format!("href=\"{root_url}/{language}\""),
    )
}

fn language_options_to_mdx<'a>(
    options: impl IntoIterator<Item = (&'a str, &'a str, String)>,
) -> String {
    let mut mdx = String::from("[");

    for (index, (id, label, href)) in options.into_iter().enumerate() {
        if index > 0 {
            mdx.push(',');
        }
        write!(mdx, r#"{{"id":"{id}","label":"{label}","href":"{href}"}}"#)
            .expect("Writing to a String should not fail");
    }

    mdx.push(']');
    mdx
}

#[derive(Debug)]
struct RuleContent<'a> {
    group: &'static str,
    rule_name: &'static str,
    is_nursery: bool,
    meta: &'a RuleMetadata,
    path_prefix: &'a str,
    rule_category: RuleCategory,
}

#[allow(clippy::too_many_arguments)]
fn generate_rule_content(rule_content: RuleContent) -> Result<Vec<u8>> {
    let RuleContent {
        group,
        rule_name,
        is_nursery,
        meta,
        path_prefix,
        rule_category,
    } = rule_content;
    let is_recommended = !is_nursery && meta.recommended;
    let is_not_recommended = !is_nursery && !meta.recommended;
    let mut content = Vec::new();

    if let Some(reason) = &meta.deprecated {
        writeln!(content, ":::caution[Deprecated]")?;
        writeln!(
            content,
            "This rule is deprecated and will be removed in the next major release.\n**Reason**: {reason}"
        )?;
        writeln!(content, ":::")?;
    }

    if meta.version == "next" {
        writeln!(content, ":::note")?;
        writeln!(
            content,
            "This rule has been implemented but not released yet. It will be available in the next release."
        )?;
        writeln!(content, ":::")?;
    }

    if group == "nursery" {
        writeln!(content, ":::caution")?;
        writeln!(
            content,
            "This rule is part of the [nursery](/{path_prefix}/#nursery) group. This means that it is experimental and the behavior can change at any time."
        )?;
        writeln!(content, ":::")?;
    }

    let is_project_domain = meta.domains.iter().find(|d| **d == RuleDomain::Project);
    let is_types_domain = meta.domains.iter().find(|d| **d == RuleDomain::Types);

    if is_types_domain.is_some() {
        writeln!(content, ":::note")?;
        writeln!(
            content,
            "This rule belongs to the types domain. This means that its activation will activate the Biome Scanner to scan the files of your project, and enable the type inference engine. Read more about it in the [documentation page](/linter/domains#types)"
        )?;
        writeln!(content, ":::")?;
    } else if is_project_domain.is_some() {
        writeln!(content, ":::note")?;
        writeln!(
            content,
            "This rule belongs to the project domain. This means that its activation will activate the Biome Scanner to scan the files of your project. Read more about it in the [documentation page](/linter/domains#project)"
        )?;
        writeln!(content, ":::")?;
    }

    writeln!(content, "## Summary")?;

    if meta.version != "next" {
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
                "- Diagnostic Category: [`{category}/{group}/{rule_name}`](/reference/diagnostics#diagnostic-category)",
            )?;
            if is_recommended {
                writeln!(
                    content,
                    "- This rule is **recommended**, meaning it is enabled by default."
                )?;
            } else if is_not_recommended {
                writeln!(
                    content,
                    "- This rule isn't recommended, so you need to enable it."
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
                "- Diagnostic Category: [`{category}/{group}/{rule_name}`](/reference/diagnostics#diagnostic-category)",
            )?;
            if is_recommended {
                writeln!(content, "- This action is **recommended**.")?;
            }
        }
        RuleCategory::Syntax | RuleCategory::Transformation => {
            unimplemented!("Should be implemented")
        }
    }

    if rule_category == RuleCategory::Lint {
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

        for source_with_kind in meta.sources {
            let rule_name = source_with_kind.source.to_namespaced_rule_name();
            let source_rule_url = source_with_kind.source.to_rule_url();
            match source_with_kind.kind {
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

    if rule_category == RuleCategory::Action {
        writeln!(content, "## How to enable in your editor")?;
        let action = if rule_name == "organizeImports" {
            "source.organizeImports.biome".to_string()
        } else {
            format!("source.action.{rule_name}.biome",)
        };
        writeln!(
            content,
            "<EditorAction includeFixAll action=\"{action}\" />",
        )?;
    }

    write_how_to_configure(group, rule_name, &mut content, &rule_category)?;
    write_documentation(group, meta, meta.docs, &mut content, rule_category)?;
    let crate_link = rule_crate_name(meta.language);
    let source_code_url = rule_source_code_url(meta.language, group, rule_name, rule_category);
    let test_cases_file_path = format!("{crate_link}/tests/specs/{group}/{rule_name}");
    if matches!(rule_category, RuleCategory::Lint | RuleCategory::Action) {
        writeln!(content, "## Related links")?;
        writeln!(content)?;
        writeln!(
            content,
            "- [Disable a rule](/{path_prefix}/#disable-a-rule)"
        )?;
        writeln!(
            content,
            "- [Configure the code fix](/{path_prefix}#configure-the-code-fix)"
        )?;
        writeln!(content, "- [Rule options](/{path_prefix}/#rule-options)")?;
        writeln!(
            content,
            "- [Source Code (Edit this Page)]({source_code_url})"
        )?;
        writeln!(
            content,
            "- [Test Cases](https://github.com/biomejs/biome/blob/main/crates/{test_cases_file_path})"
        )?;
    }

    Ok(content)
}

fn rule_source_code_url(
    language: &str,
    group: &str,
    rule_name: &str,
    rule_category: RuleCategory,
) -> String {
    let crate_link = rule_crate_name(language);
    let source_code_link = match rule_category {
        RuleCategory::Lint => "lint",
        RuleCategory::Action => "assist",
        RuleCategory::Syntax | RuleCategory::Transformation => {
            unimplemented!("Should be implemented")
        }
    };
    let file_name = format!("{}.rs", Case::Snake.convert(rule_name));
    format!(
        "https://github.com/biomejs/biome/blob/main/crates/{crate_link}/src/{source_code_link}/{group}/{file_name}"
    )
}

fn rule_crate_name(language: &str) -> &str {
    match language {
        "js" | "jsx" | "ts" | "tsx" => "biome_js_analyze",
        "css" => "biome_css_analyze",
        "html" => "biome_html_analyze",
        "json" | "jsonc" => "biome_json_analyze",
        "graphql" => "biome_graphql_analyze",
        "md" => "biome_markdown_analyze",
        _ => unimplemented!("Language not implemented {language}"),
    }
}

/// Creates a synthetic JSON AST for an object literal with a single member.
fn make_json_object_with_single_member<V: Into<AnyJsonValue>>(
    name: &str,
    value: V,
) -> JsonObjectValue {
    make::json_object_value(
        make::token(biome_json_syntax::JsonSyntaxKind::L_CURLY),
        make::json_member_list([make_json_member(name, value)], []),
        make::token(biome_json_syntax::JsonSyntaxKind::R_CURLY),
    )
}

fn make_json_member<V: Into<AnyJsonValue>>(name: &str, value: V) -> JsonMember {
    make::json_member(
        AnyJsonMemberName::JsonMemberName(make::json_member_name(make::json_string_literal(name))),
        make::token(biome_json_syntax::JsonSyntaxKind::COLON),
        value.into(),
    )
}

fn format_rule_options(
    group: &'static str,
    rule: &RuleMetadata,
    category: RuleCategory,
    test: &CodeBlock,
    code: &str,
) -> anyhow::Result<String> {
    let DocumentFileSource::Json(file_source) = test.document_file_source() else {
        bail!(
            "The following non-JSON code block for '{group}/{}' was marked as containing configuration options. Only JSON code blocks can used to provide configuration options.\n\n{code}",
            rule.name
        );
    };

    let parse = biome_json_parser::parse_json(code, JsonParserOptions::from(&file_source));
    if parse.has_errors() {
        return Ok(String::new());
    }

    let parsed_root = parse.tree();
    let parsed_options = parsed_root.value()?;

    let root = match test.options {
        OptionsParsingMode::NoOptions => {
            unreachable!("format_rule_options should only be called for options blocks")
        }
        OptionsParsingMode::RuleOptionsOnly => {
            let lint_or_assist = if category == RuleCategory::Lint {
                "linter"
            } else {
                "assist"
            };
            let rules_or_actions = if category == RuleCategory::Lint {
                "rules"
            } else {
                "actions"
            };
            let parsed_options = make::json_object_value(
                make::token(biome_json_syntax::JsonSyntaxKind::L_CURLY),
                make::json_member_list(
                    [
                        make_json_member(
                            "level",
                            make::json_string_value(make::json_string_literal("on")),
                        ),
                        parsed_options
                            .as_json_object_value()
                            .unwrap()
                            .json_member_list()
                            .first()
                            .unwrap()
                            .unwrap(),
                    ],
                    [make::token(biome_json_syntax::JsonSyntaxKind::COMMA)],
                ),
                make::token(biome_json_syntax::JsonSyntaxKind::R_CURLY),
            );
            let synthetic_tree = make_json_object_with_single_member(
                lint_or_assist,
                make_json_object_with_single_member(
                    rules_or_actions,
                    make_json_object_with_single_member(
                        group,
                        make_json_object_with_single_member(rule.name, parsed_options),
                    ),
                ),
            );

            let eof_token = parsed_root.eof_token()?;
            let mut root_builder = make::json_root(synthetic_tree.into(), eof_token);
            if let Some(bom_token) = parsed_root.bom_token() {
                root_builder = root_builder.with_bom_token(bom_token);
            }
            root_builder.build()
        }
        OptionsParsingMode::FullConfiguration => parsed_root,
    };

    Ok(format_node(
        JsonFormatOptions::default().with_expand(Expand::Always),
        root.syntax(),
    )?
    .print()?
    .as_code()
    .to_string())
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
    rule: &RuleMetadata,
    docs: &'static str,
    content: &mut Vec<u8>,
    category: RuleCategory,
) -> Result<()> {
    writeln!(content, "## Description")?;

    let parser = Parser::new(docs);
    let enable_type_inference = rule.domains.contains(&RuleDomain::Types);
    let mut default_service_builder = AnalyzerServicesBuilder::from_files::<RandomState>(
        Default::default(),
        enable_type_inference,
    );

    let mut service_builders = HashMap::new(); // indexed by section number
    let mut section = 0;

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
                let test = CodeBlock::from_str(meta.as_ref())?;

                // Erase the lintdoc-specific attributes in the output by
                // re-generating the language ID from the source type
                write!(content, "```{}", &test.tag)?;
                if test.options != OptionsParsingMode::NoOptions {
                    write!(content, " title='biome.json'")?;
                } else if let Some(file_path) = test.explicit_file_path() {
                    write!(content, " title='{}'", file_path.trim_start_matches('/'))?;

                    // Lazy parse the in-memory file system only when we encounter
                    // a file=<path> attribute to avoid unnecessary work for single-file tests
                    if service_builders.is_empty() {
                        service_builders = create_service_builders(docs, enable_type_inference)?;
                    }
                }

                writeln!(content)?;

                language = Some((test, String::new()));
            }

            Event::End(TagEnd::CodeBlock) => {
                if let Some((test, block)) = language.take() {
                    if test.options != OptionsParsingMode::NoOptions {
                        let mut diagnostics_writer = DiagnosticConsoleWriter::default();
                        let options = parse_rule_options(
                            group,
                            rule,
                            category,
                            &test,
                            &block,
                            &mut diagnostics_writer,
                        )
                        .context("Failed to parse the rule options")?;
                        let formatted = format_rule_options(group, rule, category, &test, &block)
                            .context("Failed to format the rule options")?;
                        last_options = options;
                        write!(content, "{formatted}")?;
                        writeln!(content)?;
                        writeln!(content, "```")?;
                        writeln!(content)?;
                    } else if test.expect_diagnostic {
                        writeln!(content, "```")?;
                        writeln!(content)?;
                        let mut diagnostic_html = Vec::new();
                        write!(
                            diagnostic_html,
                            "<pre class=\"language-text\"><code class=\"language-text\">"
                        )?;
                        let mut buffer = HTML::new(&mut diagnostic_html).with_mdx();
                        let mut diagnostics_writer = DiagnosticHtmlWriter::new(
                            &mut buffer,
                            DiagnosticHtmlWriterMode::Diagnostics,
                        );

                        print_diagnostics_or_actions(
                            group,
                            rule.name,
                            rule.language,
                            &test,
                            &block,
                            last_options.clone(),
                            service_builders
                                .get_mut(&section)
                                .unwrap_or(&mut default_service_builder),
                            &mut diagnostics_writer,
                        )
                        .context("To print diagnostics or actions")?;
                        write!(diagnostic_html, "</code></pre>")?;
                        writeln!(
                            content,
                            "<Fragment set:html={{{}}} />",
                            serde_json::to_string(&String::from_utf8(diagnostic_html)?)?
                        )?;
                    } else if test.expect_diff {
                        writeln!(content, "```")?;
                        writeln!(content)?;
                        let mut diagnostic_html = Vec::new();
                        write!(
                            diagnostic_html,
                            "<pre class=\"language-diff\"><code class=\"language-diff\">"
                        )?;
                        let mut buffer = HTML::new(&mut diagnostic_html).with_mdx();
                        let mut diagnostics_writer = DiagnosticHtmlWriter::new(
                            &mut buffer,
                            DiagnosticHtmlWriterMode::Actions,
                        );
                        print_diagnostics_or_actions(
                            group,
                            rule.name,
                            rule.language,
                            &test,
                            &block,
                            last_options.clone(),
                            service_builders
                                .get_mut(&section)
                                .unwrap_or(&mut default_service_builder),
                            &mut diagnostics_writer,
                        )
                        .context("To print diagnostics or actions")?;
                        write!(diagnostic_html, "</code></pre>")?;
                        writeln!(
                            content,
                            "<Fragment set:html={{{}}} />",
                            serde_json::to_string(&String::from_utf8(diagnostic_html)?)?
                        )?;
                    } else {
                        writeln!(content, "```")?;
                        writeln!(content)?;
                    }

                    if test.expect_diagnostic || test.expect_diff {
                        writeln!(content)?;
                    }
                } else {
                    writeln!(content, "```")?;
                    writeln!(content)?;
                }
            }

            Event::Text(text) => {
                let mut hide_line = false;

                if let Some((test, block)) = &mut language {
                    if test.options != OptionsParsingMode::NoOptions {
                        hide_line = true;
                    }
                    write!(block, "{text}")?;
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
                if is_main_heading(level) {
                    section += 1;
                }

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
                write!(content, "{html}")?;
            }

            Event::Start(Tag::HtmlBlock) => {}
            Event::Html(html) => {
                write!(content, "{html}")?;
            }
            Event::End(TagEnd::HtmlBlock) => {}

            _ => {
                // TODO: Implement remaining events as required
                bail!("unimplemented event {event:?}")
            }
        }
    }

    Ok(())
}

/// Parse and analyze the provided code block, and asserts that it emits
/// exactly zero or one diagnostic depending on the value of `expect_diagnostic`.
/// That diagnostic is then emitted as text into the `content` buffer
#[allow(clippy::too_many_arguments)]
fn print_diagnostics_or_actions(
    group: &'static str,
    rule: &'static str,
    rule_language: &'static str,
    code_block: &CodeBlock,
    code: &str,
    configuration: Option<Configuration>,
    services_builder: &mut AnalyzerServicesBuilder,
    diagnostics_writer: &mut dyn DiagnosticWriter,
) -> Result<()> {
    if code_block.ignore {
        return Ok(());
    }

    RuleCodeAnalyzer {
        group,
        rule,
        rule_language,
        code_block,
        code,
        configuration,
        services_builder,
        writer: diagnostics_writer,
    }
    .analyze()
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

pub(crate) fn to_website_language(language: &str) -> &'static str {
    match language {
        "js" | "jsx" | "ts" => "javascript",
        "json" => "json",
        "css" => "css",
        "graphql" => "graphql",
        "html" => "html",
        "md" => "markdown",
        _ => {
            panic!("Language {language} isn't supported.")
        }
    }
}

fn to_language_title(language: &str) -> &'static str {
    match language {
        "js" | "jsx" | "ts" => "JavaScript",
        "json" => "JSON",
        "css" => "CSS",
        "graphql" => "GraphQL",
        "html" => "HTML",
        "md" => "Markdown",
        _ => {
            panic!("Language {language} isn't supported.")
        }
    }
}

fn to_language_selector_label(language: &str) -> &'static str {
    match language {
        "js" | "jsx" | "ts" => "JavaScript (and super languages)",
        "json" => "JSON (and super languages)",
        "css" => "CSS",
        "graphql" => "GraphQL",
        "html" => "HTML",
        "md" => "Markdown",
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

/// Creates service builders for analysing code blocks.
///
/// - Parses markdown documentation and searches for code blocks with the
///   `file=<path>` attribute.
/// - Found code blocks are then used to generate an in-memory file system to be
///   used by lint rules that evaluate multi-file scenarios (for example,
///   [detecting circular imports](https://biomejs.dev/linter/rules/no-import-cycles)).
/// - Each file system is organised and scoped by content sections in the
///   Markdown documentation, delineated by headings.
/// - The file systems are indexed into the project layout and module graph
///   inside [`AnalyzerServicesBuilder::from_files()`].
/// - We return the builders hashed by Markdown section number.
///
/// The reason we create all builders for all sections in one pass is to prevent
/// having to run multiple parsing passes on the same markdown document.
fn create_service_builders(
    docs: &'static str,
    enable_type_inference: bool,
) -> Result<HashMap<usize, AnalyzerServicesBuilder>> {
    let parser = Parser::new(docs);

    // HashMap to store files organized by their containing markdown section
    let mut files: HashMap<usize, HashMap<String, String>> = HashMap::new();
    // Section counter synchronized with the main rendering pass
    let mut content_section = 0;

    // If any code block is found with the `file` attribute, it will be stored here to be added
    // to the current content section's file system
    let mut current_file = None;

    for event in parser {
        match event {
            Event::Start(Tag::CodeBlock(CodeBlockKind::Fenced(meta))) => {
                let code_block = CodeBlock::from_str(meta.as_ref())?;
                if let Some(file_path) = code_block.explicit_file_path() {
                    current_file = Some((file_path.to_string(), String::new()));
                }
            }
            Event::End(TagEnd::CodeBlock) => {
                if let Some((path, content)) = current_file.take() {
                    files
                        .entry(content_section)
                        .or_default()
                        .insert(path, content);
                }
            }
            Event::Text(text) => {
                if let Some((_, content)) = &mut current_file {
                    content.push_str(&text);
                }
            }
            Event::Start(Tag::Heading { level, .. })
            // When we encounter a heading we start a new content section to scope any file
            // system to that section
            if is_main_heading(level) => {
                content_section += 1;
            }
            _ => {}
        }
    }

    Ok(files
        .into_iter()
        .map(|(section, files)| {
            (
                section,
                AnalyzerServicesBuilder::from_files(files, enable_type_inference),
            )
        })
        .collect())
}

fn is_main_heading(heading: HeadingLevel) -> bool {
    matches!(
        heading,
        HeadingLevel::H1 | HeadingLevel::H2 | HeadingLevel::H3 | HeadingLevel::H4
    )
}
