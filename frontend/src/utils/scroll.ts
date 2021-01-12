/**
 * Useful utils to scroll up and down the page
 * @packageDocumentation
 */

export function scrollDown(): void {
	window.scrollTo({
		top: window.innerHeight + 150,
		behavior: "smooth",
	});
}

export function scrollUp(): void {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}