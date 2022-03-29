import React from "react";
import { scrollUp, scrollDown } from "../../utils/scroll";
import { EventsListProps } from "../EventsList";
import { Card } from "./Card";

/**
 * List events based off inputted JSON
 * Eventually it will take a URL that a
 */
export const EventsGrid: React.FunctionComponent<EventsListProps> = (props) => {
	const filteredEvents = props.eventData.events.filter(theEvent => theEvent.hidden !== true);
	return (
		<div className="isitweeka events">
			{/* TODO: Sort out back button for mobile */}
			<h2 className=""><button onClick={scrollUp} className="back" /> Events & News</h2>
			<div className="events-grid">
				
				{filteredEvents.length > 0 ? filteredEvents.map((theEvent, index) => (
					<Card key={index} cardType="legacy" {...theEvent} />
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
	)
}

export default EventsGrid;