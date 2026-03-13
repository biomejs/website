import type { Diagnostic, GritTargetLanguage } from "@biomejs/wasm-web";
import type { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import type { Dispatch, RefObject, SetStateAction } from "react";
import Tabs from "@/playground/components/Tabs";
import DiagnosticsConsoleTab from "@/playground/tabs/DiagnosticsConsoleTab";
import DiagnosticsListTab from "@/playground/tabs/DiagnosticsListTab";
import GritQLSearchTab from "@/playground/tabs/GritQLSearchTab";
import type { PlaygroundPane, PlaygroundState } from "@/playground/types.ts";

interface Props {
	editorRef: RefObject<ReactCodeMirrorRef | null>;
	console: string;
	diagnostics: Diagnostic[];
	code: string;
	gritQuery: string;
	gritQueryResults: { matches: [number, number][]; error: string | undefined };
	gritTargetLanguage: GritTargetLanguage;
	onGritQueryChange: (query: string) => void;
	onLanguageChange: (language: GritTargetLanguage) => void;
	setPlaygroundState: Dispatch<SetStateAction<PlaygroundState>>;
	currentPane: PlaygroundPane;
}

export default function DiagnosticsPane({
	editorRef,
	diagnostics,
	console,
	code,
	gritQuery,
	gritQueryResults,
	gritTargetLanguage,
	onGritQueryChange,
	onLanguageChange,
	setPlaygroundState,
	currentPane,
}: Props) {
	const onSelect = (tab: PlaygroundPane) => {
		setPlaygroundState((state) => ({
			...state,
			pane: tab,
		}));
	};

	return (
		<Tabs
			className="diagnostics-tabs"
			selectedTab={currentPane}
			onSelect={onSelect}
			tabs={[
				{
					key: "Diagnostics",
					title: "Diagnostics",
					children: (
						<DiagnosticsListTab
							editorRef={editorRef}
							diagnostics={diagnostics}
							code={code}
						/>
					),
				},
				{
					key: "Console",
					title: "Console",
					children: <DiagnosticsConsoleTab console={console} />,
				},
				{
					key: "GritQL",
					title: "GritQL",
					children: (
						<GritQLSearchTab
							editorRef={editorRef}
							code={code}
							gritQuery={gritQuery}
							gritQueryResults={gritQueryResults}
							gritTargetLanguage={gritTargetLanguage}
							onGritQueryChange={onGritQueryChange}
							onLanguageChange={onLanguageChange}
						/>
					),
				},
			]}
		/>
	);
}
