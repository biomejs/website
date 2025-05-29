import { getAllVersions } from "@biomejs/version-utils";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url);

	const includePrereleases = url.searchParams.get("prereleases") === "true";
	const wantedFormat = request.headers.get("Accept") || "application/json";
	const versions = (await getAllVersions(includePrereleases)) ?? [];

	if (wantedFormat === "text/plain") {
		return new Response(versions.join("\n"), {
			headers: {
				"Content-Type": "text/plain",
			},
		});
	}

	return new Response(JSON.stringify(versions), {
		headers: {
			"Content-Type": "application/json",
		},
	});
};
