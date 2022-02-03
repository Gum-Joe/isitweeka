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

export const KECHBEvents: EventData = {
	generatedAt: "0",
	events: [
		{
			eventType: EventTypes.CHARITY,
			title: "Charity Week 2022",
			description: "It's been 2 years since the last charity event. Let's change that, with a whole week of tremendous events.",
			headerURL: "/events/CharityWeek.png",
			when: "w/c 14th February",
			url: "https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite",
			backgroundColor: "#202435",
			ticketsSale: {
				start: "02/02/22"
			}
		},
		{
			eventType: EventTypes.CHARITY,
			title: "THE GRAND DEBATE",
			description: "Get your brains ready, tone primed and dramatic pauses fixed as you face the undisputable masters of debate - the teachers.",
			headerURL: "/events/Logo-Charity-Commitee.png",
			when: "Charity Week",
			url: "https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite",
			backgroundColor: "#ffffff",
			ticketsSale: {
				start: "02/02/22"
			},
			textColour: "#000000",
			cta: {
				backgroundColor: "#5ab947",
				type: "fill",
			}
		},
		{
			eventType: EventTypes.CHARITY,
			title: "Mario Kart Tournament",
			description: "Get ready to race your classmates in Camp Hill's first Mario Kart tournament!",
			headerURL: "/events/CharityWeek.png",
			when: "Charity Week",
			url: "https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite",
			backgroundColor: "#000000",
			ticketsSale: {
				start: "02/02/22"
			},
		},
		{
			eventType: EventTypes.CHARITY,
			title: "Who Wants To Be A Millionaire?",
			description: "Get ready to take to the stage, as you could be in your chance to win a £50 Amazon Giftcard in \"Who Wants to Be a Millionaire?\"",
			headerURL: "/events/who_wants_to_be_a_millionaire__uk_2018_logo_remake_by_zackthetimelordrblx_dcm12hz-fullview.png",
			when: "Charity Week",
			url: "https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite",
			backgroundColor: "#1e012d",
			ticketsSale: {
				start: "02/02/22"
			},
		},
		{
			title: "Would I Lie To You?",
			description: "Come hear teachers tell their funny & embarrassing stories!",
			url: "https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite",
			ticketsSale: {
				start: "01/01/2020"
			},
			headerURL: "/events/WILTY_Logo.png",
			backgroundColor: "#2C1F39",
			eventType: EventTypes.CHARITY,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Chess",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "starts Monday 17th January 2022",
			state: "todo",
			//currentVictor: "Beaufort",
			//description: "House Touch Rugby",
			//backgroundColor: "#752023", // House default, or #5E957C
			backgroundColor: HOUSE_EVENT_PENDING_BG,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Swimming Gala",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "Thursday 3rd February 2022",
			state: "todo",
			//currentVictor: "Beaufort",
			//description: "House Touch Rugby",
			//backgroundColor: "#752023", // House default, or #5E957C
			backgroundColor: HOUSE_EVENT_PENDING_BG,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Handball",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "starts w/c 7th February 2022",
			state: "todo",
			//currentVictor: "Beaufort",
			//description: "House Touch Rugby",
			//backgroundColor: "#752023", // House default, or #5E957C
			backgroundColor: HOUSE_EVENT_PENDING_BG,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Volleyball",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "starts w/c 14th March 2022",
			state: "todo",
			//currentVictor: "Beaufort",
			//description: "House Touch Rugby",
			//backgroundColor: "#752023", // House default, or #5E957C
			backgroundColor: HOUSE_EVENT_PENDING_BG,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "Intermediate & Senior House Hockey",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "Monday 21st & Wednesday 23rd March 2022",
			state: "todo",
			//currentVictor: "Beaufort",
			//description: "House Touch Rugby",
			//backgroundColor: "#752023", // House default, or #5E957C
			backgroundColor: HOUSE_EVENT_PENDING_BG,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "Senior 7s House Rugby",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "Wednesday 30th March 2022",
			state: "todo",
			//currentVictor: "Beaufort",
			//description: "House Touch Rugby",
			//backgroundColor: "#752023", // House default, or #5E957C
			backgroundColor: HOUSE_EVENT_PENDING_BG,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Table Tennis (all years)",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "Monday 4th April - Wednesday 6th April 2022",
			state: "todo",
			//currentVictor: "Beaufort",
			//description: "House Touch Rugby",
			//backgroundColor: "#752023", // House default, or #5E957C
			backgroundColor: HOUSE_EVENT_PENDING_BG,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Music",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "Tuesday 5th April 2022",
			state: "todo",
			//currentVictor: "Beaufort",
			//description: "House Touch Rugby",
			//backgroundColor: "#752023", // House default, or #5E957C
			backgroundColor: HOUSE_EVENT_PENDING_BG,
		},
		{
			eventType: EventTypes.CHARITY,
			title: "Year 11 & 13 December Mocks",
			headerURL: "/events/School-Logo.png",
			//description: "The chance to give your questions to Mr Bowen - check your email for how to submit them!",
			description: "Year 11 & 13 contingency assessments - check your emails for the official details.",
			when: "Monday 6th - Friday 17th December",
			backgroundColor: "#752023",
			hidden: true,
		},
		{
			eventType: EventTypes.CHARITY,
			title: "Prize Giving",
			headerURL: "/events/School-Logo.png",
			description: "A celebration of students' achievements, with a chance to reflect on the past academic year",
			when: "Friday 3rd December",
			backgroundColor: "#752023",
			hidden: true,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Quiz",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "Intermediate competition starts Tuesday 15th March 2022",
			state: "ongoing",
			currentVictor: "Beaufort",
			description: "Beaufort win House Quiz for the seniors - but will runner-up Seymour speed past them in the lower years?",
			//backgroundColor: "#752023", // House default, or #5E957C
			backgroundColor: HOUSE_BEAUFORT,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Rugby",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "started Monday 4th October 2021",
			state: "ongoing",
			currentVictor: "Howard",
			description: "IsItWeekA understands, with just the Seniors left to play, Howard has the lead with Seymour second and Tudor & Beaufort tied for 4th (as of 01/12/21)",
			// Tud: 9
			// Beau: 5
			// How: 5
			// Sey: 5
			//backgroundColor: "#752023", // House default, or #5E957C
			backgroundColor: HOUSE_HOWARD,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Cross Country",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "standards w/c 15th November 2021, final Thursday 2nd December",
			state: "done",
			currentVictor: "Howard",
			//description: "House Touch Rugby",
			backgroundColor: HOUSE_HOWARD,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Badminton - Seniors & Juniors",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "Wednesday 1st December 2021",
			state: "done",
			currentVictor: "Howard",
			description: "Howard wins House Badminton, after blitzing past the other houses in the Seniors section.",
			//backgroundColor: "#752023", // House default, or #5E957C
			backgroundColor: HOUSE_HOWARD,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Football",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "w/c 27th September",
			state: "ongoing",
			currentVictor: "Howard",
			description: "Howard wins Senior Football - but will they win overall?",
			//backgroundColor: "#752023", // House default, or #5E957C
			backgroundColor: HOUSE_HOWARD,
		},
		{
			eventType: EventTypes.CHARITY,
			title: "Head's Hotseat",
			headerURL: "/events/School-Logo.png",
			//description: "The chance to give your questions to Mr Bowen - check your email for how to submit them!",
			description: "The chance to give your questions to Mr Bowen!",
			when: "TBC",
			backgroundColor: "#752023",
			hidden: true,
		},
		{
			eventType: EventTypes.CHARITY,
			title: "Year 7, 10 and 12 Photographs",
			headerURL: "/events/School-Logo.png",
			description: "The all-important school photographs.",
			when: "Wednesday 8th September 2021",
			backgroundColor: "#752023",
			hidden: true,
		},
		{
			eventType: EventTypes.CHARITY,
			title: "Online Open Evening",
			headerURL: "/events/School-Logo.png",
			description: "Open evening - in an online format. There will be a half-day for filming on Thursday 30th September",
			//when: "Half-day for filming on 30th September",
			backgroundColor: "#752023",
			hidden: true,
		},
		{
			eventType: EventTypes.CHARITY,
			title: "Teacher Training Day",
			headerURL: "/events/School-Logo.png",
			description: "A day off school for pupils.",
			when: "Friday 1st October 2021",
			backgroundColor: "#752023",
			hidden: true,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Basketball",
			headerURL: "/events/TMPHouseChampionshipDefault.jpg",
			dateTime: "w/c 13th December 2021",
			state: "todo",
			//currentVictor: "Beaufort",
			//description: "House Touch Rugby",
			//backgroundColor: "#752023", // House default, or #5E957C
			backgroundColor: HOUSE_EVENT_PENDING_BG,
		},
	],
};

