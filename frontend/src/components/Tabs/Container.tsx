import React from "react";
import { TabRow } from "./TabRow";
import { Tabs } from "./interfaces";
import { Tab } from "./Tab";

interface Props {
	tabs: Tabs;
	initialTab?: number;
}

export const TabContainer: React.FunctionComponent<Props> = (props) => {
	const [activeTab, setTab] = React.useState(props.initialTab || 0);
	return (
		<div className="r-tab-container">
			<TabRow>
				{props.tabs.map(({ tab }, index) => {
					return (
						<Tab key={index} onClick={() => setTab(index)} active={activeTab === index}>{tab}</Tab>
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