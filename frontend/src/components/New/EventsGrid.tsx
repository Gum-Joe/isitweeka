import React from "react";
import { scrollUp, scrollDown } from "../../utils/scroll";
import { useWindowDimensions } from "../../utils/useWindowDimensions";
import { EventsListProps } from "../EventsList";
import { Card } from "./Card";

function calculateMasonry<T>(items: Array<T>, numberOfColumns: number) {
	// const numberOfColumns = 2;
	console.log(items);
	console.log(numberOfColumns);
	// Initialise the parent array
	const sortedItems: Array<Array<T>> = [];
	for (let i = 0; i < numberOfColumns; i++){
		// Populate said parent array with appropriate number of empty arrays
		sortedItems[i] = [];
	}
	for (let i = 0; i < items.length; i++){
		// Use super-cool maths to assign each element to the correct column array!
		// REDUNDANT:
		//sortedItems[i % numberOfColumns][Math.floor(i / numberOfColumns)] = items[i];
		// Use modulo and revolutionary Array.push() to append item to the end of the correct column
		sortedItems[i % numberOfColumns].push(items[i]);
	}
	console.log(sortedItems);
	return sortedItems;
}

/**
 * List events based off inputted JSON
 * Eventually it will take a URL that a
 */
export const EventsGrid: React.FunctionComponent<EventsListProps> = (props) => {
	const { width, height } = useWindowDimensions();
	const filteredEvents = props.eventData.events.filter(theEvent => theEvent.hidden !== true);
	const masonryColumns = calculateMasonry(filteredEvents, Math.floor((width - (width / 20)) / 480) || 1);
	return (
		<div className="isitweeka events">
			{/* TODO: Sort out back button for mobile */}
			<h2 className=""><button onClick={scrollUp} className="back" /> Events & News</h2>
			<div className="events-grid">
				
				{/* {filteredEvents.length > 0 ? filteredEvents.map((theEvent, index) => (
					<Card key={index} cardType="legacy" {...theEvent} />
				)) :
					<h1 id="no-events-header">There are no events.</h1>
				} */}
				
				{filteredEvents.length > 0 ? masonryColumns.map((content, index) => (
					<div className="column" key={index}>
						{content.map((theEvent, index) => (
							<Card key={index} cardType="legacy" {...theEvent} />
						))}
					</div>
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