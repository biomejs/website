import PlaygroundLoader from "@/playground/PlaygroundLoader";
import React from "react";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
	<React.StrictMode>
		<PlaygroundLoader />
	</React.StrictMode>,
);
