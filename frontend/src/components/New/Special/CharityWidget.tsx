import React from "react";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgressbar } from "react-circular-progressbar";
import { CW_TARGET } from "../../../utils/constants";
import Button from "../Button";

export interface CharityProps {
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
		accent: string;
	};
}

export const CharityWidget: React.FunctionComponent<CharityProps> = (props) => {
	return (
		<div className="cw-cards">
			<div className="cw-header desktop">
				<h1>{props.title}</h1>
			</div>
			<div className="cw-content">
				<div className="card cw-card" style={{ background: props.style?.text, color: props.style?.text, maxWidth: "min(600px, 50vw)" }}>
					<div className="panel title text big mobile">{props.title}</div>
					<div className="panel hide-tablet" style={{ borderColor: props.style?.text }}>
						<h2 className="text big">About</h2>
						<span className="text body" style={{ whiteSpace: "pre-wrap" }}>{props.description}</span>
						{/* <a href={props.donateURL}><button style={{ whiteSpace: "pre" }}><p>Donate Now  →</p><FontAwesomeIcon icon={faArrowRight} /></button></a> */}
						{/* <a style={{ color: "inherit" }} href={props.donateURL}><Button>Donate Now  →</Button></a> */}
						{/*<a className="cw-delayed" href="https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite" aria-disabled><button aria-disabled disabled><p>ticket sales delayed</p></button></a>*/}
					</div>
					<div className="cw-raised panel">
						<h2 className="text big desktop">Ticket Stats</h2>
						<div className="raised-content">
							<div className="ring-cont"><CircularProgressbar styles={{ path: { stroke: props.style?.accent } }} strokeWidth={10} value={parseFloat(props.raised.net) / props.raised.target * 100} text={(parseFloat(props.raised.net) / props.raised.target * 100).toFixed(0) + "%"} /></div>
							<div className="raised-text desktop">
								<h1>£{props.raised.net}</h1>
								<h3>Raised</h3>
							</div>
							<div className="raised-text">
								<h1>{props.raised.ticketQuantity}</h1>
								<h3>Sold</h3>
							</div>
						</div>
					</div>
					<a className="panel cta" style={{ background: props.style?.accent }} href={props.donateURL}>
						<span className="text big">Donate Now  →</span>
					</a>
					<div className="panel desktop cw-charity-link" style={{ display: "block" }}>
						<p className="text body centred">Supporting {props.charity.name} - <a target="__blank" href={props.charity.url}>more info »</a></p>
					</div>
				</div>

			</div>

		</div>
	);
};

export const CHARITY_WEEK_DATA_ARCHIVE: CharityProps = {
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