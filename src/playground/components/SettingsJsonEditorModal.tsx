import type { Configuration } from "@biomejs/wasm-web";
import { json } from "@codemirror/lang-json";
import { useEffect, useRef, useState } from "react";
import {
	buildBiomeConfiguration,
	parseBiomeConfiguration,
} from "@/playground/buildBiomeConfiguration";
import CodeMirror from "@/playground/CodeMirror";
import type { PlaygroundSettings } from "@/playground/types";

interface SettingsJsonEditorModalProps {
	isOpen: boolean;
	settings: PlaygroundSettings;
	onApply: (settings: PlaygroundSettings) => void;
	onClose: () => void;
}

function createEditableConfiguration(
	settings: PlaygroundSettings,
): Configuration {
	return {
		$schema: "https://biomejs.dev/schemas/<version>/schema.json",
		...buildBiomeConfiguration(settings),
	};
}

export default function SettingsJsonEditorModal({
	isOpen,
	settings,
	onApply,
	onClose,
}: SettingsJsonEditorModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [jsonValue, setJsonValue] = useState("");
	const [jsonError, setJsonError] = useState<string | null>(null);
	const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

	useEffect(() => {
		if (isOpen) {
			setJsonValue(
				JSON.stringify(createEditableConfiguration(settings), null, 2),
			);
			setJsonError(null);
			setCopyStatus("idle");
		}
	}, [isOpen, settings]);

	useEffect(() => {
		if (!isOpen) {
			if (dialogRef.current?.open) {
				dialogRef.current.close();
			}
			return;
		}

		const dialog = dialogRef.current;
		if (dialog === null || dialog.open) {
			return;
		}

		dialog.showModal();
	}, [isOpen]);

	useEffect(() => {
		if (copyStatus !== "copied") {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			setCopyStatus("idle");
		}, 2000);

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [copyStatus]);

	async function copyJsonSettings() {
		await navigator.clipboard.writeText(jsonValue);
		setCopyStatus("copied");
	}

	function applyJsonSettings() {
		try {
			const parsed = JSON.parse(jsonValue) as Configuration;
			onApply(parseBiomeConfiguration(parsed));
			onClose();
		} catch (error) {
			setJsonError(
				error instanceof Error ? error.message : "Invalid JSON settings.",
			);
		}
	}

	return (
		<dialog
			ref={dialogRef}
			className="settings-json-modal"
			aria-labelledby="settings-json-modal-title"
			onClick={(event) => {
				if (event.target === event.currentTarget) {
					onClose();
				}
			}}
			onKeyDown={(event) => {
				if (
					event.target === event.currentTarget &&
					(event.key === "Enter" || event.key === " ")
				) {
					event.preventDefault();
					onClose();
				}
			}}
			onClose={onClose}
			onCancel={(event) => {
				event.preventDefault();
				onClose();
			}}
		>
			<form
				method="dialog"
				className="settings-json-modal__content"
				onSubmit={(event) => {
					event.preventDefault();
				}}
			>
				<div className="settings-json-modal__header">
					<h3 id="settings-json-modal-title">
						Effective Playground configuration
					</h3>
					<button
						type="button"
						className="settings-json-modal__close"
						onClick={onClose}
						aria-label="Close JSON editor"
					>
						<span aria-hidden={true}>×</span>
					</button>
				</div>
				<div className="settings-json-modal__subheader">
					<span>biome.json</span>
					<span className="settings-json-modal__hint">
						Update the $schema version manually.
					</span>
				</div>
				<CodeMirror
					className="settings-json-modal__editor"
					value={jsonValue}
					extensions={[json()]}
					onChange={(value) => {
						setJsonValue(value);
						if (jsonError !== null) {
							setJsonError(null);
						}
					}}
					placeholder="{}"
					autoFocus={true}
				/>
				{jsonError && <p className="settings-json-modal__error">{jsonError}</p>}
				<div className="settings-json-modal__actions">
					<button type="button" onClick={copyJsonSettings}>
						{copyStatus === "copied" ? "Copied" : "Copy"}
					</button>
					<button type="button" onClick={applyJsonSettings}>
						Apply to Playground
					</button>
				</div>
			</form>
		</dialog>
	);
}
