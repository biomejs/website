import { getLatestVersion } from "@biomejs/version-utils";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
	const version = await getLatestVersion("stable");

	return new Response(JSON.stringify({ version: version }), {
		headers: {
			"Content-Type": "application/json",
		},
	});
};
