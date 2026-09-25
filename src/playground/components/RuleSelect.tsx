import { ChevronDown } from "lucide-react";
import {
	type KeyboardEvent,
	type ReactNode,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import { fuzzyMatch } from "@/playground/fuzzy.ts";
import { classnames } from "@/playground/utils";

interface Option<T extends string> {
	group: string;
	value: T;
}

interface Result<T extends string> extends Option<T> {
	/** Matched character indices in `value`. Absent when not searching. */
	indices?: number[];
}

interface Props<T extends string> {
	id?: string;
	/** Rules grouped by name, in the shape of the generated `LINT_RULES`. */
	groups: Record<string, Record<string, T>>;
	value: T;
	onChangeValue: (value: T) => void;
	disabled?: boolean;
	"aria-describedby"?: string;
	/** Accessible name of the search box, also used as its placeholder. */
	searchLabel?: string;
}

const POPOVER_WIDTH = 300;
const POPOVER_GAP = 4;
const VIEWPORT_MARGIN = 8;

/**
 * A dropdown for picking one rule (or preset) from a grouped list. It opens a
 * popover with a search box that fuzzy filters the list.
 */
export default function RuleSelect<T extends string>({
	id,
	groups,
	value,
	onChangeValue,
	disabled,
	"aria-describedby": ariaDescribedBy,
	searchLabel = "Search rules",
}: Props<T>) {
	const popoverId = useId();
	const listId = useId();
	const triggerRef = useRef<HTMLButtonElement>(null);
	const popoverRef = useRef<HTMLDivElement>(null);
	const searchRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [activeIndex, setActiveIndex] = useState(0);

	const options = useMemo(
		() =>
			Object.entries(groups).flatMap(([group, rules]) =>
				Object.values(rules).map((value) => ({ group, value })),
			),
		[groups],
	);

	const results: Result<T>[] = useMemo(() => {
		const trimmed = query.trim();
		if (trimmed === "") {
			return options;
		}
		return options
			.flatMap((option) => {
				const match = fuzzyMatch(trimmed, option.value);
				return match ? [{ ...option, ...match }] : [];
			})
			.sort(
				(a, b) =>
					b.score - a.score ||
					a.value.length - b.value.length ||
					a.value.localeCompare(b.value),
			);
	}, [options, query]);

	const searching = query.trim() !== "";
	const optionId = (index: number) => `${listId}-option-${index}`;

	// The popover lives in the top layer, so place it next to the trigger by
	// hand, flipping above it when there isn't room below.
	useEffect(() => {
		const popover = popoverRef.current;
		const trigger = triggerRef.current;
		if (!open || !popover || !trigger) {
			return;
		}
		const place = () => {
			const rect = trigger.getBoundingClientRect();
			const width = Math.min(
				POPOVER_WIDTH,
				window.innerWidth - 2 * VIEWPORT_MARGIN,
			);
			const left = Math.min(
				Math.max(VIEWPORT_MARGIN, rect.left),
				window.innerWidth - width - VIEWPORT_MARGIN,
			);
			const below = window.innerHeight - rect.bottom - POPOVER_GAP;
			const above = rect.top - POPOVER_GAP;
			const flip = below < 240 && above > below;
			popover.style.width = `${width}px`;
			popover.style.left = `${left}px`;
			popover.style.maxHeight = `${(flip ? above : below) - VIEWPORT_MARGIN}px`;
			popover.style.top = flip ? "auto" : `${rect.bottom + POPOVER_GAP}px`;
			popover.style.bottom = flip
				? `${window.innerHeight - rect.top + POPOVER_GAP}px`
				: "auto";
		};
		place();
		window.addEventListener("resize", place);
		window.addEventListener("scroll", place, true);
		return () => {
			window.removeEventListener("resize", place);
			window.removeEventListener("scroll", place, true);
		};
	}, [open]);

	useEffect(() => {
		if (open) {
			document
				.getElementById(`${listId}-option-${activeIndex}`)
				?.scrollIntoView({ block: "nearest" });
		}
	}, [open, listId, activeIndex]);

	// Opening and light dismissal (clicking outside, Escape) are handled by the
	// browser; keep React's state in sync with it.
	useEffect(() => {
		const popover = popoverRef.current;
		if (!popover) {
			return;
		}
		const handleToggle = (event: Event) => {
			const opening = (event as ToggleEvent).newState === "open";
			setOpen(opening);
			if (opening) {
				searchRef.current?.focus();
			} else {
				setQuery("");
			}
		};
		popover.addEventListener("toggle", handleToggle);
		return () => popover.removeEventListener("toggle", handleToggle);
	}, []);

	const show = (initialQuery = "") => {
		setQuery(initialQuery);
		setActiveIndex(
			initialQuery === ""
				? Math.max(
						0,
						options.findIndex((option) => option.value === value),
					)
				: 0,
		);
		popoverRef.current?.showPopover();
	};

	const close = () => {
		popoverRef.current?.hidePopover();
		triggerRef.current?.focus();
	};

	const select = (option: Option<T> | undefined) => {
		if (!option) {
			return;
		}
		onChangeValue(option.value);
		close();
	};

	const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
		if (e.key === "ArrowDown" || e.key === "ArrowUp") {
			e.preventDefault();
			show();
		} else if (
			e.key.length === 1 &&
			e.key !== " " &&
			!e.ctrlKey &&
			!e.metaKey &&
			!e.altKey
		) {
			// Start typing on the closed dropdown to search straight away.
			e.preventDefault();
			show(e.key);
		}
	};

	const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		const last = results.length - 1;
		switch (e.key) {
			case "ArrowDown":
			case "ArrowUp": {
				e.preventDefault();
				if (last < 0) {
					return;
				}
				const step = e.key === "ArrowDown" ? 1 : -1;
				setActiveIndex((index) => (index + step + last + 1) % (last + 1));
				return;
			}
			case "PageDown":
			case "PageUp": {
				e.preventDefault();
				const step = e.key === "PageDown" ? 10 : -10;
				setActiveIndex((index) => Math.min(last, Math.max(0, index + step)));
				return;
			}
			case "Enter":
				e.preventDefault();
				select(results[activeIndex]);
				return;
			case "Escape":
				e.preventDefault();
				close();
				return;
			case "Tab":
				popoverRef.current?.hidePopover();
				return;
		}
	};

	const renderOption = (option: Result<T>, index: number) => (
		// biome-ignore lint/a11y/useFocusableInteractive: Focus stays in the search box, which points at the active option with `aria-activedescendant`.
		// biome-ignore lint/a11y/useKeyWithClickEvents: The search box handles the keyboard for the whole list.
		<div
			key={option.value}
			id={optionId(index)}
			role="option"
			aria-selected={option.value === value}
			className={classnames(
				"rule-select-option",
				index === activeIndex && "active",
			)}
			onMouseMove={() => setActiveIndex(index)}
			onClick={() => select(option)}
		>
			<span className="rule-select-name">
				{highlight(option.value, option.indices)}
			</span>
			{searching && <span className="rule-select-group">{option.group}</span>}
		</div>
	);

	return (
		<>
			<button
				ref={triggerRef}
				id={id}
				type="button"
				className="rule-select-trigger"
				popoverTarget={popoverId}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-describedby={ariaDescribedBy}
				disabled={disabled}
				onKeyDown={handleTriggerKeyDown}
				onClick={(e) => {
					// Let `popoverTarget` close an open popover, but open it
					// ourselves so the list starts at the current rule.
					if (!open) {
						e.preventDefault();
						show();
					}
				}}
			>
				<span className="rule-select-value">{value}</span>
				<ChevronDown
					className="playground-icon"
					strokeWidth={3}
					aria-hidden="true"
				/>
			</button>
			<div
				ref={popoverRef}
				id={popoverId}
				popover="auto"
				className="rule-select-popover"
			>
				<input
					ref={searchRef}
					type="text"
					className="rule-select-search"
					placeholder={`${searchLabel}…`}
					aria-label={searchLabel}
					role="combobox"
					aria-autocomplete="list"
					aria-expanded={open}
					aria-controls={listId}
					aria-activedescendant={
						open && results.length > 0 ? optionId(activeIndex) : undefined
					}
					autoComplete="off"
					spellCheck={false}
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
						setActiveIndex(0);
						listRef.current?.scrollTo({ top: 0 });
					}}
					onKeyDown={handleSearchKeyDown}
				/>
				<div
					ref={listRef}
					id={listId}
					role="listbox"
					className="rule-select-list"
					// Keep focus in the search box when clicking an option.
					onMouseDown={(e) => e.preventDefault()}
				>
					{open && results.length === 0 && (
						<div className="rule-select-empty">No matches</div>
					)}
					{open &&
						(searching
							? results.map(renderOption)
							: renderGroups(results, renderOption))}
				</div>
			</div>
		</>
	);
}

function renderGroups<T extends string>(
	options: Result<T>[],
	renderOption: (option: Result<T>, index: number) => ReactNode,
): ReactNode[] {
	const groups = new Map<string, ReactNode[]>();
	options.forEach((option, index) => {
		const rendered = groups.get(option.group) ?? [];
		rendered.push(renderOption(option, index));
		groups.set(option.group, rendered);
	});
	return [...groups].map(([group, rendered]) => (
		// biome-ignore lint/a11y/useSemanticElements: A `<fieldset>` isn't valid inside a listbox.
		<div key={group} role="group" aria-label={group}>
			<div className="rule-select-group-label" aria-hidden="true">
				{group}
			</div>
			{rendered}
		</div>
	));
}

function highlight(text: string, indices: number[] | undefined): ReactNode {
	if (!indices || indices.length === 0) {
		return text;
	}
	const matched = new Set(indices);
	const parts: ReactNode[] = [];
	let i = 0;
	while (i < text.length) {
		const isMatch = matched.has(i);
		let end = i;
		while (end < text.length && matched.has(end) === isMatch) {
			end++;
		}
		const part = text.slice(i, end);
		parts.push(isMatch ? <mark key={i}>{part}</mark> : part);
		i = end;
	}
	return parts;
}
