import React from "react";

interface Props {
	onClick?: () => any;
	active?: boolean;
}

export const Tab: React.FunctionComponent<Props> = (props) => {
	return (
		<button className={`r-tab${props.active ? " active" : ""}`} onClick={props.onClick}>
			<span>{props.children}</span>
		</button>
	);
};