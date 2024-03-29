import React from "react";
import { HOUSE_EVENT_PENDING_BG } from "../../data/events-mock";
import { EventItem, EventTypes } from "../EventsList";

/**
 * Reports to Google analytics when the "Donate Now" or "Buy Tickets" link was clicked so we can track conversions
 */
function reportOutboundButtonClick() {
	console.log("Reporting button click...");
	gtag("event", "outbound_events_button_click", {
		"event_category": "ecommerce",
		"value": "true",
		"label": "outbound_events_button_click",
	});
}

type CardTypes = "legacy" | "new";

export type NewCardExt = { cardType: CardTypes; stats?: Array<{ title: string; value: string }> };

// TODO: Implement Button.
export const Card: React.FunctionComponent<EventItem & NewCardExt> = (props) => {
	if (props.hidden) return null;
	
	const panelStyle = props.backgroundColor ? {
		backgroundColor: props.eventType === EventTypes.HOUSE ? HOUSE_EVENT_PENDING_BG : props.backgroundColor,
		color: props.textColour,
	} : undefined;
	
	switch (props.cardType) {
		case "legacy":
			return (
				<div className="card" style={{ backgroundColor: props.textColour }}>
					<div className="panel title text big" style={panelStyle}>{props.title}</div>
					{props.description ? <div className="panel description text body" style={panelStyle}>{props.description}</div> : null}
					<div className="panel stats" style={panelStyle}>
						{///@ts-expect-error JS object checking existence TS doesn't like...
							props.when || props.dateTime ? <div className="stat">
							<div className="stat-label text big">When</div>
							<div className="stat-value text big">{props.when ||
								/// @ts-expect-error TS Doesn't understand that I know better than it when certain data exists
								props.dateTime}</div>
						</div> : null}
					</div>
					{props.eventType === EventTypes.HOUSE && props.currentVictor ? <div className="panel stats" style={{ backgroundColor: props.backgroundColor }}>
						<div className="stat">
							<div className="stat-label text big">Victor</div>
							<div className="stat-value text big">{props.currentVictor}</div>
						</div>
					</div> : null}
					{/* Allow House Events to have links */}
					{props.url ? <a className="panel cta" onClick={reportOutboundButtonClick} href={props.url} style={{ ...props.cta }}>
						<div className="text big">{ props.cta?.text || "Buy Tickets" }  →</div>
					</a> : null}
				</div>
			);
	}
	return (
		<div className="card">
			<div className="panel title text big">{props.title}</div>
			<div className="panel description text body">{props.description}</div>
			{props.stats ? <div className="panel stats">{props.stats.map((stat, index) => {
				return (
					<div className="stat text big" key={stat.title}>
						<div className="stat-label">{stat.title}</div>
						<div className="stat-value">{stat.value}</div>
					</div>
				);
			})}</div> : null}
			{props.eventType === EventTypes.HOUSE ? <div className="panel stats">
				<div className="stat">
					<div className="stat-label">Victor</div>
					<div className="stat-value">{props.currentVictor}</div>
				</div>
			</div> : null}
			{props.eventType === EventTypes.CHARITY || props.eventType === EventTypes.FUNDRIASER && props.url ? <a className="panel cta" onClick={reportOutboundButtonClick} href={props.url} style={{ ...props.cta }}>
				<div className="text big">{ props.cta?.text || "Buy Tickets" }  →</div>
			</a> : null}
		</div>
	);
};