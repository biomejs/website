import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createLocalStorage } from "@/playground/utils";

interface Props {
	name: string;
	direction: "top" | "right" | "left";
	className: string;
	minimumSize?: number;
	children: React.ReactNode;
}

const DEFAULT_MINIMUM_SIZE = 100;
const KEYBOARD_STEP = 10;

type Axis = "width" | "height";

type ResizeHandler = {
	axis: Axis;
	resizingCursor: string;
	calculateSize: (container: HTMLDivElement, event: MouseEvent) => number;
	keyboardDelta: (key: string) => number;
};

const handlers: Record<Props["direction"], ResizeHandler> = {
	top: {
		resizingCursor: "row-resize",
		axis: "height",
		calculateSize: (container, event) =>
			container.getBoundingClientRect().bottom - event.clientY,
		keyboardDelta: (key) =>
			key === "ArrowUp"
				? KEYBOARD_STEP
				: key === "ArrowDown"
					? -KEYBOARD_STEP
					: 0,
	},
	left: {
		resizingCursor: "col-resize",
		axis: "width",
		calculateSize: (container, event) =>
			container.getBoundingClientRect().right - event.clientX,
		keyboardDelta: (key) =>
			key === "ArrowLeft"
				? KEYBOARD_STEP
				: key === "ArrowRight"
					? -KEYBOARD_STEP
					: 0,
	},
	right: {
		resizingCursor: "col-resize",
		axis: "width",
		calculateSize: (container, event) =>
			event.clientX - container.getBoundingClientRect().left,
		keyboardDelta: (key) =>
			key === "ArrowRight"
				? KEYBOARD_STEP
				: key === "ArrowLeft"
					? -KEYBOARD_STEP
					: 0,
	},
};

function getParentSize(container: HTMLDivElement, axis: Axis): number {
	const parent = container.parentElement;
	if (!parent) return 0;
	return axis === "width" ? parent.clientWidth : parent.clientHeight;
}

function getCurrentSize(container: HTMLDivElement, axis: Axis): number {
	const rectangle = container.getBoundingClientRect();
	return axis === "width" ? rectangle.width : rectangle.height;
}

/** Largest size (px) that still leaves every sibling its minimum. */
function getMaximumSize(
	container: HTMLDivElement,
	axis: Axis,
	minimumSize: number,
): number {
	const parent = container.parentElement;
	if (!parent) return Number.POSITIVE_INFINITY;

	const horizontal = axis === "width";
	const parentSize = getParentSize(container, axis);
	const minimumProperty = horizontal ? "minWidth" : "minHeight";
	let reservedSize = 0;

	for (const sibling of parent.children) {
		if (!(sibling instanceof HTMLElement) || sibling === container) continue;
		const style = getComputedStyle(sibling);
		if (style.display === "none" || style.position === "absolute") continue;

		const siblingMinimum = Number.parseFloat(style[minimumProperty]) || 0;
		const fixed =
			Number(style.flexGrow) === 0 && Number(style.flexShrink) === 0;
		reservedSize += fixed
			? getCurrentSize(sibling as HTMLDivElement, axis)
			: siblingMinimum;
	}

	return Math.max(minimumSize, parentSize - reservedSize);
}

/**
 * A panel whose size along one axis can be dragged. The size is stored as a
 * fraction of the parent, so nested panels keep their ratio when an ancestor
 * (or the window) is resized. `minimumSize` is an absolute px floor.
 */
