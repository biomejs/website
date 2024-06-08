import biomeIcon from "@/assets/svg/logomark.svg";
import { type MouseEvent, useCallback } from "react";

const longCommitHash = BIOME_VERSION.slice(10);
const shortCommitHash = longCommitHash.slice(0, 7);

function BiomeVersion() {
	const link = `https://github.com/biomejs/biome/tree/${longCommitHash}`;

	const handleClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
		e.stopPropagation();
	}, []);

	return (
		<a
			className="formatter-version"
			href={link}
			title="commit hash"
			onClick={handleClick}
		>
			{shortCommitHash}
		</a>
	);
}

export default function BiomeHeader() {
	return (
		<>
			<img alt="Biome logo" src={biomeIcon.src} />
			<span>
				Biome <BiomeVersion />
			</span>
		</>
	);
}
