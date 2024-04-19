import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const WASM_PATH = resolve("../../../../biome/packages/@biomejs/wasm-web");
const SKIP_WASM_BUILD_FILE_PATH = resolve("../../../../skip_wasm_build");
// https://answers.netlify.com/t/cache-deploys-in-netlify/84740/6
const CACHE_BASE_PATH = "/opt/build/cache/wasm";
const CACHE_META_NAME = "cachemeta.json";
const SUBMODULE_COMMIT_ID = getSubmoduleCommitId();
const CACHE_STORE_PATH = join(CACHE_BASE_PATH, SUBMODULE_COMMIT_ID);
const CACHE_META_PATH = join(CACHE_BASE_PATH, CACHE_META_NAME);

export const onPreBuild = async () => {
	console.log("Started restoring WASM cache");
	console.log(`WASM path: ${WASM_PATH}`);
	console.log(`Cache store path: ${CACHE_STORE_PATH}`);

	if (!existsSync(CACHE_STORE_PATH)) {
		console.log("WASM cache is not found");
		return;
	}

	try {
		execSync(
			`cp -afT "${join(CACHE_STORE_PATH, basename(WASM_PATH))}" "${WASM_PATH}"`,
		);
		execSync(`touch ${SKIP_WASM_BUILD_FILE_PATH}`);
		console.log("Finished restoring WASM cache");
	} catch {
		console.log("Failed restoring WASM cache");
	}
};

export const onPostBuild = async () => {
	console.log("Started storing WASM cache");
	console.log(`WASM path: ${WASM_PATH}`);
	console.log(`Cache store path: ${CACHE_STORE_PATH}`);
	console.log(`Cache meta path: ${CACHE_META_PATH}`);

	// Get cache meta (expiration info)
	let cacheMeta = {};
	try {
		cacheMeta = JSON.parse(
			await readFile(CACHE_META_PATH, { encoding: "utf8" }),
		);
	} catch {}

	// Delete expired caches
	const now = Date.now();
	for (const [path, expiration] of Object.entries(cacheMeta)) {
		if (expiration > now) {
			continue;
		}
		delete cacheMeta[path];
		await rm(path, { recursive: true, force: true });
	}

	// Update current build cache expiration time (now + 30 days)
	cacheMeta[CACHE_STORE_PATH] = now + 30 * 24 * 3600 * 1000;

	const cacheMetaString = JSON.stringify(cacheMeta, undefined, 2);

	// Save cache meta and cache build
	try {
		await mkdir(CACHE_STORE_PATH, { recursive: true });
		await writeFile(CACHE_META_PATH, cacheMetaString, {
			encoding: "utf8",
		});
		console.log("Stored cache meta:");
		console.log(cacheMetaString);
		execSync(`cp -au "${WASM_PATH}" "${CACHE_STORE_PATH}"`);
		console.log("Finished storing WASM cache");
	} catch {
		console.log("Failed storing WASM cache");
	}
};

function resolve(path) {
	return fileURLToPath(new URL(path, import.meta.url));
}

function getSubmoduleCommitId() {
	return execSync("git ls-files -s biome | cut -d ' ' -f 2").toString().trim();
}
