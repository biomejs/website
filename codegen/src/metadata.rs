use crate::project_root;
use biome_analyze::{
    FixKind, GroupCategory, Queryable, RegistryVisitor, Rule, RuleCategory, RuleGroup,
    RuleMetadata, RuleSource, RuleSourceKind,
};
use biome_css_syntax::CssLanguage;
use biome_js_syntax::JsLanguage;
use biome_json_syntax::JsonLanguage;
use serde::Serialize;
use std::collections::BTreeMap;
use std::fs;

#[derive(Default, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct Metadata {
    lints: Rules,
    syntax: Rules,
    assist: Rules,
    #[serde(skip)]
    current_category: Option<RuleCategory>,
    #[serde(skip)]
    current_group: Option<String>,
}

#[derive(Default, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct Rules {
    languages:
        BTreeMap<RuleLanguageMeta, BTreeMap<RuleGroupMeta, BTreeMap<RuleNameMeta, JsonMetadata>>>,
    number_or_rules: u16,
}

#[derive(Default, Debug, Serialize, Ord, PartialOrd, PartialEq, Eq)]
struct RuleGroupMeta(&'static str);

impl From<&'static str> for RuleGroupMeta {
    fn from(value: &'static str) -> Self {
        Self(value)
    }
}

#[derive(Default, Debug, Serialize, Ord, PartialOrd, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
struct RuleLanguageMeta(&'static str);

impl From<&'static str> for RuleLanguageMeta {
    fn from(value: &'static str) -> Self {
        Self(value)
    }
}

#[derive(Default, Debug, Serialize, Ord, PartialOrd, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
struct RuleNameMeta(&'static str);

impl From<&'static str> for RuleNameMeta {
    fn from(value: &'static str) -> Self {
        Self(value)
    }
}

#[derive(Default, Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct JsonMetadata {
    /// It marks if a rule is deprecated, and if so a reason has to be provided.
    pub deprecated: bool,
    /// The version when the rule was implemented
    pub version: String,
    /// The name of this rule, displayed in the diagnostics it emits
    pub name: String,
    /// Whether a rule is recommended or not
    pub recommended: bool,
    /// The kind of fix
    #[serde(skip_serializing_if = "Option::is_none")]
    pub fix_kind: Option<FixKind>,
    /// The source URL of the rule
    #[serde(skip_serializing_if = "Vec::is_empty")]
    pub sources: Vec<RuleSource>,
    /// The source kind of the rule
    #[serde(skip_serializing_if = "Option::is_none")]
    pub source_kind: Option<RuleSourceKind>,
    
    pub docs: String
}

impl From<RuleMetadata> for JsonMetadata {
    fn from(value: RuleMetadata) -> Self {
        Self {
            deprecated: value.deprecated.is_some(),
            version: value.version.to_string(),
            source_kind: value.source_kind,
            name: value.name.to_string(),
            sources: value.sources.to_vec(),
            recommended: value.recommended,
            fix_kind: value.fix_kind,
            docs: value.docs.to_string()
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
        R: Rule + 'static,
        R::Query: Queryable<Language = JsLanguage>,
        <R::Query as Queryable>::Output: Clone,
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
        R: Rule + 'static,
        R::Query: Queryable<Language = JsonLanguage>,
        <R::Query as Queryable>::Output: Clone,
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
        R: Rule + 'static,
        R::Query: Queryable<Language = CssLanguage>,
        <R::Query as Queryable>::Output: Clone,
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
    let metadata_file = project_root().join("src/pages/metadata/rules.json.js");
    if metadata_file.exists() {
        fs::remove_file(&metadata_file)?;
    }
    let mut visitor = Metadata::default();
    biome_js_analyze::visit_registry(&mut visitor);
    biome_json_analyze::visit_registry(&mut visitor);
    biome_css_analyze::visit_registry(&mut visitor);

    let content = serde_json::to_string_pretty(&visitor)?;

    let content = format!(r#"export function GET() {{
	const schema = {content};
	// const json_file = new URL("_metadata.json", root);
	return new Response(JSON.stringify(schema), {{
		status: 200,
		headers: {{
			"content-type": "application/json",
		}},
	}});
}}
"#);

    fs::write(metadata_file, content)?;

    Ok(())
}
