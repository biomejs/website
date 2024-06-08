import prettierIcon from "@/assets/svg/prettier-icon-dark.svg";
import { type MouseEvent, useCallback } from "react";

function PrettierVersion() {
	const link = `https://github.com/prettier/prettier/tree/${PRETTIER_VERSION}`;

	const handleClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
		e.stopPropagation();
	}, []);

	return (
		<a
			className="formatter-version"
			href={link}
			title="version"
			onClick={handleClick}
		>
			{PRETTIER_VERSION}
		</a>
	);
}

export default function PrettierHeader() {
	return (
		<>
			<img alt="Prettier logo" src={prettierIcon.src} />
			<span>
				Prettier <PrettierVersion />
			</span>
		</>
	);
}
