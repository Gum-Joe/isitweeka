import React from "react";

export default (props: React.ButtonHTMLAttributes<any>) => {
	return (
		<button {...props} className="forward" children={<span>{props.children}</span>} />
	);
};