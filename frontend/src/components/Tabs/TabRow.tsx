import React from "react";

export const TabRow: React.FunctionComponent = (props) => {
	return (
		<div className="r-tab-row">
			{props.children}
		</div>
	);
};