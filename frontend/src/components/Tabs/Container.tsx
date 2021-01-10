import React from "react";
import { TabRow } from "./TabRow";
import { Tabs } from "./interfaces";
import { Tab } from "./Tab";

interface Props {
	tabs: Tabs;
	initialTab?: number;
	/**
	 * Executed after a tab has changed.
	 * @param tab Name of tab provided in `props.tabs`
	 * @param index Index of tab
	 */
	onTabChange?: (tab: string, index: number) => void;
}

export const TabContainer: React.FunctionComponent<Props> = (props) => {
	const [activeTab, setTab] = React.useState(props.initialTab || 0);

	/**
	 * Used to execute `props.onTabChange` on the click of a tab
	 */
	function afterTabChange(tab: string, index: number) {
		if (typeof props.onTabChange !== "undefined") {
			props.onTabChange(tab, index);
		}
	}

	return (
		<div className="r-tab-container">
			<TabRow>
				{props.tabs.map(({ tab }, index) => {
					return (
						<Tab key={index} onClick={() => { setTab(index); afterTabChange(tab, index); }} active={activeTab === index}>{tab}</Tab>
					);
				})}
			</TabRow>
			<div>
				{props.tabs.map(({ component }, index) => {
					return index === activeTab ? (
						<div key={index}>
							{component}
						</div>
					) : null;
				})}
			</div>
		</div>
	);
};

