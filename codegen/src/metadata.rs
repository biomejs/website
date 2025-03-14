use crate::project_root;
use biome_analyze::{
    FixKind, GroupCategory, Queryable, RegistryVisitor, Rule, RuleCategory, RuleGroup,
    RuleMetadata, RuleSource, RuleSourceKind,
};
use biome_css_syntax::CssLanguage;
use biome_js_syntax::JsLanguage;
use biome_json_formatter::context::JsonFormatOptions;
use biome_json_parser::{JsonParserOptions, parse_json};
use biome_json_syntax::JsonLanguage;
use biome_string_case::Case;
use schemars::{JsonSchema, schema_for};
use serde::Serialize;
use serde_json::to_string;
use std::collections::BTreeMap;
use std::fs;

#[derive(Default, Debug, Serialize, JsonSchema)]
#[serde(rename_all = "camelCase", default)]
#[schemars(title = "RulesMetadata")]
struct Metadata {
    lints: Rules,
    syntax: Rules,
    assist: Rules,
    #[serde(skip)]
    current_category: Option<RuleCategory>,
    #[serde(skip)]
    current_group: Option<String>,
}

#[derive(Default, Debug, Serialize, JsonSchema)]
#[serde(rename_all = "camelCase", default)]
struct Rules {
    languages:
        BTreeMap<RuleLanguageMeta, BTreeMap<RuleGroupMeta, BTreeMap<RuleNameMeta, JsonMetadata>>>,
    number_or_rules: u16,
}

#[derive(Default, Debug, Serialize, Ord, PartialOrd, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "camelCase", default)]
struct RuleGroupMeta(&'static str);

impl From<&'static str> for RuleGroupMeta {
    fn from(value: &'static str) -> Self {
        Self(value)
    }
}

#[derive(Default, Debug, Serialize, Ord, PartialOrd, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "camelCase", default)]
struct RuleLanguageMeta(&'static str);

impl From<&'static str> for RuleLanguageMeta {
    fn from(value: &'static str) -> Self {
        Self(value)
    }
}

#[derive(Default, Debug, Serialize, Ord, PartialOrd, PartialEq, Eq, JsonSchema)]
#[serde(rename_all = "camelCase", default)]
struct RuleNameMeta(&'static str);

impl From<&'static str> for RuleNameMeta {
    fn from(value: &'static str) -> Self {
        Self(value)
    }
}

#[derive(Default, Debug, Serialize, JsonSchema)]
#[serde(rename_all = "camelCase", default)]
struct JsonMetadata {
    /// It marks if a rule is deprecated, and if so a reason has to be provided.
    pub deprecated: bool,
    /// The version when the rule was implemented
    pub version: String,
    /// The name of this rule, displayed in the diagnostics it emits
    pub name: String,
    /// The rule's documentation URL
    pub link: String,
    /// Whether a rule is recommended or not
    pub recommended: bool,
    /// The kind of fix
    pub fix_kind: FixKind,
    /// The source metadata of the rule
    #[serde(skip_serializing_if = "Vec::is_empty")]
    pub sources: Vec<RuleSource>,
    /// The source kind of the rule
    #[serde(skip_serializing_if = "Option::is_none")]
    pub source_kind: Option<RuleSourceKind>,

    pub docs: String,
}

impl From<RuleMetadata> for JsonMetadata {
    fn from(value: RuleMetadata) -> Self {
        Self {
            deprecated: value.deprecated.is_some(),
            version: value.version.to_string(),
            source_kind: value.source_kind,
            name: value.name.to_string(),
            sources: value.sources.to_vec(),
            link: format!(
                "https://biomejs.dev/linter/rules/{}",
                Case::Kebab.convert(value.name)
            ),
            recommended: value.recommended,
            fix_kind: value.fix_kind,
            docs: value.docs.to_string(),
        }
    }
}

impl RegistryVisitor<JsLanguage> for Metadata {
    fn record_category<C: GroupCategory<Language = JsLanguage>>(&mut self) {
        self.current_category = Some(C::CATEGORY);
        C::record_groups(self);
    }

    fn record_group<G: RuleGroup<Language = JsLanguage>>(&mut self) {
        self.current_group = Some(G::NAME.to_string());
        G::record_rules(self);
    }

    fn record_rule<R>(&mut self)
    where
        R: Rule<Query: Queryable<Language = JsLanguage, Output: Clone>> + 'static,
    {
        match self.current_category.expect("Category to exists.") {
            RuleCategory::Syntax => {
                self.syntax.number_or_rules += 1;
                let languages = self
                    .syntax
                    .languages
                    .entry(R::METADATA.language.into())
                    .or_default();
                let group = languages.entry(R::Group::NAME.into()).or_default();

                group.insert(R::METADATA.name.into(), JsonMetadata::from(R::METADATA));
            }
            RuleCategory::Lint => {
                self.lints.number_or_rules += 1;
                let languages = self
                    .lints
                    .languages
                    .entry(R::METADATA.language.into())
                    .or_default();
                let group = languages.entry(R::Group::NAME.into()).or_default();

                group.insert(R::METADATA.name.into(), JsonMetadata::from(R::METADATA));
            }
            RuleCategory::Action => {
                self.assist.number_or_rules += 1;
                let languages = self
                    .assist
                    .languages
                    .entry(R::METADATA.language.into())
                    .or_default();
                let group = languages.entry(R::Group::NAME.into()).or_default();

                group.insert(R::METADATA.name.into(), JsonMetadata::from(R::METADATA));
            }
            RuleCategory::Transformation => {}
        }
    }
}

