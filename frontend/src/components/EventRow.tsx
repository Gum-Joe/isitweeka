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
							{new Date(this.props.event.ticketsSale.start).valueOf() < Date.now() ? <a href={this.props.event.url}><Button>Buy Tickets</Button></a> : null}
							<h4>Tickets on sale {this.props.event.ticketsSale.start}</h4>
						</div>
					</div>
				);
			
			case EventTypes.FUNDRIASER:
				return (
					<div className="events-row" style={{ backgroundColor: this.props.event.backgroundColor }}>
						<div>
							<div style={{ backgroundImage: `url(${this.props.event.headerURL})`, ...baseEventImageStyle }}>
								{/*<h4>[IMAGE SET AS BACKGROUND OF THIS DIV]</h4>*/}
							</div>
						</div>
						<div>
							<h3>{this.props.event.title}</h3>
							<a href={this.props.event.url}><Button>Donate Now</Button></a>
							<h4>Help raise {this.props.event.target}</h4>
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
							<h4>Current Victor: {this.props.event.currentVictor}</h4>
						</div>
					</div>
				);

			default:
				return (
					<h1>MEAP.</h1>
				);
				break;
		}
	}
}