import CodeMirror, { type BiomeExtension } from "@/playground/CodeMirror";
import Collapsible from "@/playground/Collapsible";
import BiomeHeader from "@/playground/components/BiomeHeader";
import PrettierDiffHint from "@/playground/components/PrettierDiffHint";
import PrettierHeader from "@/playground/components/PrettierHeader";
import type { PrettierOutput } from "@/playground/types.ts";

interface Props {
	prettier: PrettierOutput;
	biome: string;
	extensions: BiomeExtension[];
}

export default function FormatterCodeTab({
	biome,
	prettier,
	extensions,
}: Props) {
	return (
		<>
			<Collapsible className="biome" heading={<BiomeHeader />}>
				<CodeMirror
					value={biome}
					extensions={extensions}
					placeholder="Biome Output"
					readOnly={true}
					data-testid="biome-output"
				/>
			</Collapsible>
			<Collapsible
				className="prettier"
				heading={
					<>
						<PrettierHeader />
						<PrettierDiffHint prettier={prettier} biome={biome} />
					</>
				}
			>
				{prettier.type === "ERROR" ? (
					<CodeMirror
						value={prettier.stack}
						placeholder="Prettier Error"
						readOnly={true}
						data-testid="prettier-output"
					/>
				) : (
					<CodeMirror
						value={prettier.code}
						extensions={extensions}
						placeholder="Prettier Output"
						readOnly={true}
						data-testid="prettier-output"
					/>
				)}
			</Collapsible>
		</>
	);
}
