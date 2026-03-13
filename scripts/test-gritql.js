/**
 * Quick script to test GritQL queries against Biome's WASM.
 *
 * Update the `query`, `code`, and `lang` variables below, then run:
 *   node scripts/test-gritql.js
 */

import { MemoryFileSystem, Workspace } from "@biomejs/wasm-nodejs";

// ─── Edit these ────────────────────────────────────────────────────────

const lang = "js"; // "js" | "css" | "json"

const query = "`console.log($...)`";

const code = `
console.log("debug");
console.error("real error");
console.log("another debug");
`;

// ────────────────────────────────────────────────────────────────────────

const encoder = new TextEncoder();
const ext = lang === "json" ? "json" : lang === "css" ? "css" : "tsx";
const defaultLanguage =
	lang === "json" ? "JSON" : lang === "css" ? "CSS" : "JavaScript";

const fs = new MemoryFileSystem();
const workspace = Workspace.withFileSystem(fs);
const { projectKey } = workspace.openProject({
	openUninitialized: true,
	path: "/",
});

const filename = `/test.${ext}`;
fs.insert(filename, encoder.encode(code));
workspace.openFile({
	projectKey,
	path: filename,
	content: { type: "fromServer" },
	persistNodeCache: true,
});

const { patternId } = workspace.parsePattern({
	pattern: query,
	defaultLanguage,
});

const results = workspace.searchPattern({
	path: filename,
	pattern: String(patternId),
	projectKey,
});

workspace.dropPattern({ pattern: String(patternId) });

const matches = results.matches || [];
console.log(`${matches.length} match(es)`);
for (const [start, end] of matches) {
	console.log(`  [${start}, ${end}] ${JSON.stringify(code.slice(start, end))}`);
}
