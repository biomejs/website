import type { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { romeAst as biomeAst } from "codemirror-lang-rome-ast";
import React, { useState } from "react";
import CodeMirror from "@/playground/CodeMirror";

interface Props {
	ast: string;
	cst: string;
}

const biomeAstCodeMirrorExtension = [biomeAst()];

export default React.forwardRef<ReactCodeMirrorRef, Props>(function SyntaxTab(
	{ ast, cst },
	ref,
) {
	const [view, setView] = useState<"ast" | "cst">("ast");

	return (
		<div className="playground-syntax">
			<div className="playground-syntax-tabs" role="tablist">
				<button
					type="button"
					role="tab"
					aria-selected={view === "ast"}
					aria-controls="syntax-ast-panel"
					onClick={() => setView("ast")}
				>
					AST
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={view === "cst"}
					aria-controls="syntax-cst-panel"
					onClick={() => setView("cst")}
				>
					CST
				</button>
			</div>
			{view === "ast" ? (
				<div
					id="syntax-ast-panel"
					className="playground-syntax-panel"
					role="tabpanel"
				>
					<CodeMirror
						value={ast}
						ref={ref}
						extensions={biomeAstCodeMirrorExtension}
						readOnly={true}
						data-testid="ast-output"
					/>
				</div>
			) : (
				<div
					id="syntax-cst-panel"
					className="playground-syntax-panel"
					role="tabpanel"
				>
					<CodeMirror value={cst} readOnly={true} data-testid="cst-output" />
				</div>
			)}
		</div>
	);
});
