import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export function GET() {
	const root = resolve(import.meta.dirname, "_metadata.json");
	// const json_file = new URL("_metadata.json", root);
	const schema = readFileSync(root, "utf8");
	return new Response(schema, {
		status: 200,
		headers: {
			"content-type": "application/json",
		},
	});
}
