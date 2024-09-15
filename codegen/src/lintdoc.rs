use crate::project_root;
use crate::rules_sources::generate_rule_sources;
use crate::shared::add_codegen_disclaimer_frontmatter;
use anyhow::Context;
use anyhow::{bail, Result};
use biome_analyze::options::JsxRuntime;
use biome_analyze::{
    AnalysisFilter, AnalyzerConfiguration, AnalyzerOptions, ControlFlow, FixKind, GroupCategory,
    Queryable, RegistryVisitor, Rule, RuleCategory, RuleFilter, RuleGroup, RuleMetadata,
    RuleSourceKind,
};
use biome_console::fmt::Termcolor;
use biome_console::{
    fmt::{Formatter, HTML},
    markup, Markup, MarkupBuf,
};
use biome_css_parser::CssParserOptions;
use biome_css_syntax::CssLanguage;
use biome_diagnostics::termcolor::NoColor;
use biome_diagnostics::{Diagnostic, DiagnosticExt, PrintDiagnostic};
use biome_graphql_syntax::GraphqlLanguage;
use biome_js_parser::JsParserOptions;
use biome_js_syntax::{EmbeddingKind, JsFileSource, JsLanguage};
use biome_json_parser::JsonParserOptions;
use biome_json_syntax::JsonLanguage;
use biome_service::settings::WorkspaceSettings;
use biome_service::workspace::DocumentFileSource;
use biome_string_case::Case;
use pulldown_cmark::{CodeBlockKind, Event, LinkType, Parser, Tag, TagEnd};
use std::collections::{BTreeSet, HashMap};
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
pub(crate) struct RuleToDocument {
    pub(crate) language_to_metadata: HashMap<&'static str, RuleMetadata>,
}

#[derive(Default)]
struct LintRulesVisitor {
    /// This is mapped to:
    /// - group (correctness) -> list of rules
    /// - list or rules is mapped to
    /// - rule name -> list of languages
    /// - list of languages is mapped to
    /// - language -> metadata
    ///
    groups: BTreeMap<&'static str, BTreeMap<&'static str, RuleToDocument>>,
    number_of_rules: u16,
}

