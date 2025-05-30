import CodeMirror, { type BiomeExtension } from "@/playground/CodeMirror";

interface Props {
	code: string;
	extensions: BiomeExtension[];
}

export default function SemanticModelTab({ code, extensions }: Props) {
	return (
		<CodeMirror
			value={code}
			readOnly={true}
			extensions={extensions}
			placeholder="Semantic model not available"
			data-testid="semantic-model-tab"
		/>
	);
}
