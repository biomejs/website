import { Combobox } from "@base-ui/react/combobox";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronDown, X } from "lucide-react";
import { type ReactNode, useId, useMemo, useRef, useState } from "react";
import { fuzzyMatch } from "@/playground/fuzzy.ts";
import { useWindowSize } from "@/playground/utils";

interface Group<T extends string> {
	/** The group name, or an empty string for the ranked search results. */
	value: string;
	items: T[];
}

interface Props<T extends string> {
	/** Visible label for the dropdown. */
	label: string;
	/** Rules grouped by name, in the shape of the generated `LINT_RULES`. */
	groups: Record<string, Record<string, T>>;
	value: T;
	onChangeValue: (value: T) => void;
	disabled?: boolean;
	/** Accessible name of the search box, also used as its placeholder. */
	searchLabel?: string;
}

/**
 * A dropdown for picking one rule (or preset) from a grouped list, with a
 * search box that fuzzy filters it. On mobile the list opens in a dialog.
 */
export default function RuleSelect<T extends string>({
	label,
	groups,
	value,
	onChangeValue,
	disabled,
	searchLabel = "Search rules",
}: Props<T>) {
	const { width } = useWindowSize();
	const mobile = width !== undefined && width <= 768;
	const labelId = useId();
	const valueId = useId();
	const searchRef = useRef<HTMLInputElement>(null);
	const dialogRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");

	const items: Group<T>[] = useMemo(
		() =>
			Object.entries(groups).map(([group, rules]) => ({
				value: group,
				items: Object.values(rules),
			})),
		[groups],
	);

	const groupOf = useMemo(
		() =>
			new Map(
				items.flatMap((group) =>
					group.items.map((rule) => [rule, group.value]),
				),
			),
		[items],
	);

	// Base UI filters in place and keeps the groups; searching instead ranks
	// every rule by how well it matches, in a single unlabelled group.
	const { filteredItems, matches } = useMemo(() => {
		const trimmed = query.trim();
		if (trimmed === "") {
			return { filteredItems: items, matches: undefined };
		}
		const ranked = items
			.flatMap((group) => group.items)
			.flatMap((rule) => {
				const match = fuzzyMatch(trimmed, rule);
				return match ? [{ rule, ...match }] : [];
			})
			.sort(
				(a, b) =>
					b.score - a.score ||
					a.rule.length - b.rule.length ||
					a.rule.localeCompare(b.rule),
			);
		return {
			filteredItems:
				ranked.length > 0
					? [{ value: "", items: ranked.map(({ rule }) => rule) }]
					: [],
			matches: new Map(ranked.map(({ rule, indices }) => [rule, indices])),
		};
	}, [items, query]);

	const handleOpenChange = (nextOpen: boolean) => {
		setOpen(nextOpen);
		if (!nextOpen) {
			setQuery("");
		}
	};

	const rootProps = {
		items,
		filteredItems,
		value,
		onValueChange: (next: T | null) => {
			if (next !== null) {
				onChangeValue(next);
			}
			handleOpenChange(false);
		},
		inputValue: query,
		onInputValueChange: setQuery,
		open,
		onOpenChange: handleOpenChange,
		autoHighlight: true,
		disabled,
	};

	const search = (
		<Combobox.Input
			ref={searchRef}
			className="rule-select-search"
			placeholder={`${searchLabel}…`}
			aria-label={searchLabel}
		/>
	);

	const list = (
		<>
			<Combobox.Empty className="rule-select-empty">No matches</Combobox.Empty>
			<Combobox.List className="rule-select-list" aria-label={label}>
				{(group: Group<T>) => (
					<Combobox.Group key={group.value} items={group.items}>
						{group.value && (
							<Combobox.GroupLabel className="rule-select-group-label">
								{group.value}
							</Combobox.GroupLabel>
						)}
						<Combobox.Collection>
							{(rule: T) => (
								<Combobox.Item
									key={rule}
									value={rule}
									className="rule-select-option"
								>
									<span className="rule-select-name">
										{highlight(rule, matches?.get(rule))}
									</span>
									{matches && (
										<span className="rule-select-option-group">
											{groupOf.get(rule)}
										</span>
									)}
								</Combobox.Item>
							)}
						</Combobox.Collection>
					</Combobox.Group>
				)}
			</Combobox.List>
		</>
	);

	const triggerContents = (
		<>
			<span id={valueId} className="rule-select-value">
				{value}
			</span>
			<ChevronDown
				className="playground-icon"
				strokeWidth={3}
				aria-hidden="true"
			/>
		</>
	);

	if (mobile) {
		return (
			<>
				<span id={labelId}>{label}</span>
				<Dialog.Root open={open} onOpenChange={handleOpenChange}>
					<Dialog.Trigger
						className="rule-select-trigger"
						disabled={disabled}
						aria-labelledby={`${labelId} ${valueId}`}
					>
						{triggerContents}
					</Dialog.Trigger>
					<Dialog.Portal>
						<Dialog.Backdrop className="rule-select-backdrop" />
						<Dialog.Popup
							ref={dialogRef}
							className="rule-select-dialog"
							// Start in the search box, except on touch, where focusing the
							// dialog itself keeps the on-screen keyboard out of the way.
							initialFocus={(openType) =>
								openType === "touch" ? dialogRef.current : searchRef.current
							}
						>
							<div className="rule-select-dialog-header">
								<Dialog.Title className="rule-select-dialog-title">
									{label}
								</Dialog.Title>
								<Dialog.Close
									className="rule-select-dialog-close"
									aria-label="Close"
								>
									<X className="playground-icon" aria-hidden="true" />
								</Dialog.Close>
							</div>
							<Combobox.Root {...rootProps} inline>
								{search}
								{list}
							</Combobox.Root>
						</Dialog.Popup>
					</Dialog.Portal>
				</Dialog.Root>
			</>
		);
	}

	return (
		<Combobox.Root {...rootProps}>
			<Combobox.Label>{label}</Combobox.Label>
			<Combobox.Trigger className="rule-select-trigger">
				{triggerContents}
			</Combobox.Trigger>
			<Combobox.Portal>
				<Combobox.Positioner
					className="rule-select-positioner"
					align="start"
					sideOffset={4}
				>
					<Combobox.Popup className="rule-select-popup" aria-label={label}>
						{search}
						{list}
					</Combobox.Popup>
				</Combobox.Positioner>
			</Combobox.Portal>
		</Combobox.Root>
	);
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
