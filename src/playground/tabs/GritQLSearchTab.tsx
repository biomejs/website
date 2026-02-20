import { EditorSelection } from "@codemirror/state";
import type { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import type { RefObject } from "react";
import { useCallback } from "react";
import CodeMirror from "@/playground/CodeMirror";
import { spanInBytesToSpanInCodeUnits } from "@/playground/utils";

interface Props {
	editorRef: RefObject<ReactCodeMirrorRef | null>;
	code: string;
	gritQuery: string;
	gritQueryResults: { matches: [number, number][]; error?: string };
	gritTargetLanguage: "JavaScript" | "CSS";
	onGritQueryChange: (query: string) => void;
	onLanguageChange: (language: "JavaScript" | "CSS") => void;
}

export default function GritQLSearchTab({
	editorRef,
	code,
	gritQuery,
	gritQueryResults,
	gritTargetLanguage,
	onGritQueryChange,
	onLanguageChange,
}: Props) {
	const handleMatchClick = useCallback(
		(match: [number, number]) => {
			const view = editorRef.current?.view;
			if (!view) return;

			const [from, to] = spanInBytesToSpanInCodeUnits(match, code);

			view.dispatch({
				scrollIntoView: true,
				selection: EditorSelection.create([
					EditorSelection.range(from, to),
					EditorSelection.cursor(from),
				]),
			});
		},
		[editorRef, code],
	);

	return (
		<div className="gritql-panel">
			<div className="gritql-stats">
				<select
					className="gritql-select"
					value={gritTargetLanguage}
					onChange={(e) =>
						onLanguageChange(e.target.value as "JavaScript" | "CSS")
					}
				>
					<option value="JavaScript">JavaScript</option>
					<option value="CSS">CSS</option>
				</select>
				{gritQueryResults.error ? (
					<span className="gritql-error">Error: {gritQueryResults.error}</span>
				) : (
					<span>
						Matches:{" "}
						<span className="gritql-match-count">
							{gritQueryResults.matches.length}
						</span>
					</span>
				)}
			</div>

			<CodeMirror
				value={gritQuery}
				onChange={onGritQueryChange}
				placeholder="Enter GritQL query, e.g., `console.log($message)`"
				extensions={[]}
				autoFocus={true}
			/>

			{gritQueryResults.matches.length > 0 && (
				<ul className="gritql-match-list">
					{gritQueryResults.matches.map((match) => {
						const [from, to] = spanInBytesToSpanInCodeUnits(match, code);
						const lines = code.substring(0, from).split("\n");
						const lineNumber = lines.length;
						const snippet = code.substring(from, Math.min(to, from + 50));

						return (
							<li
								key={`${match[0]}-${match[1]}`}
								className="gritql-match-item"
								onClick={() => handleMatchClick(match)}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										handleMatchClick(match);
									}
								}}
							>
								<span className="gritql-match-line">Line {lineNumber}</span>
								<span className="gritql-match-snippet">{snippet}...</span>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
