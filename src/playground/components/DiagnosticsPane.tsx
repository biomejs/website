import type { Diagnostic } from "@biomejs/wasm-web";
import type { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { type RefObject, useState } from "react";
import Tabs from "@/playground/components/Tabs";
import DiagnosticsConsoleTab from "@/playground/tabs/DiagnosticsConsoleTab";
import DiagnosticsListTab from "@/playground/tabs/DiagnosticsListTab";
import GritQLSearchTab from "@/playground/tabs/GritQLSearchTab";

interface Props {
	editorRef: RefObject<ReactCodeMirrorRef | null>;
	console: string;
	diagnostics: Diagnostic[];
	code: string;
	gritQuery: string;
	gritQueryResults: { matches: [number, number][]; error?: string };
	gritTargetLanguage: "JavaScript" | "CSS";
	onGritQueryChange: (query: string) => void;
	onLanguageChange: (language: "JavaScript" | "CSS") => void;
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
}: Props) {
	const [tab, setTab] = useState<"diagnostics" | "console" | "gritql">(
		"diagnostics",
	);

	return (
		<Tabs
			className="diagnostics-tabs"
			selectedTab={tab}
			onSelect={setTab}
			tabs={[
				{
					key: "diagnostics",
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
					key: "console",
					title: "Console",
					children: <DiagnosticsConsoleTab console={console} />,
				},
				{
					key: "gritql",
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
