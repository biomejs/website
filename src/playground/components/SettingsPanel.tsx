import type { SettingsTabProps } from "@/playground/tabs/SettingsTab";
import SettingsTab from "@/playground/tabs/SettingsTab";

export default function SettingsPanel(props: SettingsTabProps) {
	return (
		<div className="settings-panel">
			<div className="fields">
				<SettingsTab {...props} />
			</div>
		</div>
	);
}
