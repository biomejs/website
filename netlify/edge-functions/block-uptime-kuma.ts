import type { Config, Context } from "@netlify/edge-functions";

export default async (request: Request, _context: Context) => {
	// This is the regular expression that matches the Kuma uptime
	// monitor header. It is a case-insensitive match below (matching
	// any case of the string).

	const regex = /uptime-kuma/i;

	const userAgent = request.headers.get("user-agent");

	// If the header matches the regex, block it with a 403 status.
	// This will be a very small response that uses little bandwidth,
	// which will reduce the bandwidth used by the monitor.

	if (userAgent && regex.test(userAgent)) {
		return new Response("forbidden", { status: 403 });
	}

	// If not a match, continue the request chain (including any other
	// edge functions that could match).

	return;
};

// The excludedPath below is so that the edge function does not run for
// non-HTML paths. Blocking the HTML requests will automatically prevent
// the other assest from being requested. The goal of excludedPath is to
// limit how often the edge function is actually run.
export const config: Config = {
	path: "/*",
	excludedPath: [
		"/*.aspx",
		"/*.avif",
		"/*.babylon",
		"/*.bak",
		"/*.cgi",
		"/*.com",
		"/*.css",
		"/*.ds",
		"/*.env",
		"/*.gif",
		"/*.gz",
		"/*.ico",
		"/*.ini",
		"/*.jpeg",
		"/*.jpg",
		"/*.js",
		"/*.json",
		"/*.jsp",
		"/*.log",
		"/*.m4a",
		"/*.map",
		"/*.md",
		"/*.mjs",
		"/*.mp3",
		"/*.mp4",
		"/*.ogg",
		"/*.otf",
		"/*.pdf",
		"/*.php",
		"/*.png",
		"/*.rar",
		"/*.sh",
		"/*.sql",
		"/*.svg",
		"/*.ttf",
		"/*.txt",
		"/*.wasm",
		"/*.wav",
		"/*.webm",
		"/*.webmanifest",
		"/*.webp",
		"/*.woff",
		"/*.woff2",
		"/*.xml",
		"/*.xsd",
		"/*.yaml",
		"/*.yml",
		"/*.zip",
	],
};
