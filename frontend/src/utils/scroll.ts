/**
 * Useful utils to scroll up and down the page
 * @packageDocumentation
 */

export function scrollDown(): void {
	window.scrollTo({
		top: window.innerHeight,
		behavior: "smooth",
	});
}

/**
 * Get a scroll downer with some additional scorlling down
 * @param add number of extra pixels to scroll
 */
export function getScrollDownWithAdditional(add: number) {
	return (): void => {
		window.scrollTo({
			top: window.innerHeight + add,
			behavior: "smooth",
		});
	};
	
}

export function scrollUp(): void {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}