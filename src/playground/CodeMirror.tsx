import type { Diagnostic as BiomeDiagnostic } from "@biomejs/wasm-web";
import type { Diagnostic as CodeMirrorDiagnostic } from "@codemirror/lint";
import { lintGutter, setDiagnostics } from "@codemirror/lint";
import type { Extension } from "@codemirror/state";
import { Annotation, StateField } from "@codemirror/state";
import { Decoration, type DecorationSet, EditorView } from "@codemirror/view";
import type {
	ReactCodeMirrorProps,
	ReactCodeMirrorRef,
} from "@uiw/react-codemirror";
import RealCodeMirror from "@uiw/react-codemirror";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { spanInBytesToSpanInCodeUnits, useTheme } from "@/playground/utils";

export type BiomeExtension = Extension;

const yellowHighlight = Decoration.mark({ class: "gritql-match" });

const gritQueryMatchesAnnotation = Annotation.define<[number, number][]>();

function buildDecorations(
	matches: [number, number][],
	doc: string,
): DecorationSet {
	const decorations = [];

	for (const [from, to] of matches) {
		const [codeUnitFrom, codeUnitTo] = spanInBytesToSpanInCodeUnits(
			[from, to],
			doc,
		);
		decorations.push(yellowHighlight.range(codeUnitFrom, codeUnitTo));
	}

	return Decoration.set(decorations);
}

const gritQueryMatchesField = StateField.define<DecorationSet>({
	create() {
		return Decoration.none;
	},
	update(matches, tr) {
		const newMatches = tr.annotation(gritQueryMatchesAnnotation);
		if (newMatches !== undefined) {
			return buildDecorations(newMatches, tr.state.doc.toString());
		}
		return matches.map(tr.changes);
	},
	provide: (f) => {
		return EditorView.decorations.from(f);
	},
});

interface Props extends ReactCodeMirrorProps {
	diagnostics?: BiomeDiagnostic[];
	gritQueryMatches?: [number, number][];
}

function getDiagnosticMessage(diagnostic: BiomeDiagnostic): string {
	let buf = "";
	for (const elem of diagnostic.message) {
		buf += elem.content;
	}
	return buf;
}

function biomeDiagnosticsToCodeMirror(
	biome: BiomeDiagnostic[],
	doc: string,
): CodeMirrorDiagnostic[] {
	const codeMirror: CodeMirrorDiagnostic[] = [];

	for (const diag of biome) {
		const span = diag.location?.span;
		if (!span) {
			continue;
		}

		let severity: CodeMirrorDiagnostic["severity"];
		switch (diag.severity) {
			case "error":
			case "fatal": {
				severity = "error";
				break;
			}

			case "information": {
				severity = "info";
				break;
			}

			case "warning": {
				severity = "warning";
				break;
			}

			default: {
				severity = "error";
			}
		}

		const [from, to] = spanInBytesToSpanInCodeUnits(span, doc);

		codeMirror.push({
			from,
			to,
			severity,
			message: getDiagnosticMessage(diag),
		});
	}

	return codeMirror;
}

export default forwardRef<ReactCodeMirrorRef, Props>(function CodeMirror(
	{ diagnostics, gritQueryMatches, ...props },
	ref,
) {
	const theme = useTheme();

	const [editor, setEditor] = useState<EditorView>();

	function onCreateEditor(editor: EditorView) {
		setEditor(editor);
	}

	const extensions = useMemo(() => {
		const baseExtensions = [
			EditorView.lineWrapping,
			...(props.extensions ?? []),
		];

		if (gritQueryMatches && gritQueryMatches.length > 0) {
			return [gritQueryMatchesField, ...baseExtensions];
		}

		if (diagnostics === undefined || diagnostics.length === 0) {
			return baseExtensions;
		}

		return [lintGutter(), ...baseExtensions];
	}, [diagnostics, props.extensions, gritQueryMatches]);

	useEffect(() => {
		if (editor !== undefined && diagnostics !== undefined) {
			editor.dispatch(
				setDiagnostics(
					editor.state,
					biomeDiagnosticsToCodeMirror(
						diagnostics,
						editor.state.doc.toString(),
					),
				),
			);
		}
	}, [editor, diagnostics]);

	useEffect(() => {
		if (editor !== undefined && gritQueryMatches !== undefined) {
			editor.dispatch({
				annotations: [gritQueryMatchesAnnotation.of(gritQueryMatches)],
			});
		}
	}, [editor, gritQueryMatches]);

	return (
		<RealCodeMirror
			{...props}
			extensions={extensions}
			onCreateEditor={onCreateEditor}
			ref={ref}
			theme={theme}
		/>
	);
});
