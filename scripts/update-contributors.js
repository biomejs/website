import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { PREAMBLE } from "./utils/constants.js";

const IMPORT_IMAGE = 'import { Image } from "astro:assets";';

/**
 * @typedef {Object} Contributor
 * @property {string} avatar_url
 * @property {string} login
 * @property {number} id
 * @property {number} contributions
 */

/**
 * @param {string} repository - The repository in format "owner/repo"
 * @param {string} [token]
 * @param {number} [pageInterval=300]
 * @param {number} [retryTimes=5]
 * @param {number} [retryInterval=1000]
 * @returns {Promise<Contributor[]>}
 */
async function getContributors(
	repository,
	token,
	pageInterval = 300,
	retryTimes = 5,
	retryInterval = 1000,
) {
	/**
	 * @type {Contributor[]}
	 */
	const contributors = [];
	const nextPageUrlRegEx = /<([^<>]+)>; rel="next"/;
	let link = `https://api.github.com/repos/${repository}/contributors`;
	while (link) {
		let retryLeft = retryTimes;
		let resp;
		while (retryLeft--) {
			resp = await fetch(link, {
				headers: {
					"User-Agent": "@biomejs",
					...(token && { Authorization: `token ${token}` }),
				},
			});
			if (resp.ok) {
				retryLeft = 0;
			} else if (retryLeft === 0 || resp.statusText === "rate limit exceeded") {
				throw new Error(
					`Cannot fetch ${link}\nStatus code: ${resp.status}\nStatus text: ${resp.statusText}`,
				);
			} else {
				await new Promise((resolve) => {
					setTimeout(() => {
						resolve();
					}, retryInterval);
				});
			}
		}
		contributors.push(...(await resp.json()));
		link = resp.headers.get("link")?.match(nextPageUrlRegEx)?.[1];
		if (link) {
			await new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, pageInterval);
			});
		}
	}
	return contributors;
}

/**
 * @param {Contributor[]} contributors
 * @returns {Contributor[]}
 */
function sortContributors(contributors) {
	return contributors
		.filter((contributor) => !contributor.login.endsWith("[bot]"))
		.sort(
			({ contributions: c1, id: id1 }, { contributions: c2, id: id2 }) =>
				c2 - c1 || id1 - id2,
		);
}

/**
 * Merges contributors from multiple repositories by summing contributions for the same user ID
 * @param {Contributor[][]} contributorsArrays - Array of contributor arrays from different repositories
 * @returns {Contributor[]}
 */
function mergeContributors(contributorsArrays) {
	/**
	 * @type {Map<number, Contributor>}
	 */
	const contributorsMap = new Map();

	for (const contributors of contributorsArrays) {
		for (const contributor of contributors) {
			const existing = contributorsMap.get(contributor.id);
			if (existing) {
				existing.contributions += contributor.contributions;
			} else {
				contributorsMap.set(contributor.id, { ...contributor });
			}
		}
	}

	return Array.from(contributorsMap.values());
}

/**
 * Fetches and merges contributors from all biomejs repositories
 * @param {string} [token]
 * @param {number} [pageInterval=300]
 * @param {number} [retryTimes=5]
 * @param {number} [retryInterval=1000]
 * @returns {Promise<Contributor[]>}
 */
async function getAllContributors(
	token,
	pageInterval = 300,
	retryTimes = 5,
	retryInterval = 1000,
) {
	const repositories = [
		"biomejs/biome",
		"biomejs/website",
		"biomejs/biome-vscode",
		"biomejs/biome-zed",
		"biomejs/biome-intellij",
	];

	const contributorsArrays = await Promise.all(
		repositories.map((repo) =>
			getContributors(repo, token, pageInterval, retryTimes, retryInterval),
		),
	);

	const mergedContributors = mergeContributors(contributorsArrays);
	return sortContributors(mergedContributors);
}

/**
 * @param {Contributor[]} contributors
 * @returns {string}
 */
function makeCommunityContent(contributors) {
	const contributorsPerRow = [5, 4, 6, 5, 3, 5, 4];
	let pointer = 0;
	return [
		"---",
		`// ${PREAMBLE}`,
		IMPORT_IMAGE,
		"---",
		"",
		contributorsPerRow
			.map((itemsPerRow) => {
				const row = [
					'<div class="contributor-row">',
					contributors
						.slice(pointer, pointer + itemsPerRow)
						.map(({ avatar_url, login }) =>
							[
								"  <Image",
								'    class="contributor-avatar"',
								`    src="${avatar_url}"`,
								`    alt="User ${login}"`,
								'    width="84"',
								'    height="84"',
								"  />",
							].join("\n"),
						)
						.join("\n"),
					"</div>",
				].join("\n");
				pointer += itemsPerRow;
				return row;
			})
			.join("\n"),
		"",
	].join("\n");
}

/**
 * @param {Contributor[]} contributors
 * @returns {string}
 */
function makeContributorsContent(contributors) {
	return [
		"---",
		`// ${PREAMBLE}`,
		IMPORT_IMAGE,
		"---",
		"",
		"<h2>Code Contributors</h2>",
		'<ul class="credits-people-list contributors">',
		contributors
			.map(({ login, avatar_url }) =>
				[
					"  <li>",
					`    <a href="https://github.com/biomejs/biome/commits?author=${login}">`,
					"      <Image",
					`        src="${avatar_url}"`,
					`        alt="User ${login}"`,
					'        width="57"',
					'        height="57"',
					"      />",
					"    </a>",
					"  </li>",
				].join("\n"),
			)
			.join("\n"),
		"</ul>",
		"",
	].join("\n");
}

/**
 * @returns {Promise<void>}
 */
async function main() {
	const root = fileURLToPath(
		new URL("../src/components/generated", import.meta.url),
	);
	const parsedResult = parseArgs({
		options: {
			token: {
				type: "string",
			},
		},
		args: process.argv.slice(2),
	});

	const token = parsedResult.values.token;
	const contributors = await getAllContributors(
		typeof token === "string" ? token : undefined,
	);
	await Promise.all([
		writeFile(
			join(root, "Community.astro"),
			makeCommunityContent(contributors),
			{
				encoding: "utf8",
			},
		),
		writeFile(
			join(root, "Contributors.astro"),
			makeContributorsContent(contributors),
			{
				encoding: "utf8",
			},
		),
	]);
}

await main();
