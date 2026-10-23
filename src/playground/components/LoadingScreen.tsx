interface LoadingScreenProps {
	loading: boolean;
	onLoad: () => void;
}

export default function LoadingScreen({
	loading,
	onLoad,
}: LoadingScreenProps) {
	return (
		<div className="loading">
			{loading ? (
				<p role="status">Loading playground…</p>
			) : (
				<>
					<p>The playground runs Biome in your browser.</p>
					<button type="button" onClick={onLoad}>
						Load playground
					</button>
				</>
			)}
		</div>
	);
}
