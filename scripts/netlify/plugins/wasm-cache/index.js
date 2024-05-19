import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

// The path of the WASM artifacts. This is what we want to cache and reuse.
const WASM_PATH = resolve("../../../../biome/packages/@biomejs/wasm-web");

// Netlify will restore and backup all the files in /opt/build/cache in each deployment.
// https://answers.netlify.com/t/cache-deploys-in-netlify/84740/6
// We create a directory under this path for our dedicated WASM cache.
const CACHE_BASE_PATH = "/opt/build/cache/wasm";

// This is the name we choose for the cache meta file.
const CACHE_META_NAME = "cachemeta.json";

// This is the submodule commit ID of this deployment.
// We use it as the subpath in our WASM cache directory to discriminate WASM caches
// built from different submodules.
const SUBMODULE_COMMIT_ID = getSubmoduleCommitId();

// This is where the WASM cache from the current deployment will be restored and saved.
const CACHE_STORE_PATH = join(CACHE_BASE_PATH, SUBMODULE_COMMIT_ID);

// This is where the cache meta will be read and saved.
const CACHE_META_PATH = join(CACHE_BASE_PATH, CACHE_META_NAME);

// This hook runs before building.
export const onPreBuild = async () => {
	console.log("Started restoring WASM cache");
	console.log(`WASM path: ${WASM_PATH}`);
	console.log(`Cache store path: ${CACHE_STORE_PATH}`);

	// Return if no cache can be restored.
	if (!existsSync(CACHE_STORE_PATH)) {
		console.log("WASM cache is not found");
		return;
	}

	try {
		// Restore the WASM cache.
		execSync(
			`cp -afT "${join(CACHE_STORE_PATH, basename(WASM_PATH))}" "${WASM_PATH}"`,
		);
		console.log("Finished restoring WASM cache");
	} catch {
		// Otherwise we still build the WASM artifacts.
		console.log("Failed restoring WASM cache");
	}
};

// This hook runs after building.
export const onPostBuild = async () => {
	console.log("Started storing WASM cache");
	console.log(`WASM path: ${WASM_PATH}`);
	console.log(`Cache store path: ${CACHE_STORE_PATH}`);
	console.log(`Cache meta path: ${CACHE_META_PATH}`);

	// Cache meta saves the information of the cached WASM
	// artifacts paths and their expiration time. It is a
	// JavaScript object, with the paths as the keys, and
	// their expiration time (Unix epoch time) in milliseconds
	// as the values.

	// The object is defined by ourselves. We can modify the
	// structure in the future if we see fit.

	// Cache meta is stringified and saved in CACHE_META_PATH
	// where Netlify will restore and backup automatically
	// in each deployment.

	// In this post build hook. We first try to read the cache
	// meta file and deserialize the cache meta object from it.
	// If the deserialization fails, it may not exist or may be
	// malformed, so we initialize it as an empty new object.

	// Get cache meta (expiration info)
	let cacheMeta = {};
	try {
		cacheMeta = JSON.parse(
			await readFile(CACHE_META_PATH, { encoding: "utf8" }),
		);
	} catch {}

	// After the deserialization of the cache meta, we check the
	// entries and see if there're expired caches. We'll then
	// remove the expired caches from the cache meta and from
	// the filesystem.

	// Delete expired caches
	const now = Date.now();
	for (const [path, expiration] of Object.entries(cacheMeta)) {
		if (expiration > now) {
			continue;
		}
		delete cacheMeta[path];
		await rm(path, { recursive: true, force: true });
	}

	// Then, we update the meta of the WASM artifacts from the
	// current deployment to make it accessible for the next 3
	// days. The duration is chosen by us. We can adjust it
	// based on the storage limitation, if there're any.

	// Update current build cache expiration time (now + 3 days)
	cacheMeta[CACHE_STORE_PATH] = now + 3 * 24 * 3600 * 1000;

	// Finally, we save the updated cache meta and the cached
	// WASM artifacts back to the cache dir. And Netlify will
	// handle the rest for us.

	// Save the cache meta and WASM artifacts.
	const cacheMetaString = JSON.stringify(cacheMeta, undefined, 2);
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
