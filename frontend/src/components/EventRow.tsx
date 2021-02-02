import React from "react";
import Button from "./Button.Forward";

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
	imageURL: string;
	title: string;
	saleDate: string;
	background: string;
	ticketsOnSale?: boolean;
	ticketsURL: string;
}

export default class EventRow extends React.PureComponent<RowProps, never> {
	render() {
		return (
			<div className="events-row" style={{ backgroundColor: this.props.background }}>
				<div>
					<div style={{ backgroundImage: `url(${this.props.imageURL})`, ...baseEventImageStyle }}>
						{/*<h4>[IMAGE SET AS BACKGROUND OF THIS DIV]</h4>*/}
					</div>
				</div>
				<div>
					<h3>{this.props.title}</h3>
					{new Date(this.props.saleDate).valueOf() < Date.now() ? <a href={this.props.ticketsURL}><Button>Buy Tickets</Button></a> : null}
					<h4>Tickets on sale {this.props.saleDate}</h4>
				</div>
			</div>
		);
	}
}