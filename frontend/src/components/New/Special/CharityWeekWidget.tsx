import React from "react";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgressbar } from "react-circular-progressbar";
import { CW_TARGET } from "../../../utils/constants";

interface TheProps {
	raised: {
		net: string;
		ticketQuantity: number;
	}
}

export const CharityWeekWidget: React.FunctionComponent<TheProps> = (props) => {
	return (
		<div className="cw-cards">
			<div className="cw-header">
				<h1>Charity Week</h1>
			</div>
			<div className="cw-content">
				<div>
					<div className="cw-buy">
						<h2>About</h2>
						<h4>Camp Hill's return to charity events, with Who Wants to Be a Millionaire?, THE GRAND DEBATE, a Mario Kart tournament, Camp Hill&apos;s Got Talent and Would I Lie To You: Students vs Teachers! Donations close 7pm Tuesday - all money goes to Beat UK!</h4>
						<a href="https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite"><button><p>donate now</p> <FontAwesomeIcon icon={faArrowRight} /></button></a>
						{/*<a className="cw-delayed" href="https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite" aria-disabled><button aria-disabled disabled><p>ticket sales delayed</p></button></a>*/}
					</div>
					<div className="cw-raised">
						<h2>Ticket Stats</h2>
						<div className="raised-content">
							<div className="ring-cont"><CircularProgressbar strokeWidth={10} value={parseFloat(props.raised.net) / CW_TARGET * 100} text={(parseFloat(props.raised.net) / CW_TARGET * 100).toFixed(0) + "%"} /></div>
							<div className="raised-text">
								<h1>£{props.raised.net}</h1>
								<h3>raised</h3>
							</div>
							<div className="raised-text">
								<h1>{props.raised.ticketQuantity}</h1>
								<h3>sold</h3>
							</div>
							
						</div>
						
					</div>
					<div className="cw-charity-link">
						<p>Supporting Beat -</p>
						<a target="__blank" href="https://www.beateatingdisorders.org.uk/about-beat/">more info &gt;&gt;&gt;</a>
					</div>
				</div>
		
			</div>
			
		</div>
	)
}