import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { argv } from "./utils/argv.js";
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
 * @param {string} [token]
 * @param {number} [pageInterval=300]
 * @param {number} [retryTimes=5]
 * @param {number} [retryInterval=1000]
 * @returns {Promise<Contributor[]>}
 */
async function getContributors(
	token,
	pageInterval = 300,
	retryTimes = 5,
	retryInterval = 1000,
) {
	const contributors = [];
	const nextPageUrlRegEx = /<([^<>]+)>; rel="next"/;
	let link = "https://api.github.com/repos/biomejs/biome/contributors";
	while (link) {
		let retryLeft = retryTimes;
		let resp = undefined;
		while (retryLeft--) {
			resp = await fetch(link, {
				headers: {
					"User-Agent": "@biomejs",
					...(token && { Authorization: `token ${token}` }),
				},
			});
			if (resp.ok && resp.status >= 200 && resp.status < 400) {
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
	return contributors
		.filter((contributor) => !contributor.login.endsWith("[bot]"))
		.sort(({ contributions: c1 }, { contributions: c2 }) => c2 - c1);
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
					'        width="150"',
					'        height="150"',
					"      />",
					`      <span>${login}</span>`,
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
	const root = fileURLToPath(new URL("../src/components", import.meta.url));
	const token = argv("token");
	const contributors = await getContributors(
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
