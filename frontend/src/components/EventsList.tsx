import React, { Component } from "react";
import { scrollUp, scrollDown } from "../utils/scroll";
import EventRow from "./EventRow";

/**
 * Used to distinguish between the different type of event we can display.
 */
export enum EventTypes {
	HOUSE = "house", // house event
	CHARITY = "charity", // charity event
	FUNDRIASER = "fundraiser" // cahrity fundraiser
} 

export enum KECHBHouses {
	Beaufort = "beaufort",
	Howard = "Howard",
	Seymour = "Seymour",
	Tudor = "Tudor"
}

export interface BaseEventItem {
	title: string;
	description: string;
	headerURL?: string;
	backgroundColor: string;
	// HACK: So that it won't complain about the JSON. Please remove eventually
	eventType: EventTypes | string;
	hidden?: boolean;
	textColour?: string;
	/** BG Colour of call to action button */
	cta?: {
		color?: string;
		backgroundColor?: string;
		/** underline: button has an underline. fill: button has a fill instead */
		type: "underline" | "fill";
	}
}

export interface EventItemFundraiser extends BaseEventItem {
	eventType: EventTypes.FUNDRIASER | "fundraiser";
	url: string;
	target: string;
}

export interface EventItemCharity extends BaseEventItem {
	eventType: EventTypes.CHARITY | "charity";
	url: string;
	ticketsSale: {
		start: string;
		end?: string;
	};
}

export interface EventItemHouse extends BaseEventItem {
	eventType: EventTypes.HOUSE | "house";
	/** String time of event. Either a term (e.g. "Autumn"), date */
	dateTime: string;
	state: "todo" | "ongoing" | "done";
	currentVictor: string;
}

/*export interface EventItem {
	title: string;
	// HACK: So that it won't complain about the JSON. Please remove eventually
	eventType: EventTypes | string;
	url: string;
	ticketsSale?: {
		start: string;
		end?: string;
	};
	headerURL: string;
	backgroundColor: string;
}*/

export type EventItem = EventItemFundraiser | EventItemCharity | EventItemHouse;

export interface EventData {
	events: Array<EventItem>;
	generatedAt: string; // Timestamp
}

/**
 * @deprecated Use the JSON file in `data` insted.
 */
export const dummyResponse: EventData = {
	events: [
		{
			title: "Would I Lie To You?",
			description: "Would I Lie To You?",
			url: "https://www.eventbrite.co.uk/e/would-i-lie-to-you-students-vs-teachers-tickets-133890123965?aff=isitweeka",
			headerURL: "/Logo_Export_Trans_but_not_on_HRT.png",
			backgroundColor: "#2C1F39",
			ticketsSale: {
				start: "1/1/2020",
			},
			eventType: "charity"
		}
	],
	generatedAt: new Date().toISOString(),
};

/**
 * Fetched events list that follows {@link EventData} that is to be displayed
 * @see EventData
 */
export interface EventsListProps {
	eventData: EventData;
}

/**
 * List events based off inputted JSON
 * Eventually it will take a URL that a
 */
export default class EventsList extends Component<EventsListProps> {

	render() {
		return (
			<div className="isitweeka events">
				<h2><button onClick={scrollUp} className="back" /> Upcoming Events</h2>
				<div className="events-list">
					{this.props.eventData.events.map((theEvent, index) => (
						<EventRow key={index} event={theEvent} />
					))}
					{/*<div className="events-row">*/}
					{/*	<div style={{ ...baseEventImageStyle }}>*/}
					{/*	  <h4>[IMAGE SET AS BACKGROUND OF THIS DIV]</h4>*/}
					{/*	</div>*/}
					{/*	<div>*/}
					{/*	  <h3>Event Number Two?</h3>*/}
					{/*	  <h4>Tickets on sale 03/02/21</h4>*/}
					{/*	</div>*/}
					{/*</div>*/}
				</div>
			</div>
		);
	}
}