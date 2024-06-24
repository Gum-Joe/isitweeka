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

type CardTypes = "new";

export type NewCardExt = { cardType: CardTypes; stats?: Array<{ title: string; value: string; }>; };

// TODO: Implement Button.
export const Card: React.FunctionComponent<EventItem & NewCardExt> = (props) => {
	if (props.hidden) return null;

	const panelStyle = props.backgroundColor ? {
		backgroundColor: props.eventType === EventTypes.HOUSE ? HOUSE_EVENT_PENDING_BG : props.backgroundColor,
		color: props.textColour,
	} : undefined;

	// switch (props.cardType) {
	// 	case "legacy":
	// 		return (
	// 			<div className="card" style={{ backgroundColor: props.textColour }}>
	// 				<div className="panel title text big" style={panelStyle}>{props.title}</div>
	// 				{props.description ? <div className="panel description text body" style={panelStyle}>{props.description}</div> : null}
	// 				<div className="panel stats" style={panelStyle}>
	// 					{///@ts-expect-error JS object checking existence TS doesn't like...
	// 						props.when || props.dateTime ? <div className="stat">
	// 							<div className="stat-label text big">When</div>
	// 							<div className="stat-value text big">{props.when ||
	// 								/// @ts-expect-error TS Doesn't understand that I know better than it when certain data exists
	// 								props.dateTime}</div>
	// 						</div> : null}
	// 				</div>
	// 				{props.eventType === EventTypes.HOUSE && props.currentVictor ? <div className="panel stats" style={{ backgroundColor: props.backgroundColor }}>
	// 					<div className="stat">
	// 						<div className="stat-label text big">Victor</div>
	// 						<div className="stat-value text big">{props.currentVictor}</div>
	// 					</div>
	// 				</div> : null}
	// 				{/* Allow House Events to have links */}
	// 				{props.url ? <a className="panel cta" onClick={reportOutboundButtonClick} href={props.url} style={{ ...props.cta }}>
	// 					<div className="text big">{props.cta?.text || "Buy Tickets"}  →</div>
	// 				</a> : null}
	// 			</div>
	// 		);
	// }
	return (
		<div className="card" style={{
			/// @ts-expect-error TS doesn't understand CSS vars
			"--panel-bg": props.backgroundColor,
		}}>
			<div className="panel title text big" style={{ position: "relative", padding: props.headerURL ? 0 : undefined }}>
				{props.headerURL ? <img alt={props.title} src={props.headerURL} style={{
					scale: "1.04", // HACK :: SVGs that don't fit nicely don't work properly.
					objectFit: "cover",
				}} /> : null}
				{props.displayTitle || !props.headerURL ? <span style={props.headerURL ? {
					position: "absolute",
					margin: "auto",
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					textAlign: "center",
					display: "flex",
					justifyContent: "center",
					alignContent: "center",
					alignItems: "center",
					textShadow: props.title && props.headerURL ? "0px 0px 3px var(--panel-bg), 0px 0px 1px var(--panel-bg)" : undefined
				} : undefined}>
					{props.title}
				</span> : null}
			</div>
			{props.description ? <div className="panel description text body">{props.description}</div> : null}
			{props.stats ? <div className="panel stats">{props.stats.map((stat) => {
				return (
					<div className="stat text big" key={stat.title}>
						<div className="stat-label">{stat.title}</div>
						<div className="stat-value">{stat.value}</div>
					</div>
				);
			})}</div> : null}
			{///@ts-expect-error JS object checking existence TS doesn't like...
				props.when || props.dateTime ?
					<div className="panel stats" style={panelStyle}>
						<div className="stat">
							<div className="stat-label text big">When</div>
							<div className="stat-value text big">{props.when ||
								/// @ts-expect-error TS Doesn't understand that I know better than it when certain data exists
								props.dateTime}</div>
						</div>
					</div> : null}
			{props.eventType === EventTypes.HOUSE ? <div className="panel stats">
				<div className="stat">
					<div className="stat-label">Victor</div>
					<div className="stat-value">{props.currentVictor}</div>
				</div>
			</div> : null}
			{(props.eventType === EventTypes.CHARITY || props.eventType === EventTypes.FUNDRIASER) && props.url ? <a className="panel cta" onClick={reportOutboundButtonClick} href={props.url} style={{ ...props.cta }}>
				<div className="text big">{props.cta?.text || "Buy Tickets"}  →</div>
			</a> : null}
		</div>
	);
};