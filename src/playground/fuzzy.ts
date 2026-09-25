export interface FuzzyMatch {
	score: number;
	/** Indices of the characters in the target that matched the query. */
	indices: number[];
}

const BOUNDARY_BONUS = 6;
const CONSECUTIVE_BONUS = 5;
/** Per target character skipped between two matched characters. */
const GAP_PENALTY = 1;

/** Whether a word starts at `index`: the first character, a camelCase hump, or after a separator. */
function isWordStart(target: string, index: number): boolean {
	if (index === 0) {
		return true;
	}
	const prev = target.charAt(index - 1);
	const current = target.charAt(index);
	if (!/[a-z0-9]/i.test(prev)) {
		return true;
	}
	if (/[A-Z]/.test(current) && /[a-z0-9]/.test(prev)) {
		return true;
	}
	return /[0-9]/.test(current) !== /[0-9]/.test(prev);
}

/**
 * Matches `query` against `target` as a case-insensitive subsequence.
 *
 * Returns `null` if the query doesn't match. Otherwise, returns the best
 * alignment, favouring matches that start words (`nak` → `noAccessKey`),
 * runs of consecutive characters, and short gaps between matched characters.
 */
export function fuzzyMatch(query: string, target: string): FuzzyMatch | null {
	const q = query.toLowerCase();
	const t = target.toLowerCase();
	const n = q.length;
	const m = t.length;
	if (n === 0) {
		return { score: 0, indices: [] };
	}
	if (n > m) {
		return null;
	}

	// For each query character `i`, `scores[j]` is the best score with it
	// matched at `target[j]`, and `from[i][j]` is where the previous query
	// character was matched in that alignment.
	const none = Number.NEGATIVE_INFINITY;
	let scores: number[] = [];
	const from: number[][] = [];
	for (let i = 0; i < n; i++) {
		const prev = scores;
		const row = new Array<number>(m).fill(none);
		const back = new Array<number>(m).fill(-1);
		// Best score in `prev` strictly before `j - 1`, less the gap penalty for
		// the characters skipped between it and `j`.
		let bestBefore = none;
		let bestBeforeIndex = -1;
		for (let j = i; j < m; j++) {
			bestBefore -= GAP_PENALTY;
			const before = (prev[j - 2] ?? none) - GAP_PENALTY;
			if (before > bestBefore) {
				bestBefore = before;
				bestBeforeIndex = j - 2;
			}
			if (q.charAt(i) !== t.charAt(j)) {
				continue;
			}
			const charScore = 1 + (isWordStart(target, j) ? BOUNDARY_BONUS : 0);
			if (i === 0) {
				row[j] = charScore;
				continue;
			}
			const consecutive = (prev[j - 1] ?? none) + CONSECUTIVE_BONUS;
			if (consecutive >= bestBefore) {
				row[j] = charScore + consecutive;
				back[j] = j - 1;
			} else {
				row[j] = charScore + bestBefore;
				back[j] = bestBeforeIndex;
			}
		}
		scores = row;
		from.push(back);
	}

	let end = -1;
	let best = none;
	scores.forEach((score, j) => {
		if (score > best) {
			best = score;
			end = j;
		}
	});
	if (end === -1) {
		return null;
	}

	const indices = new Array<number>(n);
	for (let i = n - 1, j = end; i >= 0; i--) {
		indices[i] = j;
		j = from[i]?.[j] ?? -1;
	}
	return { score: best, indices };
}
