/**
 * MOCK Events data
 * Replace with actual JSON response later
 */

import { EventData, EventTypes } from "../components/EventsList";

export const KECHBEvents: EventData = {
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
			}
		},
		{
			title: "Dr. Taylor's 6th Form Quiz Night",
			description: "Get your teams together for Dr. Taylor's 6th Form Quiz Night!",
			url: "#",
			when: "26/02/2021 at 7pm",
			headerURL: "/events/School-Logo.png",
			backgroundColor: "#000000",
			eventType: EventTypes.CHARITY,
			hidden: false,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Cross-Country",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "Autumn 2020",
			state: "ongoing",
			currentVictor: "Ongoing",
			//description: "House Touch Rugby",
			backgroundColor: "#5E957C",
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Touch Rugby",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "Autumn 2020",
			state: "done",
			currentVictor: "Beaufort",
			//description: "House Touch Rugby",
			//backgroundColor: "#752023", // House default
			backgroundColor: "#CC4545",
		}
	],
	generatedAt: "0"
};

export const KECHGEvents = {
	events: [],
	generatedAt: "0",
};