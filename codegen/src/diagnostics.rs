use crate::project_root;
use anyhow::Result;
use biome_console::fmt::{Formatter, HTML};
use biome_console::markup;
use biome_diagnostics::{
    category, Advices, Diagnostic, DiagnosticExt, DiagnosticTags, Location, LogCategory,
    MessageAndDescription, PrintDiagnostic, Severity, Visit,
};
use biome_rowan::TextRange;
use biome_text_edit::TextEdit;
use std::error::Error;
use std::io::Write;
use std::path::Path;
use std::{fs, io};

#[derive(Debug, Diagnostic)]
struct PlainDiagnostic {
    #[message]
    #[description]
    message: MessageAndDescription,
}

impl Default for PlainDiagnostic {
    fn default() -> Self {
        Self {
            message: MessageAndDescription::from(markup!(
                "This is the message of the diagnostic. It will appear in different colours based on the severity of the diagnostic."
            ).to_owned())
        }
    }
}

#[derive(Debug, Diagnostic)]
struct DiagnosticWithAdvice {
    #[message]
    #[description]
    message: MessageAndDescription,

    #[advice]
    advice: Advice,

    #[verbose_advice]
    verbose_advice: Advice,
}

impl Default for DiagnosticWithAdvice {
    fn default() -> Self {
        Self {
            message: MessageAndDescription::from(markup!(
                "This is the message of the diagnostic. It will appear in different colours based on the severity of the diagnostic."
            ).to_owned()),
            verbose_advice: Advice::default(),
            advice: Advice::default()
        }
    }
}

#[derive(Debug, Default)]
struct Advice {}

impl Advices for Advice {
    fn record(&self, visitor: &mut dyn Visit) -> std::io::Result<()> {
        visitor.record_log(LogCategory::Error, &"This log is an error.")?;
        visitor.record_log(LogCategory::Info, &"This log is a warning")?;
        visitor.record_log(LogCategory::Info, &"This log is an information")?;
        visitor.record_log(
            LogCategory::None,
            &"This log doesn't have any category. Below, you'll have a command",
        )?;
        visitor.record_command("biome command")?;
        visitor.record_log(LogCategory::None, &"Below, a group.")?;

        visitor.record_group(&"I am a group", &GroupAdvice {})?;

        visitor.record_log(LogCategory::None, &"Below, a list.")?;
        visitor.record_list(&[&"First item", &"Second item"])?;

        visitor.record_log(LogCategory::None, &"Below, a diff.")?;
        visitor.record_diff(&TextEdit::from_unicode_words("Old code", "New code"))?;

        visitor.record_log(LogCategory::None, &"Below, a code frame.")?;
        visitor.record_frame(
            Location::builder()
                .source_code(&"Lorem\nIpsum")
                .span(&TextRange::new(0.into(), 3.into()))
                .resource(&"file.js")
                .build(),
        )?;
        Ok(())
    }
}

struct GroupAdvice {}

impl Advices for GroupAdvice {
    fn record(&self, visitor: &mut dyn Visit) -> io::Result<()> {
        visitor.record_log(LogCategory::Info, &"First message of a group.")?;
        visitor.record_log(LogCategory::Info, &"Second message of a group.")?;
        Ok(())
    }
}

fn print_diagnostic(diagnostic: biome_diagnostics::Error, root: &Path, name: &str) -> Result<()> {
    let mut content = vec![];
    writeln!(
        content,
        "<pre class='language-text'><code class='language-text'>"
    )?;

    let mut writer = HTML::new(&mut content).with_mdx();

    let mut write_diagnostic = |diag: biome_diagnostics::Error| -> Result<()> {
        Formatter::new(&mut writer).write_markup(markup! {
            {PrintDiagnostic::simple(&diag)}
        })?;
        Ok(())
    };

    write_diagnostic(diagnostic)?;

    writeln!(content, "</code></pre>")?;

    fs::write(root.join(format!("{name}.md")), content)?;

    Ok(())
}

pub fn generate_diagnostics() -> Result<()> {
    let root = project_root().join("src/components/generated/diagnostics");

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

    // severity
    print_diagnostic(
        PlainDiagnostic::default().with_severity(Severity::Fatal),
        root.as_path(),
        "DiagnosticFatal",
    )?;

    print_diagnostic(
        PlainDiagnostic::default().with_severity(Severity::Error),
        root.as_path(),
        "DiagnosticError",
    )?;

    print_diagnostic(
        PlainDiagnostic::default().with_severity(Severity::Warning),
        root.as_path(),
        "DiagnosticWarning",
    )?;
    print_diagnostic(
        PlainDiagnostic::default().with_severity(Severity::Information),
        root.as_path(),
        "DiagnosticInformation",
    )?;

    // tags
    print_diagnostic(
        PlainDiagnostic::default().with_tags(DiagnosticTags::FIXABLE),
        root.as_path(),
        "DiagnosticFixable",
    )?;
    print_diagnostic(
        PlainDiagnostic::default().with_tags(DiagnosticTags::VERBOSE),
        root.as_path(),
        "DiagnosticVerbose",
    )?;
    print_diagnostic(
        PlainDiagnostic::default().with_tags(DiagnosticTags::DEPRECATED_CODE),
        root.as_path(),
        "DiagnosticDeprecated",
    )?;
    print_diagnostic(
        PlainDiagnostic::default().with_tags(DiagnosticTags::INTERNAL),
        root.as_path(),
        "DiagnosticInternal",
    )?;

    // category
    print_diagnostic(
        PlainDiagnostic::default().with_category(category!("check")),
        root.as_path(),
        "DiagnosticCategorySimple",
    )?;
    print_diagnostic(
        PlainDiagnostic::default().with_category(category!("lint/a11y/noAccessKey")),
        root.as_path(),
        "DiagnosticCategoryLink",
    )?;

    // location
    print_diagnostic(
        PlainDiagnostic::default().with_file_path("path/to/file.js"),
        root.as_path(),
        "DiagnosticLocFile",
    )?;
    print_diagnostic(
        PlainDiagnostic::default()
            .with_file_source_code("Some source code")
            .with_file_span(TextRange::new(5.into(), 10.into())),
        root.as_path(),
        "DiagnosticLocFrame",
    )?;
    print_diagnostic(
        PlainDiagnostic::default()
            .with_file_path("path/to/file.txt")
            .with_file_source_code("Some source code")
            .with_file_span(TextRange::new(5.into(), 11.into())),
        root.as_path(),
        "DiagnosticLocAll",
    )?;
    print_diagnostic(
        PlainDiagnostic::default()
            .with_file_path("path/to/file.js")
            .with_file_source_code("function name() {\n\treturn 'lorem'\n}")
            .with_file_span(TextRange::new(19.into(), 33.into())),
        root.as_path(),
        "DiagnosticLocMultiline",
    )?;

    // Advices
    print_diagnostic(
        DiagnosticWithAdvice::default().into(),
        root.as_path(),
        "DiagnosticWithAdvice",
    )?;
    Ok(())
}