export const KECHGEvents: EventData = {
	events: [
		{
			eventType: EventTypes.CHARITY,
			title: "Macmillan Coffee Morning",
			when: "Friday 1st October",
			backgroundColor: "#f7f7f7",
			textColour: "#00754F",
			headerURL: "/events/Macmillan_Cancer_Support.svg",
			url: "https://coffee.macmillan.org.uk",
			cta: {
				color: "#fff",
				type: "fill",
				backgroundColor: "#00754F", // Possible A/B Test
				text: "more info",
			},
			ticketsSale: {
				start: "01/10/21"
			},
			hidden: true,
		},
		{
			eventType: EventTypes.CHARITY,
			title: "Teacher Training Day",
			headerURL: "/events/School-Logo.png",
			description: "A day off school for pupils.",
			when: "Tuesday 4th January 2022",
			backgroundColor: "#752023",
			hidden: true,
		},
		{
			eventType: EventTypes.CHARITY,
			title: "Songs from the Shows (Show Choir)",
			headerURL: "/events/School-Logo.png",
			description: "A performance of songs from the musicals \"Matilda\" and \"Chicago\" by ~100 students, along with acting and dance!",
			when: "15th & 16th February",
			backgroundColor: "#752023",
			hidden: false,
		},
		{
			eventType: EventTypes.CHARITY,
			title: "Year 13 December Mocks",
			headerURL: "/events/School-Logo.png",
			//description: "The chance to give your questions to Mr Bowen - check your email for how to submit them!",
			description: "Year 13 mock exams.",
			when: "Monday 6th - Friday 17th December",
			backgroundColor: "#752023",
			hidden: true,
		},
		{
			eventType: EventTypes.HOUSE,
			title: "Year 13 House Dance",
			headerURL: "/events/KECHGTMPHouseChampionshipDefault.jpg",
			dateTime: "Wednesday 20th October 2021",
			state: "done",
			currentVictor: "Lichfield",
			description: "Lichfield wins the Year 13 House Dance competition, where all houses choreographed a dance to 'Kiss You' by One Direction.",
			//backgroundColor: "#752023", // House default, or #5E957C
			backgroundColor: "#F8F9F4",
			textColour: "#E70420"
		},
		{
			eventType: EventTypes.HOUSE,
			title: "Year 12 Christmas Quiz",
			headerURL: "/events/KECHGTMPHouseChampionshipDefault.jpg",
			dateTime: "Wednesday 15th December 2021",
			state: "done",
			currentVictor: "Stratford",
			description: "Stratford wins the Year 12 House Christmas Quiz, gaining 100 house points, whilst Lichfield places 2nd and Priory 3rd.",
			//backgroundColor: "#752023", // House default, or #5E957C
			textColour: "#6690B3",
			backgroundColor: "#F8F9F4",
			//textColour: "#000"
		},
		{
			eventType: EventTypes.HOUSE,
			title: "House Fair",
			headerURL: "/events/KECHGTMPHouseChampionshipDefault.jpg",
			dateTime: "Friday 1st April 2022",
			state: "todo",
			//currentVictor: "Stratford",
			description: "The House Fair.",
			//backgroundColor: "#752023", // House default, or #5E957C
			backgroundColor: HOUSE_EVENT_PENDING_BG
		},
	],
	generatedAt: "0",
};

/** KECHB Events from 2021 */
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
