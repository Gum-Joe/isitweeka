import React from "react";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgressbar } from "react-circular-progressbar";
import { CW_TARGET } from "../../../utils/constants";

interface TheProps {
	title: string;
	description: string;
	donateURL: string;
	charity: {
		name: string;
		url: string;
	};
	raised: {
		net: string;
		ticketQuantity: number;
		target: number;
	};
	style?: {
		background: string;
		text: string;
		ringColour: string;
	};
}

export const CharityWidget: React.FunctionComponent<TheProps> = (props) => {
	return (
		<div className="cw-cards">
			<div className="cw-header">
				<h1>{props.title}</h1>
			</div>
			<div className="cw-content">
				<div style={{ background: props.style?.background, color: props.style?.text }}>
					<div className="cw-buy">
						<h2>About</h2>
						<h4>{props.description}</h4>
						<a href={props.donateURL}><button style={{ whiteSpace: "pre" }}><p>Donate Now  →</p>{/* <FontAwesomeIcon icon={faArrowRight} /> */}</button></a>
						{/*<a className="cw-delayed" href="https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite" aria-disabled><button aria-disabled disabled><p>ticket sales delayed</p></button></a>*/}
					</div>
					<div className="cw-raised">
						<h2>Ticket Stats</h2>
						<div className="raised-content">
							<div className="ring-cont"><CircularProgressbar styles={{ path: { stroke: props.style?.ringColour } }} strokeWidth={10} value={parseFloat(props.raised.net) / props.raised.target * 100} text={(parseFloat(props.raised.net) / props.raised.target * 100).toFixed(0) + "%"} /></div>
							<div className="raised-text">
								<h1>£{props.raised.net}</h1>
								<h3>Raised</h3>
							</div>
							<div className="raised-text">
								<h1>{props.raised.ticketQuantity}</h1>
								<h3>Sold</h3>
							</div>

						</div>

					</div>
					<div className="cw-charity-link">
						<p>Supporting {props.charity.name} -</p>
						<a target="__blank" href={props.charity.url}>more info »</a>
					</div>
				</div>

			</div>

		</div>
	);
};

export const CHARITY_WEEK_DATA_ARCHIVE: TheProps = {
	title: "Charity Week",
	description: "Camp Hill's return to charity events, with Who Wants to Be a Millionaire?, THE GRAND DEBATE, a Mario Kart tournament, Camp Hill&apos;s Got Talent and Would I Lie To You: Students vs Teachers! Donations close 7pm Tuesday - all money goes to Beat UK!",
	donateURL: "https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite",
	charity: {
		name: "Beat",
		url: "https://www.beateatingdisorders.org.uk/about-beat/"
	},
	raised: {
		net: "",
		ticketQuantity: 0,
		target: CW_TARGET,
	}
};