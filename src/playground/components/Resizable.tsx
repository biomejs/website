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

type ResizeHandler = {
	styleProperty: "height" | "width";
	resizingCursor: string;
	calculateSize: (container: HTMLDivElement, event: MouseEvent) => number;
	keyboardDelta: (key: string) => number;
};

const handlers: Record<Props["direction"], ResizeHandler> = {
	top: {
		resizingCursor: "row-resize",
		styleProperty: "height",
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
		styleProperty: "width",
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
		styleProperty: "width",
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

function getMaximumSize(
	container: HTMLDivElement,
	styleProperty: ResizeHandler["styleProperty"],
	minimumSize: number,
): number {
	const parent = container.parentElement;
	if (!parent) return Number.POSITIVE_INFINITY;

	const horizontal = styleProperty === "width";
	const parentSize = horizontal ? parent.clientWidth : parent.clientHeight;
	const minimumProperty = horizontal ? "minWidth" : "minHeight";
	let reservedSize = 0;

	for (const sibling of parent.children) {
		if (!(sibling instanceof HTMLElement) || sibling === container) continue;
		const style = getComputedStyle(sibling);
		if (style.display === "none" || style.position === "absolute") continue;

		const rectangle = sibling.getBoundingClientRect();
		const currentSize = horizontal ? rectangle.width : rectangle.height;
		const siblingMinimum = Number.parseFloat(style[minimumProperty]) || 0;
		const fixed =
			Number(style.flexGrow) === 0 && Number(style.flexShrink) === 0;
		reservedSize += fixed ? currentSize : siblingMinimum;
	}

	return Math.max(minimumSize, parentSize - reservedSize);
}

export default function Resizable({
	name,
	direction,
	className,
	minimumSize = DEFAULT_MINIMUM_SIZE,
	children,
}: Props) {
	const sizeStore = useMemo(() => createLocalStorage(`${name}-size`), [name]);
	const [isResizing, setIsResizing] = useState(false);
	const [rawSize, setRawSize] = useState<number | undefined>(
		sizeStore.getNumber(),
	);
	const ref = useRef<HTMLDivElement>(null);
	const handler = handlers[direction];
	const size =
		rawSize === undefined ? undefined : Math.max(minimumSize, rawSize);
	const [maximumSize, setMaximumSize] = useState<number>();

	const setSize = useCallback(
		(nextSize: number) => {
			const maximum = ref.current
				? getMaximumSize(ref.current, handler.styleProperty, minimumSize)
				: Number.POSITIVE_INFINITY;
			const constrainedSize = Math.min(
				maximum,
				Math.max(minimumSize, nextSize),
			);
			setRawSize(constrainedSize);
			sizeStore.set(constrainedSize);
		},
		[handler.styleProperty, minimumSize, sizeStore],
	);

	const resetSize = useCallback(() => {
		sizeStore.clear();
		setRawSize(undefined);
		setIsResizing(false);
	}, [sizeStore]);

	useEffect(() => {
		if (!isResizing) return;
		document.body.style.cursor = handler.resizingCursor;
		return () => {
			document.body.style.removeProperty("cursor");
		};
	}, [handler.resizingCursor, isResizing]);

	useEffect(() => {
		const container = ref.current;
		const parent = container?.parentElement;
		if (!container || !parent) return;

		const updateConstraints = () => {
			const nextMaximum = getMaximumSize(
				container,
				handler.styleProperty,
				minimumSize,
			);
			setMaximumSize(nextMaximum);
			if (rawSize !== undefined) {
				const constrainedSize = Math.min(
					nextMaximum,
					Math.max(minimumSize, rawSize),
				);
				if (constrainedSize !== rawSize) {
					setRawSize(constrainedSize);
					sizeStore.set(constrainedSize);
				}
			}
		};

		updateConstraints();
		const resizeObserver = new ResizeObserver(updateConstraints);
		resizeObserver.observe(parent);
		const mutationObserver = new MutationObserver(updateConstraints);
		mutationObserver.observe(parent, { childList: true });
		return () => {
			resizeObserver.disconnect();
			mutationObserver.disconnect();
		};
	}, [handler.styleProperty, minimumSize, rawSize, sizeStore]);

	return (
		<div
			ref={ref}
			className={className}
			data-resize-direction={direction}
			data-resizing={isResizing || undefined}
			style={{
				[handler.styleProperty]: size,
				[handler.styleProperty === "width" ? "minWidth" : "minHeight"]:
					minimumSize,
				flexBasis:
					handler.styleProperty === "width" && size !== undefined
						? size
						: undefined,
				flexGrow: size === undefined ? undefined : 0,
				flexShrink: size === undefined ? undefined : 0,
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
				aria-valuenow={Math.round(size ?? minimumSize)}
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
					const currentSize =
						rawSize ??
						(direction === "top"
							? ref.current?.clientHeight
							: ref.current?.clientWidth) ??
						minimumSize;
					setSize(currentSize + delta);
				}}
			/>
		</div>
	);
}
