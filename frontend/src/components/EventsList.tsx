export interface EventItem {
	title: string;
	ticketsURL: string;
	ticketsSale: {
		start: string;
		end?: string;
	};
	isHouseEvent?: boolean;
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
			ticketsURL: "#",
			headerURL: "/Logo_Export_Trans_but_not_on_HRT.png",
			backgroundColor: "#2C1F39",
			ticketsSale: {
				start: "1/1/2020",
			},
		}
	],
	generatedAt: new Date().toISOString(),
}