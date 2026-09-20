import { romeAst as BiomeFormatterIr } from "lang-rome-formatter-ir";
import CodeMirror from "@/playground/CodeMirror";
import BiomeHeader from "@/playground/components/BiomeHeader";
import PrettierHeader from "@/playground/components/PrettierHeader";
import Resizable from "@/playground/components/Resizable";
import type { PrettierOutput } from "@/playground/types.ts";

interface Props {
	prettier: PrettierOutput;
	biome: string;
	comparePrettier: boolean;
	onComparePrettierChange: (compare: boolean) => void;
}

const formatterIrCodeMirrorExtension = [BiomeFormatterIr()];

/** Biome's formatter IR, optionally side by side with Prettier's (mirrors the output pane). */
export default function FormatterIrTab({
	biome,
	prettier,
	comparePrettier,
	onComparePrettierChange,
}: Props) {
	const biomePane = (
		<>
			<div className="playground-output-heading biome">
				<BiomeHeader />
			</div>
			<CodeMirror
				value={biome}
				extensions={formatterIrCodeMirrorExtension}
				readOnly={true}
				data-testid="biome-ir-output"
			/>
		</>
	);

	return (
		<div className="playground-ir">
			<div className="playground-output-toolbar">
				<label>
					<input
						type="checkbox"
						checked={comparePrettier}
						onChange={(event) => onComparePrettierChange(event.target.checked)}
					/>
					Compare Prettier
				</label>
			</div>
			<div
				className={`playground-code-output${comparePrettier ? " split" : ""}`}
			>
				{comparePrettier ? (
					<Resizable
						name="playground-biome-ir"
						direction="right"
						className="playground-output-pane"
						minimumSize={140}
					>
						{biomePane}
					</Resizable>
				) : (
					<div className="playground-output-pane">{biomePane}</div>
				)}
				{comparePrettier && (
					<div className="playground-output-pane">
						<div className="playground-output-heading prettier">
							<PrettierHeader />
						</div>
						<CodeMirror
							value={prettier.type === "SUCCESS" ? prettier.ir : prettier.stack}
							extensions={
								prettier.type === "SUCCESS"
									? formatterIrCodeMirrorExtension
									: []
							}
							readOnly={true}
							data-testid="prettier-ir-output"
						/>
					</div>
				)}
			</div>
		</div>
	);
}