export default function Resizable({
	name,
	direction,
	className,
	minimumSize = DEFAULT_MINIMUM_SIZE,
	children,
}: Props) {
	const ratioStore = useMemo(() => createLocalStorage(`${name}-ratio`), [name]);
	const [isResizing, setIsResizing] = useState(false);
	const [ratio, setRatio] = useState<number | undefined>(() => {
		const stored = ratioStore.getNumber();
		return stored !== undefined && Number.isFinite(stored) && stored > 0
			? stored
			: undefined;
	});
	const [maximumSize, setMaximumSize] = useState<number>();
	const [currentSize, setCurrentSize] = useState<number>();
	const ref = useRef<HTMLDivElement>(null);
	const handler = handlers[direction];
	const { axis } = handler;

	// Sizes used to be stored in px under `<name>-size`; drop the stale key.
	useEffect(() => {
		createLocalStorage(`${name}-size`).clear();
	}, [name]);

	const storeRatio = useCallback(
		(nextRatio: number) => {
			setRatio(nextRatio);
			ratioStore.set(nextRatio);
		},
		[ratioStore],
	);

	const setSize = useCallback(
		(nextSize: number) => {
			const container = ref.current;
			if (!container) return;
			const parentSize = getParentSize(container, axis);
			if (parentSize <= 0) return;
			const maximum = getMaximumSize(container, axis, minimumSize);
			const constrainedSize = Math.min(
				maximum,
				Math.max(minimumSize, nextSize),
			);
			storeRatio(constrainedSize / parentSize);
		},
		[axis, minimumSize, storeRatio],
	);

	const resetSize = useCallback(() => {
		ratioStore.clear();
		setRatio(undefined);
		setIsResizing(false);
	}, [ratioStore]);

	useEffect(() => {
		if (!isResizing) return;
		document.body.style.cursor = handler.resizingCursor;
		return () => {
			document.body.style.removeProperty("cursor");
		};
	}, [handler.resizingCursor, isResizing]);

	// Keep the limits (and the ratio, if it no longer fits) in sync with the
	// parent's size and siblings.
	useEffect(() => {
		const container = ref.current;
		const parent = container?.parentElement;
		if (!container || !parent) return;

		const updateConstraints = () => {
			const parentSize = getParentSize(container, axis);
			const nextMaximum = getMaximumSize(container, axis, minimumSize);
			setMaximumSize(nextMaximum);
			setCurrentSize(getCurrentSize(container, axis));
			if (ratio !== undefined && parentSize > 0) {
				const size = ratio * parentSize;
				if (size > nextMaximum) {
					storeRatio(nextMaximum / parentSize);
				}
			}
		};

		updateConstraints();
		const resizeObserver = new ResizeObserver(updateConstraints);
		resizeObserver.observe(parent);
		resizeObserver.observe(container);
		const mutationObserver = new MutationObserver(updateConstraints);
		mutationObserver.observe(parent, { childList: true });
		return () => {
			resizeObserver.disconnect();
			mutationObserver.disconnect();
		};
	}, [axis, minimumSize, ratio, storeRatio]);

	const minimumProperty = axis === "width" ? "minWidth" : "minHeight";
	const percentage = ratio === undefined ? undefined : `${ratio * 100}%`;

	return (
		<div
			ref={ref}
			className={className}
			data-resize-direction={direction}
			data-resizing={isResizing || undefined}
			style={{
				[minimumProperty]: minimumSize,
				[axis]: percentage,
				flexBasis: percentage,
				flexGrow: percentage === undefined ? undefined : 0,
				flexShrink: percentage === undefined ? undefined : 0,
			}}
		>
			{children}
			<hr
				className="playground-resize-handle"
				tabIndex={0}
				aria-label={`Resize ${name.replaceAll("-", " ")}`}
				aria-orientation={direction === "top" ? "horizontal" : "vertical"}
				aria-valuemin={minimumSize}
				aria-valuemax={maximumSize && Math.round(maximumSize)}
				aria-valuenow={Math.round(currentSize ?? minimumSize)}
				onPointerDown={(event) => {
					event.preventDefault();
					event.currentTarget.setPointerCapture(event.pointerId);
					setIsResizing(true);
				}}
				onPointerMove={(event) => {
					const container = ref.current;
					if (
						!container ||
						!event.currentTarget.hasPointerCapture(event.pointerId)
					) {
						return;
					}
					setSize(handler.calculateSize(container, event.nativeEvent));
				}}
				onPointerUp={(event) => {
					event.currentTarget.releasePointerCapture(event.pointerId);
					setIsResizing(false);
				}}
				onPointerCancel={() => setIsResizing(false)}
				onDoubleClick={resetSize}
				onContextMenu={(event) => {
					event.preventDefault();
					resetSize();
				}}
				onKeyDown={(event) => {
					const delta = handler.keyboardDelta(event.key);
					if (delta === 0) return;
					event.preventDefault();
					const container = ref.current;
					const size = container
						? getCurrentSize(container, axis)
						: (currentSize ?? minimumSize);
					setSize(size + delta);
				}}
			/>
		</div>
	);
}
