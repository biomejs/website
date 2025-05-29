import { getLatestVersion } from "@biomejs/version-utils";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url);

	const prerelease = url.searchParams.get("prerelease") === "true";
	const wantedFormat = request.headers.get("Accept") || "application/json";
	const version = await getLatestVersion(prerelease ? "nightly" : "stable");

	if (wantedFormat === "text/plain") {
		return new Response(version, {
			headers: {
				"Content-Type": "text/plain",
			},
		});
	}

	return new Response(JSON.stringify({ version: version }), {
		headers: {
			"Content-Type": "application/json",
		},
	});
};
