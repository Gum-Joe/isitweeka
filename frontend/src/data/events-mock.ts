/**
 * MOCK Events data
 * Replace with actual JSON response later
 */

import { EventData, EventTypes } from "../components/EventsList";

/** Colour for events that are "todo" and on the house calendar */
export const HOUSE_EVENT_PENDING_BG = "#752023";
export const HOUSE_BEAUFORT = "#CC4545";
export const HOUSE_SEYMOUR = "#e8ae56";
export const HOUSE_HOWARD = "#4286BB";
export const HOUSE_TUDOR = "#5a9143";

const randomNumber = Math.random();

const CULTURE_WEEK_2024_EVENT_BRITE = "https://www.eventbrite.co.uk/e/kechb-culture-week-2024-tickets-918570989557?utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=listing&utm-source=cp&aff=isitweekasite";

export const KECHBEvents: EventData = {
	generatedAt: Date.now().toString(),
	events: [
		{
			eventType: "news",
			title: "IsItWeekA.com; Still Alive and Kicking!",
			description: "Incredibly, the jumbotron, events list, and donation tracker all still work!",
			backgroundColor: "#000",
			stats: [{ title: "Posted", value: "17 June 2024" }, { title: "By", value: "Madeline Hart" }]
		},
	],
};

export const KECHGEvents: EventData = {
	generatedAt: Date.now().toString(),
	events: [
	],
};