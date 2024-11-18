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
		// {
		// 	eventType: EventTypes.CHARITY,
		// 	title: "CHB Charity Week 2024",
		// 	description: "CHB will see the return of Charity Week on the 2nd of December! Get ready for a thrilling showcase of events! We've got all your favourites, from Mario Kart to Who Wants to Be a Millionaire! Click the button below to donate and buy tickets, which start from £2.",
		// 	when: "w/c 2nd December",
		// 	url: "https://chbcharityweek2024.eventbrite.com/",
		// 	backgroundColor: "#1f2335",
		// 	ticketsSale: {
		// 		start: "18/11/24"
		// 	}
		// },
		// {
		// 	eventType: EventTypes.CHARITY,
		// 	title: "Who Wants To Be A Millionaire?",
		// 	description: "We start things off with a Kahoot, to determine the 5 lucky students who'll have to face Amaan Ahmed, the Quizmaster. Get all the questions correct, and you'll become a Camp Hillionaire!",
		// 	when: "Monday 2nd December",
		// 	url: "https://chbcharityweek2024.eventbrite.com/",
		// 	backgroundColor: "#1e012d",
		// 	ticketsSale: {
		// 		start: "18/11/24"
		// 	},
		// },
		// {
		// 	eventType: EventTypes.CHARITY,
		// 	title: "Mario Kart Tournament",
		// 	description: "Race your way to victory as CHB sees its 2nd Mario Kart tournament. Competing in your year groups, you'll be in for the chance of a sweet reward and bragging rights. Come on, how often do you get to play video games in school?",
		// 	when: "Tuesday 3rd December",
		// 	url: "https://chbcharityweek2024.eventbrite.com/",
		// 	backgroundColor: "#000000",
		// 	ticketsSale: {
		// 		start: "18/11/24"
		// 	},
		// },
		// {
		// 	hidden: false,
		// 	eventType: EventTypes.CHARITY,
		// 	title: "Camp Hill's Got Talent!",
		// 	description: "Hosted by our very own Head Boy Ayan Butt and Mohammed Maahir, get ready for a show of talent and skills, all for the chance of winning an Amazon Giftcard worth up to £15!",
		// 	when: "Wednesday 4th December",
		// 	url: "https://chbcharityweek2024.eventbrite.com/",
		// 	backgroundColor: "#742a26",
		// 	ticketsSale: {
		// 		start: "18/11/24"
		// 	},
		// },
		// {
		// 	eventType: EventTypes.CHARITY,
		// 	title: "The Grand Debate",
		// 	description: "Get ready for this battle of wits and words as we see students and teachers battle it out in the art of rhetoric. YOU, as the audience will get to decide the winner, and determine who'll be walking off as the Debating Kings of Camp Hill! Hosted by Dr Donnelly.",
		// 	when: "Thursday 5th December",
		// 	url: "https://chbcharityweek2024.eventbrite.com/",
		// 	backgroundColor: "#908579",
		// 	ticketsSale: {
		// 		start: "18/11/24"
		// 	},
		// },
		// {
		// 	eventType: EventTypes.CHARITY,
		// 	title: "CHB Charity Week Raffle",
		// 	description: "Buyers of either a standard or VIP 'Hall' Events Pass' will be given entry. You'll be in for the chance to win a prize of up to £50 or more! Note: VIP Tickets will be counted as an x2 entry, and the event takes place at break.",
		// 	when: "Friday 6th December",
		// 	url: "https://chbcharityweek2024.eventbrite.com/",
		// 	backgroundColor: "#1f2335",
		// 	ticketsSale: {
		// 		start: "18/11/24"
		// 	}
		// },
		
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