impl RegistryVisitor<JsonLanguage> for Metadata {
    fn record_category<C: GroupCategory<Language = JsonLanguage>>(&mut self) {
        self.current_category = Some(C::CATEGORY);
        C::record_groups(self);
    }

    fn record_group<G: RuleGroup<Language = JsonLanguage>>(&mut self) {
        self.current_group = Some(G::NAME.to_string());
        G::record_rules(self);
    }

    fn record_rule<R>(&mut self)
    where
        R: Rule<Query: Queryable<Language = JsonLanguage, Output: Clone>> + 'static,
    {
        match self.current_category.expect("Category to exists.") {
            RuleCategory::Syntax => {
                self.syntax.number_or_rules += 1;
                let languages = self
                    .syntax
                    .languages
                    .entry(R::METADATA.language.into())
                    .or_default();
                let group = languages.entry(R::Group::NAME.into()).or_default();

                group.insert(R::METADATA.name.into(), JsonMetadata::from(R::METADATA));
            }
            RuleCategory::Lint => {
                self.lints.number_or_rules += 1;
                let languages = self
                    .lints
                    .languages
                    .entry(R::METADATA.language.into())
                    .or_default();
                let group = languages.entry(R::Group::NAME.into()).or_default();

                group.insert(R::METADATA.name.into(), JsonMetadata::from(R::METADATA));
            }
            RuleCategory::Action => {
                self.assist.number_or_rules += 1;
                let languages = self
                    .assist
                    .languages
                    .entry(R::METADATA.language.into())
                    .or_default();
                let group = languages.entry(R::Group::NAME.into()).or_default();

                group.insert(R::METADATA.name.into(), JsonMetadata::from(R::METADATA));
            }
            RuleCategory::Transformation => {}
        }
    }
}

impl RegistryVisitor<CssLanguage> for Metadata {
    fn record_category<C: GroupCategory<Language = CssLanguage>>(&mut self) {
        self.current_category = Some(C::CATEGORY);
        C::record_groups(self);
    }

    fn record_group<G: RuleGroup<Language = CssLanguage>>(&mut self) {
        self.current_group = Some(G::NAME.to_string());
        G::record_rules(self);
    }

    fn record_rule<R>(&mut self)
    where
        R: Rule<Query: Queryable<Language = CssLanguage, Output: Clone>> + 'static,
    {
        match self.current_category.expect("Category to exists.") {
            RuleCategory::Syntax => {
                self.syntax.number_or_rules += 1;
                let languages = self
                    .syntax
                    .languages
                    .entry(R::METADATA.language.into())
                    .or_default();
                let group = languages.entry(R::Group::NAME.into()).or_default();

                group.insert(R::METADATA.name.into(), JsonMetadata::from(R::METADATA));
            }
            RuleCategory::Lint => {
                self.lints.number_or_rules += 1;
                let languages = self
                    .lints
                    .languages
                    .entry(R::METADATA.language.into())
                    .or_default();
                let group = languages.entry(R::Group::NAME.into()).or_default();

                group.insert(R::METADATA.name.into(), JsonMetadata::from(R::METADATA));
            }
            RuleCategory::Action => {
                self.assist.number_or_rules += 1;
                let languages = self
                    .assist
                    .languages
                    .entry(R::METADATA.language.into())
                    .or_default();
                let group = languages.entry(R::Group::NAME.into()).or_default();

                group.insert(R::METADATA.name.into(), JsonMetadata::from(R::METADATA));
            }
            RuleCategory::Transformation => {}
        }
    }
}

pub fn generate_json_metadata() -> anyhow::Result<()> {
    println!("Project root {}", project_root().display());
    let metadata_file = project_root().join("src/pages/metadata/rules.json.js");
    let schema_file = project_root().join("src/pages/metadata/schema.json.js");
    println!("Metadata file {}", metadata_file.display());

    if metadata_file.exists() {
        fs::remove_file(&metadata_file)?;
    }
    let mut visitor = Metadata::default();
    biome_js_analyze::visit_registry(&mut visitor);
    biome_json_analyze::visit_registry(&mut visitor);
    biome_css_analyze::visit_registry(&mut visitor);

    let content = serde_json::to_string_pretty(&visitor)?;

    let content = format!(
        r#"export function GET() {{
	const schema = {content};
	return new Response(JSON.stringify(schema), {{
		status: 200,
		headers: {{
			"content-type": "application/json",
		}},
	}});
}}
"#
    );
    let schema = schema_for!(Metadata);
    let json_schema = to_string(&schema)?;
    let parsed = parse_json(&json_schema, JsonParserOptions::default());
    let formatted =
        biome_json_formatter::format_node(JsonFormatOptions::default(), &parsed.syntax())?
            .print()?;

    fs::write(metadata_file, content)?;
    let content = format!(
        r#"export function GET() {{
	const schema = {};
	return new Response(JSON.stringify(schema), {{
		status: 200,
		headers: {{
			"content-type": "application/json",
		}},
	}});
}}
"#,
        formatted.as_code()
    );
    fs::write(schema_file, content)?;

    Ok(())
}
