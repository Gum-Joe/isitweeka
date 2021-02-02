import React from "react";

const Button = (props: React.ButtonHTMLAttributes<any>) => {
	return (
		<button {...props} className="forward">
			<span>{props.children}</span>
		</button>
	);
};

Button.displayName = "Button.Back";

export default Button;
