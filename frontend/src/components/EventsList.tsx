export interface EventItem {
	title: string;
	ticketsURL: string;
	headerURL: string;
	backgroundColor: string;
}

export interface EventData {
	events: Array<EventItem>;
	generatedAt: number; // Timestamp
}

export const dummyResponse: EventData = {
	events: [
		{
			title: "Would I Lie To You?",
			ticketsURL: "#",
			headerURL: "/Logo_Export_Trans_but_not_on_HRT.png",
			backgroundColor: "#2C1F39",
		}
	],
	generatedAt: 986712435,
}