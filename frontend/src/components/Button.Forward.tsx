import React from "react";

interface ButtonProps {
	buttonType?: "fill" | "underline";
	light?: boolean;
}

const Button = (props: React.ButtonHTMLAttributes<any> & ButtonProps) => {
	if (props?.buttonType === "fill") {
		return (
			<button {...props} className="events-button-2" data-light={props.light}>
				<span>{props.children}</span>
			</button>
		);
	} else {
		return (
			<button {...props} className="forward" data-light={props.light}>
				<span>{props.children}</span>
			</button>
		);
	}
	
};

Button.displayName = "Button.Forward";

export default Button;