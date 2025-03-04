import { classnames } from "@/playground/utils";
import type React from "react";
import type { PlaygroundTab } from "../types";

interface Tab<K> {
	key: K;
	title: React.ReactNode;
	visible?: boolean;
	children: React.ReactNode;
}

interface Props<K> {
	className?: string;
	selectedTab: string;
	onSelect: (key: K) => void;
	tabs: Tab<K>[];
}

export default function Tabs<K extends string = PlaygroundTab>({
	className,
	tabs,
	selectedTab,
	onSelect,
}: Props<K>) {
	return (
		<div className={className}>
			<ul className="react-tabs__tab-list" role="tablist">
				{tabs.map((tab) => {
					if (tab.visible === false) {
						return;
					}

					const isSelected = tab.key === selectedTab;

					function onClick() {
						if (!isSelected) {
							onSelect(tab.key);
						}
					}

					return (
						<li
							tabIndex={0}
							key={tab.key}
							id={`tab-${tab.key}`}
							className={classnames(
								"react-tabs__tab",
								isSelected && "react-tabs__tab--selected",
							)}
							// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: false positive?
							role="tab"
							aria-selected={isSelected}
							aria-disabled={isSelected}
							aria-controls={`tab-content-${tab.key}`}
							onClick={onClick}
							onKeyDown={onClick}
						>
							{tab.title}
						</li>
					);
				})}
			</ul>

			{tabs.map((tab) => {
				if (tab.visible === false) {
					return;
				}

				const isSelected = tab.key === selectedTab;

				return (
					<div
						key={tab.key}
						className={classnames(
							"react-tabs__tab-panel",
							isSelected && "react-tabs__tab-panel--selected",
						)}
						role="tabpanel"
						id={`tab-content-${tab.key}`}
						aria-labelledby={`tab-${tab.key}`}
					>
						{isSelected && tab.children}
					</div>
				);
			})}
		</div>
	);
}
