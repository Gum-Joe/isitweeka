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
			description: "It might be lacking some content, it might seem a little empty, but the jumbotron, events list, and donation tracker all still work!",
			headerURL: "",
			backgroundColor: "#000",
			stats: [{ title: "Posted", value: "17 June 2024" }, { title: "By", value: "Madeline Hart" }]
		},
		{
			eventType: EventTypes.CHARITY,
			backgroundColor: "#161C29",
			title: "Culture Week 2024",
			description: `Charity Week is back for 2024!

In w/c 24th June, Charity week will be returning, with fan favourite events making a comeback. Will you be in the hot seat for the Chase, or might you stun the judges with your skills in the X-Factor.

All in all, it will be a fantastic week to raise money for charity!

More info coming soon!

(Hint: Cultural Dress Day?)`,
			headerURL: "",
			url: CULTURE_WEEK_2024_EVENT_BRITE,
			when: "24th - 27?th June 2024",
			cta: {
				// color: "string",
				backgroundColor: "#E82328",
				/** Change the CTA text */
				// text?: "string",
			},
		},
		{
			eventType: EventTypes.CHARITY,
			backgroundColor: "#161C29",
			title: "X Factor",
			headerURL: "",
			url: CULTURE_WEEK_2024_EVENT_BRITE,
			when: "24th June 2024",
			cta: {
				// color: "string",
				backgroundColor: "#E82328",
				/** Change the CTA text */
				// text?: "string",
			},
		},
		{
			eventType: EventTypes.CHARITY,
			backgroundColor: "#161C29",
			title: "The Chase",
			headerURL: "",
			url: CULTURE_WEEK_2024_EVENT_BRITE,
			when: "25th June 2024",
			cta: {
				// color: "string",
				backgroundColor: "#E82328",
				/** Change the CTA text */
				// text?: "string",
			},
		},
		{
			eventType: EventTypes.CHARITY,
			backgroundColor: "#161C29",
			title: "EA Sports FC 2024",
			headerURL: "",
			url: CULTURE_WEEK_2024_EVENT_BRITE,
			when: "27th June 2024",
			cta: {
				// color: "string",
				backgroundColor: "#E82328",
				/** Change the CTA text */
				// text?: "string",
			},
		},
	],
};

export const KECHGEvents: EventData = {
	generatedAt: "0",
	events: [],
};