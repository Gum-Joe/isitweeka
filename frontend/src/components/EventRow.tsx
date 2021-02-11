import React from "react";
import Button from "./Button.Forward";
import { EventItem, EventTypes } from "./EventsList";

const baseEventImageStyle = {
	backgroundSize: "contain",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center",
	display: "flex",
	flex: 1,
	margin: "auto",
	width: "90%",
	maxHeight: "80%",
};

interface RowProps {
	event: EventItem;
}

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

export default class EventRow extends React.PureComponent<RowProps, never> {
	render() {
		switch (this.props.event.eventType) {
			case EventTypes.CHARITY:
				return (
					<div className="events-row" style={{ backgroundColor: this.props.event.backgroundColor }}>
						<div>
							<div style={{ backgroundImage: `url(${this.props.event.headerURL})`, ...baseEventImageStyle }}>
								{/*<h4>[IMAGE SET AS BACKGROUND OF THIS DIV]</h4>*/}
							</div>
						</div>
						<div>
							<h3>{this.props.event.title}</h3>
							{typeof this.props.event.when !== "undefined" ? <h4 className="no-margin">When? {this.props.event.when}</h4> : null}
							{typeof this.props.event.description !== "undefined" ? <h4 className="no-margin">{this.props.event.description}</h4> : null}
							{
								this.props.event.ticketsSale &&
									new Date(this.props.event.ticketsSale.start).valueOf() < Date.now() ?
									<a href={this.props.event.url}>
										<Button onClick={reportOutboundButtonClick} style={{ ...this.props.event.cta }}>Buy Tickets</Button>
									</a> : null
							}
							{
								this.props.event.ticketsSale &&
									new Date(this.props.event.ticketsSale.start).valueOf() > Date.now() ?
									<h4>Tickets on sale {this.props.event.ticketsSale.start}</h4> : null
							}
							
							
						</div>
					</div>
				);
			
			case EventTypes.FUNDRIASER:
				return (
					<div className="events-row" style={{ backgroundColor: this.props.event.backgroundColor, color: this.props.event.textColour || "#fff" }}>
						<div>
							<div style={{ backgroundImage: `url(${this.props.event.headerURL})`, ...baseEventImageStyle }}>
								{/*<h4>[IMAGE SET AS BACKGROUND OF THIS DIV]</h4>*/}
							</div>
						</div>
						<div>
							<h3>{this.props.event.title}</h3>
							{typeof this.props.event.description !== "undefined" ? <h4 className="no-margin">{this.props.event.description}</h4> : null}
							<h4 className="no-margin">Target: {this.props.event.target}</h4>
							<a target="__blanK" href={this.props.event.url}>
								<Button onClick={reportOutboundButtonClick} buttonType={this.props.event.cta?.type || "underline"} style={{ ...this.props.event.cta }}>Donate Now</Button>
							</a>
						</div>
					</div>
				);
			
			case EventTypes.HOUSE:
				return (
					<div className="events-row" style={{ backgroundColor: this.props.event.backgroundColor }}>
						<div>
							<div style={{ backgroundImage: `url(${this.props.event.headerURL})`, ...baseEventImageStyle }}>
								{/*<h4>[IMAGE SET AS BACKGROUND OF THIS DIV]</h4>*/}
							</div>
						</div>
						<div>
							<h3>{this.props.event.title}</h3>
							{typeof this.props.event.description !== "undefined" ? <h4 className="no-margin">{this.props.event.description}</h4> : null}
							<h4 className="no-margin">Date: {this.props.event.dateTime}</h4>
							{
								// Only show current victor if event is ongoing or done
								this.props.event.state !== "todo" && typeof this.props.event.currentVictor !== "undefined" ?
									<h4 className="no-margin">{this.props.event.state !== "done" ? "Current " : ""}Victor: {this.props.event.currentVictor}</h4>
									: null
							}
						</div>
					</div>
				);

			default:
				return (
					<h1>There&amp;s been an error - an invalid event type was provided. Please file an issue on GitHub (see footer).</h1>
				);
				break;
		}
	}
}