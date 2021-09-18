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

export const KECHBEvents: EventData = {
	generatedAt: "0",
	events: [
		{
			eventType: EventTypes.CHARITY,
			title: "Year 7, 10 and 12 Photographs",
			headerURL: "/events/School-Logo.png",
			description: "The all-important school photographs.",
			when: "Wednesday 8th September 2021",
			backgroundColor: "#752023",
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Cross-Country",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "Autumn 2021",
			state: "todo",
			//currentVictor: "Seymour",
			//description: "House Touch Rugby",
			backgroundColor: HOUSE_EVENT_PENDING_BG,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Rugby",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "Autumn 2021",
			state: "todo",
			//currentVictor: "Beaufort",
			//description: "House Touch Rugby",
			//backgroundColor: "#752023", // House default, or #5E957C
			backgroundColor: HOUSE_EVENT_PENDING_BG,
		},
	],
};

/**
 * Events from 2021
 */
export const KECHB2021Events: EventData = {
	events: [
		{
			title: "Would I Lie To You?",
			description: "Come here teachers tell their embarrassing stories!",
			url: "https://www.eventbrite.co.uk/e/would-i-lie-to-you-students-vs-teachers-tickets-133890123965?aff=isitweeka",
			ticketsSale: {
				start: "01/01/2020"
			},
			headerURL: "/events/WILTY_Logo.png",
			backgroundColor: "#2C1F39",
			eventType: EventTypes.CHARITY,
			hidden: true,
		},
		{
			title: "LockdownRuns­4Charity",
			description: "A group of students aiming to run 1000km.",
			url: "https://www.gofundme.com/f/khsjye-lockdownruns4charity",
			headerURL: "https://youngminds.org.uk/assets/logos/youngminds-logo.svg",
			backgroundColor: "#ffffff",
			eventType: EventTypes.FUNDRIASER,
			target: "£2000",
			textColour: "#000000",
			cta: {
				color: "#fff",
				type: "fill",
				//backgroundColor: "#0091EA", // Possible A/B Test
			},
			hidden: true,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "Sports Day",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "Wednesday 14th July",
			state: "done",
			currentVictor: "Howard",
			description: "Sports Day - the final event of the house calendar!",
			//backgroundColor: "#5E957C",
			backgroundColor: "#4286BB",
		},
		{
			eventType: EventTypes.CHARITY,
			title: "CHAOS",
			headerURL: "/events/School-Logo.png",
			ticketsSale: {
				start: "01/01/2020"
			},
			description: "Countdown to CHAOS: the Camp Hill Amateur Operatic Society.  Little else is known at the moment.",
			when: "Monday 19th July 2021",
			backgroundColor: "#752023",
			hidden: true,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Cross-Country",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "Autumn 2020",
			state: "done",
			currentVictor: "Seymour",
			//description: "House Touch Rugby",
			backgroundColor: "#e8ae56",
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Touch Rugby",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "Autumn 2020",
			state: "done",
			currentVictor: "Beaufort",
			//description: "House Touch Rugby",
			//backgroundColor: "#752023", // House default, or #5E957C
			backgroundColor: "#CC4545",
		}
	],
	generatedAt: "0"
};

export const KECHGEvents: EventData = {
	events: [
		{
			eventType: EventTypes.CHARITY,
			title: "Macmillan Coffee Morning",
			when: "Friday 1st October",
			backgroundColor: "#f7f7f7",
			textColour: "#005C46",
			headerURL: "/events/Macmillan_Cancer_Support.svg",
			url: "https://coffee.macmillan.org.uk",
			cta: {
				color: "#fff",
				type: "fill",
				backgroundColor: "#005C46", // Possible A/B Test
				text: "more info",
			},
			ticketsSale: {
				start: "01/10/21"
			}
		},
	],
	generatedAt: "0",
};