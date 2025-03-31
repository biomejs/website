import CodeMirror, { type BiomeExtension } from "@/playground/CodeMirror";

interface Props {
	code: string;
	extensions: BiomeExtension[];
}

export default function AnalyzerFixesTab({ code, extensions }: Props) {
	return (
		<CodeMirror
			value={code}
			readOnly={true}
			extensions={extensions}
			placeholder="No fixes available"
			data-testid="analyzer-fixes"
		/>
	);
}