impl LintRulesVisitor {
    fn push_rule<R, L>(&mut self)
    where
        R: Rule<Options: Default, Query: Queryable<Language = L, Output: Clone>> + 'static,
    {
        self.number_of_rules += 1;
        let group = self
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

impl RegistryVisitor<JsLanguage> for LintRulesVisitor {
    fn record_category<C: GroupCategory<Language = JsLanguage>>(&mut self) {
        if matches!(C::CATEGORY, RuleCategory::Lint) {
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

impl RegistryVisitor<JsonLanguage> for LintRulesVisitor {
    fn record_category<C: GroupCategory<Language = JsonLanguage>>(&mut self) {
        if matches!(C::CATEGORY, RuleCategory::Lint) {
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

impl RegistryVisitor<CssLanguage> for LintRulesVisitor {
    fn record_category<C: GroupCategory<Language = CssLanguage>>(&mut self) {
        if matches!(C::CATEGORY, RuleCategory::Lint) {
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
impl RegistryVisitor<GraphqlLanguage> for LintRulesVisitor {
    fn record_category<C: GroupCategory<Language = GraphqlLanguage>>(&mut self) {
        if matches!(C::CATEGORY, RuleCategory::Lint) {
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
    let root = project_root().join("src/content/docs/linter/rules");
    let index_page = root.join("index.mdx");
    let reference_groups = project_root().join("src/components/generated/Groups.astro");
    let rules_sources = project_root().join("src/content/docs/linter/rules-sources.mdx");
    let reference_number_of_rules =
        project_root().join("src/components/generated/NumberOfRules.astro");
    let reference_recommended_rules =
        project_root().join("src/components/generated/RecommendedRules.astro");
    // Clear the rules directory ignoring "not found" errors

    if root.exists() {
        if let Err(err) = fs::remove_dir_all(&root) {
            let is_not_found = err
                .source()
                .and_then(|err| err.downcast_ref::<io::Error>())
                .map_or(false, |err| matches!(err.kind(), io::ErrorKind::NotFound));

            if !is_not_found {
                return Err(err.into());
            }
        }
    }
    fs::create_dir_all(&root)?;

    // Content of the index page
    let mut index = Vec::new();
    let mut reference_buffer = Vec::new();
    writeln!(index, "---")?;
    add_codegen_disclaimer_frontmatter(&mut index)?;
    writeln!(index, "title: Rules")?;
    writeln!(index, "description: List of available lint rules.")?;
    writeln!(index, "---")?;
    writeln!(index)?;

    write!(
        index,
        r#"
import RecommendedRules from "@/components/generated/RecommendedRules.astro";
import {{ Icon }} from "@astrojs/starlight/components";

Below the list of rules supported by Biome, divided by group. Here's a legend of the emojis:
- The icon <span class='inline-icon' title="This rule is recommended"><Icon name="approve-check-circle"x label="This rule is recommended" /></span> indicates that the rule is part of the recommended rules.
- The icon <span class='inline-icon' title="This rule has a safe fix"><Icon name="seti:config" label="The rule has a safe fix" /></span> indicates that the rule provides a code action (fix) that is **safe** to apply.
- The icon <span class='inline-icon' title="This rule has an unsafe fix"><Icon name="warning" label="The rule has an unsafe fix" /></span> indicates that the rule provides a code action (fix) that is **unsafe** to apply.
- The icon <span class='inline-icon' title="JavaScript and super languages rule"><Icon name="seti:javascript" label="JavaScript and super languages rule" /></span> indicates that the rule is applied to JavaScript and super languages files.
- The icon <span class='inline-icon' title="TypeScript rule"><Icon name="seti:typescript" label="TypeScript rule" /></span> indicates that the rule is applied to TypeScript and TSX files.
- The icon <span class='inline-icon' title="JSON rule"><Icon name="seti:json" label="JSON rule" /></span> indicates that the rule is applied to JSON files.
- The icon <span class='inline-icon' title="CSS rule"><Icon name="seti:css" label="CSS rule" /></span> indicates that the rule is applied to CSS files.
- The icon <span class='inline-icon' title="GraphQL rule"><Icon name="seti:graphql" label="GraphQL rule" /></span> indicates that the rule is applied to GraphQL files.
"#
    )?;

    // Accumulate errors for all lint rules to print all outstanding issues on
    // failure instead of just the first one
    let mut errors = Vec::new();

    let mut visitor = LintRulesVisitor::default();
    biome_js_analyze::visit_registry(&mut visitor);
    biome_json_analyze::visit_registry(&mut visitor);
    biome_css_analyze::visit_registry(&mut visitor);
    biome_graphql_analyze::visit_registry(&mut visitor);

    let mut recommended_rules = String::new();

    let LintRulesVisitor {
        groups,
        number_of_rules,
    } = visitor;

    assert!(
        groups.contains_key("nursery"),
        "Expected nursery group to exist"
    );

    writeln!(
        reference_buffer,
        "<!-- this file is auto generated, use `pnpm codegen:all` to update it -->"
    )?;
    let rule_sources_buffer = generate_rule_sources(groups.clone())?;
    for (group, rules) in groups {
        generate_group(
            group,
            rules,
            &root,
            &mut index,
            &mut errors,
            &mut recommended_rules,
        )?;
        generate_reference(group, &mut reference_buffer)?;
    }

    if !errors.is_empty() {
        bail!(
            "failed to generate documentation pages for the following rules:\n{}",
            errors
                .into_iter()
                .fold(String::new(), |mut s, (rule, err)| {
                    s.push_str(&format!("- {rule}: {err:?}\n"));
                    s
                })
        );
    }
    let recommended_rules_buffer = format!(
        "<!-- this file is auto generated, use `cargo lintdoc` to update it -->\n \
    <ul>\n{}\n</ul>",
        recommended_rules
    );

    let number_of_rules_buffer = format!(
        "<!-- this file is auto generated, use `cargo lintdoc` to update it -->\n{number_of_rules}"
    );
    write!(
        index,
        "
## Recommended rules

The recommended rules are:

<RecommendedRules />
"
    )?;
    fs::write(index_page, index)?;
    fs::write(reference_groups, reference_buffer)?;
    fs::write(reference_number_of_rules, number_of_rules_buffer)?;
    fs::write(reference_recommended_rules, recommended_rules_buffer)?;
    fs::write(rules_sources, rule_sources_buffer)?;

    Ok(())
}

fn generate_group(
    group: &'static str,
    rules: BTreeMap<&'static str, RuleToDocument>,
    content_root: &Path,
    content: &mut dyn io::Write,
    errors: &mut Vec<(&'static str, anyhow::Error)>,
    recommended_rules: &mut String,
) -> io::Result<()> {
    let (group_name, description) = extract_group_metadata(group);
    let is_nursery = group == "nursery";

    writeln!(content, "\n## {group_name}")?;
    writeln!(content)?;
    write_markup_to_string(content, description)?;
    writeln!(content)?;
    writeln!(content, "| Rule name | Description | Properties |")?;
    writeln!(content, "| --- | --- | --- |")?;

    for (rule_name, rule_to_document) in rules {
        let summary = generate_rule(GenRule {
            content_root,
            group,
            rule_name,
            is_nursery,
            rule_to_document: &rule_to_document,
        });

        let summary = match summary {
            Ok(summary) => summary,
            Err(err) => {
                errors.push((rule_name, err));
                continue;
            }
        };

        for (language, meta) in &rule_to_document.clone().language_to_metadata {
            // We don't document rules that haven't been released yet
            if meta.version == "next" {
                continue;
            }
            let is_recommended = !is_nursery && meta.recommended;
            let dashed_rule = Case::Kebab.convert(rule_name);
            if is_recommended {
                recommended_rules.push_str(&format!(
                    "\t<li><a href='/linter/rules/{dashed_rule}'>{rule_name}</a></li>\n"
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

            push_language_icon(language, &mut properties);

            let summary_html = events_to_text(summary.clone());
            write!(
                content,
                "| [{rule_name}](/linter/rules/{dashed_rule}) | {summary_html} | {properties} |"
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
fn generate_rule(payload: GenRule) -> Result<Vec<Event<'static>>> {
    let mut summary = Vec::new();

    let mut content = Vec::new();

    // // Write the header for this lint rule

    let result: BTreeSet<_> = payload
        .rule_to_document
        .language_to_metadata
        .iter()
        .filter_map(|(language, meta)| {
            generate_rule_content(
                language,
                payload.group,
                payload.rule_name,
                payload.is_nursery,
                meta,
                &mut summary,
            )
            .ok()
        })
        .collect();

    let summary_text = events_to_text(summary.clone());

    writeln!(content, "---")?;
    add_codegen_disclaimer_frontmatter(&mut content)?;
    writeln!(content, "title: {}", payload.rule_name)?;
    writeln!(
        content,
        "description: |\n  {}",
        summary_text.replace("'", "\'")
    )?;
    writeln!(content, "---")?;

    writeln!(
        content,
        r#"import {{ Tabs, TabItem }} from '@astrojs/starlight/components';"#
    )?;

    writeln!(content)?;

    writeln!(
        content,
        "**Diagnostic Category: `lint/{}/{}`**",
        payload.group, payload.rule_name
    )?;

    writeln!(content, "<Tabs>")?;

    for (rule_content, language, icon) in result {
        writeln!(
            content,
            "<TabItem label=\"{}\" icon=\"{}\">",
            language, icon
        )?;
        writeln!(content, "{}", String::from_utf8(rule_content).unwrap())?;
        writeln!(content, "</TabItem>")?;
    }

    writeln!(content, "</Tabs>\n")?;

    let rule_name_case = Case::Kebab.convert(payload.rule_name);
    fs::write(
        payload.content_root.join(format!("{rule_name_case}.mdx")),
        content,
    )?;

    Ok(summary)
}

fn generate_rule_content<'a>(
    language: &'static str,
    group: &'static str,
    rule_name: &'static str,
    is_nursery: bool,
    meta: &RuleMetadata,
    summary: &mut Vec<Event<'static>>,
) -> Result<(Vec<u8>, String, String)> {
    let is_recommended = !is_nursery && meta.recommended;
    let mut content = Vec::new();

    if meta.deprecated != None {
        writeln!(content, ":::caution[Deprecated]")?;
        writeln!(
            content,
            "This rule is deprecated and will be removed in the next major release.\n
            **Reason**: {}",
            meta.deprecated.as_ref().unwrap()
        )?;
        writeln!(content, ":::")?;
    }

    writeln!(content, "**Since**: `v{}`", meta.version)?;

    if is_recommended || !matches!(meta.fix_kind, FixKind::None) {
        writeln!(content, ":::note")?;
        if is_recommended {
            writeln!(content, "- This rule is recommended by Biome. A diagnostic error will appear when linting your code.")?;
        }
        match meta.fix_kind {
            FixKind::Safe => {
                writeln!(content, "- This rule has a **safe** fix.")?;
            }
            FixKind::Unsafe => {
                writeln!(content, "- This rule has an **unsafe** fix.")?;
            }
            FixKind::None => {}
        }
        writeln!(content, ":::")?;
        writeln!(content)?;
    }

    if group == "nursery" {
        writeln!(content, ":::caution")?;
        writeln!(
            content,
            "This rule is part of the [nursery](/linter/rules/#nursery) group."
        )?;
        writeln!(content, ":::")?;
        writeln!(content)?;
    }
    if !meta.sources.is_empty() {
        writeln!(content, "Sources: ")?;

        for source in meta.sources {
            let rule_name = source.to_namespaced_rule_name();
            let source_rule_url = source.to_rule_url();
            match meta.source_kind.as_ref().copied().unwrap_or_default() {
                RuleSourceKind::Inspired => {
                    write!(content, "- Inspired from: ")?;
                }
                RuleSourceKind::SameLogic => {
                    write!(content, "- Same as: ")?;
                }
            };
            writeln!(
                content,
                "<a href=\"{source_rule_url}\" target=\"_blank\"><code>{rule_name}</code></a>"
            )?;
        }
        writeln!(content)?;
    }

    write_documentation(group, rule_name, meta.docs, &mut content, summary)?;

    writeln!(content, "## Related links")?;
    writeln!(content)?;
    writeln!(content, "- [Disable a rule](/linter/#disable-a-lint-rule)")?;
    writeln!(
        content,
        "- [Configure the rule fix](/linter#configure-the-rule-fix)"
    )?;
    writeln!(content, "- [Rule options](/linter/#rule-options)")?;

    Ok((
        content,
        to_language_tab(language).to_string(),
        to_language_icon(language).to_string(),
    ))
}

/// Parse the documentation fragment for a lint rule (in markdown) and generates
/// the content for the corresponding documentation page
fn write_documentation(
    group: &'static str,
    rule: &'static str,
    docs: &'static str,
    content: &mut Vec<u8>,
    // Parser events for the first paragraph of documentation in the resulting
    // content, used as a short summary of what the rule does in the rules page
    summary: &mut Vec<Event<'static>>,
) -> Result<()> {
    let parser = Parser::new(docs);

    let mut is_summary = false;

    // Tracks the content of the current code block if it's using a
    // language supported for analysis
    let mut language = None;
    let mut list_order = None;
    let mut list_indentation = 0;

    // Tracks the type and metadata of the link
    let mut start_link_tag: Option<Tag> = None;

    for event in parser {
        if is_summary {
            if matches!(event, Event::End(TagEnd::Paragraph)) {
                is_summary = false;
            } else {
                summary.push(event.clone());
            }
        }

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
                    }

                    print_diagnostics(group, rule, &test, &block, content)
                        .context("snapshot test failed")?;

                    if test.expect_diagnostic {
                        writeln!(content, "</code></pre>")?;
                        writeln!(content)?;
                    }
                }
            }

            Event::Text(text) => {
                if let Some((_, block)) = &mut language {
                    write!(block, "{text}")?;
                }

                write!(content, "{text}")?;
            }

            // Other markdown events are emitted as-is
            Event::Start(Tag::Heading { level, .. }) => {
                write!(content, "{} ", "#".repeat(level as usize))?;
            }
            Event::End(TagEnd::Heading { .. }) => {
                writeln!(content)?;
                writeln!(content)?;
            }

            Event::Start(Tag::Paragraph) => {
                if summary.is_empty() && !is_summary {
                    is_summary = true;
                }
            }
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

            Event::Start(Tag::BlockQuote) => {
                write!(content, ">")?;
            }

            Event::End(TagEnd::BlockQuote) => {
                writeln!(content)?;
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
    tag: String,
    expect_diagnostic: bool,
    ignore: bool,
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
            .split(|c| c == ',' || c == ' ' || c == '\t')
            .map(str::trim)
            .filter(|token| !token.is_empty());

        let mut test = CodeBlockTest {
            tag: String::new(),
            expect_diagnostic: false,
            ignore: false,
        };

        for token in tokens {
            match token {
                // Other attributes
                "expect_diagnostic" => test.expect_diagnostic = true,
                "ignore" => test.ignore = true,
                // Regard as language tags, last one wins
                _ => test.tag = token.to_string(),
            }
        }

        Ok(test)
    }
}

/// Parse and analyze the provided code block, and asserts that it emits
/// exactly zero or one diagnostic depending on the value of `expect_diagnostic`.
/// That diagnostic is then emitted as text into the `content` buffer
fn print_diagnostics(
    group: &'static str,
    rule: &'static str,
    test: &CodeBlockTest,
    code: &str,
    content: &mut Vec<u8>,
) -> Result<()> {
    let file_path = format!("code-block.{}", test.tag);

    let mut write = HTML::new(content).with_mdx();

    let mut write_diagnostic = |_: &str, diag: biome_diagnostics::Error| {
        Formatter::new(&mut write).write_markup(markup! {
            {PrintDiagnostic::verbose(&diag)}
        })?;
        Ok(())
    };
    if test.ignore {
        return Ok(());
    }
    let mut rule_has_code_action = false;
    let mut settings = WorkspaceSettings::default();
    let key = settings.insert_project(PathBuf::new());
    settings.register_current_project(key);
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
                    write_diagnostic(code, error)?;
                }
            } else {
                let root = parse.tree();

                let rule_filter = RuleFilter::Rule(group, rule);
                let filter = AnalysisFilter {
                    enabled_rules: Some(slice::from_ref(&rule_filter)),
                    ..AnalysisFilter::default()
                };

                let options = AnalyzerOptions {
                    configuration: AnalyzerConfiguration {
                        jsx_runtime: Some(JsxRuntime::default()),
                        ..Default::default()
                    },
                    file_path: PathBuf::from(&file_path),
                };
                biome_js_analyze::analyze(&root, filter, &options, file_source, None, |signal| {
                    if let Some(mut diag) = signal.diagnostic() {
                        let category = diag.category().expect("linter diagnostic has no code");
                        let severity = settings.get_current_settings().expect("project").get_severity_from_rule_code(category).expect(
                                "If you see this error, it means you need to run cargo codegen-configuration",
                            );

                        for action in signal.actions() {
                            if !action.is_suppression() {
                                rule_has_code_action = true;
                                diag = diag.add_code_suggestion(action.into());
                            }
                        }

                        let error = diag
                            .with_severity(severity)
                            .with_file_path(&file_path)
                            .with_file_source_code(code);
                        let res = write_diagnostic(code, error);

                        // Abort the analysis on error
                        if let Err(err) = res {
                            return ControlFlow::Break(err);
                        }
                    }

                    ControlFlow::Continue(())
                });
            }
        }
        DocumentFileSource::Json(file_source) => {
            let parse = biome_json_parser::parse_json(code, JsonParserOptions::from(&file_source));

            if parse.has_errors() {
                for diag in parse.into_diagnostics() {
                    let error = diag.with_file_path(&file_path).with_file_source_code(code);
                    write_diagnostic(code, error)?;
                }
            } else {
                let root = parse.tree();

                let rule_filter = RuleFilter::Rule(group, rule);
                let filter = AnalysisFilter {
                    enabled_rules: Some(slice::from_ref(&rule_filter)),
                    ..AnalysisFilter::default()
                };

                let options = AnalyzerOptions {
                    file_path: PathBuf::from(&file_path),
                    ..Default::default()
                };
                biome_json_analyze::analyze(&root, filter, &options, file_source, |signal| {
                    if let Some(mut diag) = signal.diagnostic() {
                        let category = diag.category().expect("linter diagnostic has no code");
                        let severity = settings.get_current_settings().expect("project").get_severity_from_rule_code(category).expect(
                                "If you see this error, it means you need to run cargo codegen-configuration",
                            );

                        for action in signal.actions() {
                            if !action.is_suppression() {
                                rule_has_code_action = true;
                                diag = diag.add_code_suggestion(action.into());
                            }
                        }

                        let error = diag
                            .with_severity(severity)
                            .with_file_path(&file_path)
                            .with_file_source_code(code);
                        let res: Result<()> = write_diagnostic(code, error);

                        // Abort the analysis on error
                        if let Err(err) = res {
                            return ControlFlow::Break(err);
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
                    write_diagnostic(code, error)?;
                }
            } else {
                let root = parse.tree();

                let rule_filter = RuleFilter::Rule(group, rule);
                let filter = AnalysisFilter {
                    enabled_rules: Some(slice::from_ref(&rule_filter)),
                    ..AnalysisFilter::default()
                };

                let options = AnalyzerOptions {
                    file_path: PathBuf::from(&file_path),
                    ..Default::default()
                };
                biome_css_analyze::analyze(&root, filter, &options, |signal| {
                    if let Some(mut diag) = signal.diagnostic() {
                        let category = diag.category().expect("linter diagnostic has no code");
                        let severity = settings.get_current_settings().expect("project").get_severity_from_rule_code(category).expect(
                                "If you see this error, it means you need to run cargo codegen-configuration",
                            );

                        for action in signal.actions() {
                            if !action.is_suppression() {
                                rule_has_code_action = true;
                                diag = diag.add_code_suggestion(action.into());
                            }
                        }

                        let error = diag
                            .with_severity(severity)
                            .with_file_path(&file_path)
                            .with_file_source_code(code);
                        let res = write_diagnostic(code, error);

                        // Abort the analysis on error
                        if let Err(err) = res {
                            return ControlFlow::Break(err);
                        }
                    }

                    ControlFlow::Continue(())
                });
            }
        }
        // Unknown code blocks should be ignored by tests
        DocumentFileSource::Unknown => {}
        DocumentFileSource::Graphql(_) => {}
        _ => {}
    }

    Ok(())
}

fn generate_reference(group: &'static str, buffer: &mut dyn io::Write) -> io::Result<()> {
    let (group_name, description) = extract_group_metadata(group);
    let description = markup_to_string(&description.to_owned());
    let description = description.replace('\n', " ");
    writeln!(
        buffer,
        "<li><code>{}</code>: {}</li>",
        group_name.to_lowercase(),
        description
    )
}

fn extract_group_metadata(group: &str) -> (&str, Markup) {
    match group {
        "a11y" => (
            "Accessibility",
            markup! {
                "Rules focused on preventing accessibility problems."
            },
        ),
        "complexity" => (
            "Complexity",
            markup! {
                "Rules that focus on inspecting complex code that could be simplified."
            },
        ),
        "correctness" => (
            "Correctness",
            markup! {
                "Rules that detect code that is guaranteed to be incorrect or useless."
            },
        ),
        "nursery" => (
            "Nursery",
            markup! {
                "New rules that are still under development.

Nursery rules require explicit opt-in via configuration on stable versions because they may still have bugs or performance problems.
They are enabled by default on nightly builds, but as they are unstable their diagnostic severity may be set to either error or
warning, depending on whether we intend for the rule to be recommended or not when it eventually gets stabilized.
Nursery rules get promoted to other groups once they become stable or may be removed.

Rules that belong to this group "<Emphasis>"are not subject to semantic version"</Emphasis>"."
            },
        ),
        "performance" => (
            "Performance",
            markup! {
                "Rules catching ways your code could be written to run faster, or generally be more efficient."
            },
        ),
        "security" => (
            "Security",
            markup! {
                "Rules that detect potential security flaws."
            },
        ),
        "style" => (
            "Style",
            markup! {
                "Rules enforcing a consistent and idiomatic way of writing your code."
            },
        ),
        "suspicious" => (
            "Suspicious",
            markup! {
                "Rules that detect code that is likely to be incorrect or useless."
            },
        ),
        _ => panic!("Unknown group ID {group:?}"),
    }
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
            panic!("Language {} isn't supported.", language)
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
            panic!("Language {} isn't supported.", language)
        }
    }
}

fn push_language_icon(language: &str, properties: &mut String) {
    match language {
        "js" => {
            properties.push_str("<span class='inline-icon' title=\"JavaScript and super languages rule.\"><Icon name=\"seti:javascript\" label=\"JavaScript and super languages rule.\" size=\"1.2rem\"/></span>");
        }
        "jsx" => {
            properties.push_str("<span class='inline-icon'  title=\"JSX rule.\"><Icon name=\"seti:javascript\" label=\"JSX rule\" size=\"1.2rem\"/></span>");
        }
        "ts" => {
            properties.push_str("<span class='inline-icon'  title=\"TypeScript rule.\"><Icon name=\"seti:typescript\" label=\"TypeScript rule\" size=\"1.2rem\"/></span>");
        }
        "json" => {
            properties.push_str("<span class='inline-icon' title=\"JSON rule.\"><Icon name=\"seti:json\" label=\"JSON rule\" size=\"1.2rem\"/></span>");
        }
        "css" => {
            properties.push_str("<span class='inline-icon' title=\"CSS rule.\"><Icon name=\"seti:css\" label=\"CSS rule\" size=\"1.2rem\"/></span>");
        }
        "graphql" => {
            properties.push_str("<span class='inline-icon' title=\"GraphQL rule\"><Icon name=\"seti:graphql\" label=\"GraphQL rule\" size=\"1.2rem\"/></span>");
        }
        _ => {
            panic!("Language {} isn't supported.", language)
        }
    }
}

fn events_to_text(events: Vec<Event>) -> String {
    let mut buffer = String::new();

    for event in events {
        match event {
            Event::Text(text) => buffer.push_str(&*text),
            _ => {}
        }
    }

    buffer
}
