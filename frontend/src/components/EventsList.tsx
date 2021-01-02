
/**
 * Used to distinguish between the different type of event we can display.
 */
export enum EventTypes{
	HOUSE = "house", // house event
	CHARITY = "charity", // charity event
} 

export interface EventItem {
	title: string;
	// HACK: So that it won't complain about the JSON. Please remove eventually
	eventType: EventTypes | string;
	ticketsURL: string;
	ticketsSale: {
		start: string;
		end?: string;
	};
	headerURL: string;
	backgroundColor: string;
}

export interface EventData {
	events: Array<EventItem>;
	generatedAt: string; // Timestamp
}

export const dummyResponse: EventData = {
	events: [
		{
			title: "Would I Lie To You?",
			ticketsURL: "https://www.eventbrite.co.uk/e/would-i-lie-to-you-students-vs-teachers-tickets-133890123965?aff=isitweeka",
			headerURL: "/Logo_Export_Trans_but_not_on_HRT.png",
			backgroundColor: "#2C1F39",
			ticketsSale: {
				start: "1/1/2020",
			},
			eventType: "charity"
		}
	],
	generatedAt: new Date().toISOString(),
}