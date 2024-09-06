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
// 		{
// 			eventType: EventTypes.CHARITY,
// 			backgroundColor: "#161C29",
// 			title: "Culture Week 2024",
// 			description: `Charity Week is back for 2024!

// In w/c 24th June, Charity week will be returning, with fan favourite events making a comeback. Will you be in the hot seat for the Chase, or might you stun the judges with your skills in the X-Factor.

// All in all, it will be a fantastic week to raise money for charity!

// More info coming soon!

// (Hint: Cultural Dress Day?)`,
// 			url: CULTURE_WEEK_2024_EVENT_BRITE,
// 			when: "Week of 24th June 2024",
// 			cta: {
// 				// color: "string",
// 				backgroundColor: "#E82328",
// 				/** Change the CTA text */
// 				// text?: "string",
// 			},
// 		},
// 		{
// 			eventType: EventTypes.CHARITY,
// 			backgroundColor: "#161C29",
// 			title: "X Factor",
// 			description: "Contact @isitweeka or @kech.charitycommittee for details",
// 			url: CULTURE_WEEK_2024_EVENT_BRITE,
// 			when: "24th June 2024",
// 			cta: {
// 				// color: "string",
// 				backgroundColor: "#E82328",
// 				/** Change the CTA text */
// 				// text?: "string",
// 			},
// 		},
// 		{
// 			eventType: EventTypes.CHARITY,
// 			backgroundColor: "#161C29",
// 			title: "The Chase",
// 			description: "Contact @isitweeka or @kech.charitycommittee for details",
// 			url: CULTURE_WEEK_2024_EVENT_BRITE,
// 			when: "25th June 2024",
// 			cta: {
// 				// color: "string",
// 				backgroundColor: "#E82328",
// 				/** Change the CTA text */
// 				// text?: "string",
// 			},
// 		},
// 		{
// 			eventType: EventTypes.CHARITY,
// 			backgroundColor: "#161C29",
// 			title: "EA Sports FC 2024",
// 			description: "Contact @isitweeka or @kech.charitycommittee for details",
// 			url: CULTURE_WEEK_2024_EVENT_BRITE,
// 			when: "27th June 2024",
// 			cta: {
// 				// color: "string",
// 				backgroundColor: "#E82328",
// 				/** Change the CTA text */
// 				// text?: "string",
// 			},
// 		},
	],
};

export const KECHGEvents: EventData = {
	generatedAt: Date.now().toString(),
	events: [
		// {
		// 	eventType: "news",
		// 	title: "2024 Mock General Election",
		// 	displayTitle: true,
		// 	description: `It's that time again! Get your photo ID ready and prepare yourself to vote for the first time in nearly 5 years!
			
		// 	As a public information service, IsItWeekA.com is obligated to state the following:
			
		// 	OFFICIAL NOTICE FOR POLITICAL ORGANISATIONS.
			
		// 	IsItWeekA.com is available for each party to post a “Propaganda Card™”. Please get in touch via @isitweeka on Instagram or by opening an issue on our GitHub.`,
		// 	headerURL: "/events/ElectionsBackdropFinalFinalV5.svg",
		// 	// backgroundColor: "#52BDFF",
		// 	backgroundColor: "#25004C",
		// 	stats: [{ title: "Posted", value: "18 June 2024" }, { title: "By", value: "IsItWeekA.com Political Correspondent" }],
		// 	when: "4th July",
		// },
	],
};