/**
 * @param {string} key
 * @returns {string | true | null}
 */
export function argv(key) {
	if (process.argv.includes(`--${key}`)) {
		return true;
	}
	const value = process.argv.find((element) => element.startsWith(`--${key}=`));
	if (!value) {
		return null;
	}
	return value.replace(`--${key}=`, "");
}
