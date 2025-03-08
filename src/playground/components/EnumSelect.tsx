import {
	type ChangeEventHandler,
	type ComponentProps,
	useCallback,
} from "react";

interface Props<T extends string> extends ComponentProps<"select"> {
	/** Map from the enum value to the label text. */
	options: Record<T, string>;
	/** The current value. */
	value: T;
	/** An event handler on the value changed. */
	onChangeValue: (value: T) => void;
}

/**
 * A type-safe wrapper over `<select>`.
 * The TypeScript compiler will check all variants of the enum are covered in `options`, so missing new options in the
 * playground will never happen.
 */
export default function EnumSelect<T extends string>({
	options,
	value,
	onChange,
	onChangeValue,
	...props
}: Props<T>) {
	const handleChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
		(e) => {
			onChange?.(e);
			onChangeValue(e.target.value as T);
		},
		[onChange, onChangeValue],
	);

	return (
		<select {...props} value={value} onChange={handleChange}>
			{(Object.entries(options) as [T, string][]).map(([value, label]) => (
				<option key={value} value={value}>
					{label}
				</option>
			))}
		</select>
	);
}
