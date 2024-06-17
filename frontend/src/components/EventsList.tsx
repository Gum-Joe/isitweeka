import React, { Component } from "react";
import { scrollUp, scrollDown } from "../utils/scroll";
import EventRow from "./EventRow";

/**
 * Here's how it works:
 * - Current we just deploy a static JSON file with events and alerts in.
 * - These (and by extension the API) are currently described in terms of TS interfaces below.
 * 
 * Essentially there's a base event type, which has an eventType field
 * which TS then uses to infer the extra props for different event types (fundraiser, charity event and house event)
 * that are shown as the interfaces below)
 * 
 * @packageDocumentation
 */

/**
 * Used to distinguish between the different type of event we can display.
 */
export enum EventTypes {
	/** house event */
	HOUSE = "house",
	/** charity event */
	CHARITY = "charity", 
	/** charity fundraiser */
	FUNDRIASER = "fundraiser"
} 

export enum KECHBHouses {
	Beaufort = "beaufort",
	Howard = "Howard",
	Seymour = "Seymour",
	Tudor = "Tudor"
}

/** Base event intergace - all events need to have these properties */
export interface BaseEventItem {
	title: string;
	description?: string;
	headerURL: string;
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
		type?: "underline" | "fill";
		/** Change the CTA text */
		text?: string,
	},
	/* String representation of the date/time of event */
	when?: string,
	/** Allow any event to have a URL */	
	url?: string;
	/** Allow any event to have link text */
	linkText?: string;
}

/**
 * Props specific to fundraisers.
 * For {@link EventTypes.FUNDRIASER}
*/
export interface EventItemFundraiser extends BaseEventItem {
	eventType: EventTypes.FUNDRIASER | "fundraiser";
	url: string;
	target: string;
}

/**
 * Props specific to charity events.
 * For {@link EventTypes.CHARITY}
*/
export interface EventItemCharity extends BaseEventItem {
	eventType: EventTypes.CHARITY | "charity";
	/* Omit URL for no ticket button */
	url?: string;
	
	// Can now also use for regular, non-ticket events
	ticketsSale?: {
		start: string;
		end?: string;
	};
}

/**
 * Props specific to house events.
 * For {@link EventTypes.HOUSE}
*/
export interface EventItemHouse extends BaseEventItem {
	eventType: EventTypes.HOUSE | "house";
	/** String time of event. Either a term (e.g. "Autumn"), date */
	dateTime: string;
	state: "todo" | "ongoing" | "done";
	currentVictor?: string;
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

export interface NewsItem extends BaseEventItem {
	eventType: "news";
	stats: [{ title: "Posted", value: string }, { title: "By", value: string }];
}

/**
 * IMPORTANT: Merges the event types into one type.
 * 
 * TS type inference then auto-picks the right type based on `eventType` field.
 */
export type EventItem = EventItemFundraiser | EventItemCharity | EventItemHouse | NewsItem;

/**
 * Expected API response
 */
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
		const filteredEvents = this.props.eventData.events.filter(theEvent => theEvent.hidden !== true);
		return (
			<div className="isitweeka events">
				{/* TODO: Sort out back button for mobile */}
				<h2 className=""><button onClick={scrollUp} className="back" /> Upcoming Events</h2>
				<div className="events-list">
					
					{filteredEvents.length > 0 ? filteredEvents.map((theEvent, index) => (
						<EventRow key={index} event={theEvent} />
					)) :
						<h1 id="no-events-header">There are no events.</h1>
					}

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