import React from "react";

export function useWindowDimensions() {
	const [width, setWidth] = React.useState(window.innerWidth);
	const [height, setHeight] = React.useState(window.innerHeight);

	const updateWidthAndHeight = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};

	React.useEffect(() => {
		window.addEventListener("resize", updateWidthAndHeight);
		return () => window.removeEventListener("resize", updateWidthAndHeight);
	});

	return {
		width,
		height,
	}
}
