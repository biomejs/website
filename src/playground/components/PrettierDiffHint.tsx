import fastDiff from "fast-diff";
import type { JSX } from "react";
import type { PrettierOutput } from "@/playground/types.ts";

interface Props {
	prettier: PrettierOutput;
	biome: string;
}

function removeWhitespace(str: string): string {
	return str.replace(/\s/g, "");
}

function calculateHint(a: string, b: string): string | JSX.Element {
	if (a === b) {
		return <strong>Exact match</strong>;
	}
	if (removeWhitespace(a) === removeWhitespace(b)) {
		return <strong>Only whitespace differences</strong>;
	}

	const diff = fastDiff(a, b);
	let insertions = 0;
	let deletions = 0;

	for (const [type] of diff) {
		if (type === fastDiff.INSERT) {
			insertions++;
		} else if (type === fastDiff.DELETE) {
			deletions++;
		}
	}

	return (
		<>
			<span className="insertions">+{insertions}</span>{" "}
			<span className="deletions">-{deletions}</span>
		</>
	);
}

/** How far Biome's formatted output is from Prettier's. */
export default function PrettierDiffHint({ prettier, biome }: Props) {
	return (
		<span className="diff-hint" data-testid="prettier-diff-hint">
			{prettier.type === "SUCCESS" ? (
				calculateHint(prettier.code, biome)
			) : (
				<span className="error">Error</span>
			)}
		</span>
	);
}
