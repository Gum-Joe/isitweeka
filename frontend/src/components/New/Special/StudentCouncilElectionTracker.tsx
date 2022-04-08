// By the power of CSS this is a mostly duplication-free "fork" of the vanilla Card component

import React from "react";

interface ComparisonBarProps {
	total: number;
	values: [number, number];
	colours: [string, string];
}

export const ComparisonBar: React.FunctionComponent<ComparisonBarProps> = (props) => {
	return (
		<div className="bar" style={{ background: "black" }}>
			<div className="bar-value" style={{ width: "100%", background: "lightgrey" }}>
				<div className="bar-value" style={{ width: `${props.values[0] / props.total * 100}%`, background: props.colours[0] }} />
				<div className="bar-value" style={{ width: `${props.values[1] / props.total * 100}%`, background: props.colours[1] }} />
			</div>
		</div>
	)
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

interface CandidateInfo {
	colour: string;
	name: string;
	photoUrl: string;
	votes: number;
}

interface TrackerProps {
	candidateOne: CandidateInfo;
	candidateTwo: CandidateInfo;
	summary: string;
	total: number;
}

export const StudentCouncilElectionTracker: React.FunctionComponent<TrackerProps> = (props) => {
	return (
		<div className="special-election-tracker-container">
			<div className="card light">
				<div className="panel title" style={{ gap: 0 }}>
					<div className="text big">Student Council Election</div>
					<div className="text body" style={{ textTransform: "uppercase" }}>Final Result</div>
				</div>
				<div className="panel">
					<div className="special-candidate-info-container text big first">
						<div className="special-candidate-photo"><img src={props.candidateOne.photoUrl} alt={props.candidateOne.name} /></div>
						<div className="special-candidate-name">{props.candidateOne.name}</div>
					</div>
					<div className="text body">{props.candidateOne.votes} Votes · {(props.candidateOne.votes / props.total * 100).toFixed(1)}%</div>
					<ComparisonBar total={props.total} values={[props.candidateOne.votes, props.candidateTwo.votes]} colours={[props.candidateOne.colour, props.candidateTwo.colour]} />
					<div className="text body" style={{ marginLeft: "auto", textAlign: "right" }}>{props.candidateTwo.votes} Votes · {(props.candidateTwo.votes / props.total * 100).toFixed(1)}%</div>
					<div className="special-candidate-info-container text big second">
						<div className="special-candidate-name">{props.candidateTwo.name}</div>
						<div className="special-candidate-photo"><img src={props.candidateTwo.photoUrl} alt={props.candidateTwo.name} /></div>
					</div>
					<div className="text body">We have the numbers! Out of the 25 total votes cast, one ballot was spoilt.</div>
					{/* <div className="text body">We have the numbers!</div> */}
					{/* <div className="text body">Out of the 25 total votes cast, one ballot was spoilt.</div> */}
				</div>
				<div className="panel description dark" style={{ gap: 0, background: props.candidateTwo.colour, /* borderColor: "white", border: "2px solid" "*/ }}>
					<div className="text body">Result:</div>
					<div className="text big">{props.summary}</div>
					<div className="text body">Congratulations!</div>
					{/* <div className="text body">Student Council refused to release numbers. Exact vote counts unknown.</div> */}
				</div>
				{/* Commented out until a URL is known. */}
				{/* <a className="panel cta dark" style={{ background: props.candidateTwo.colour }} onClick={reportOutboundButtonClick} href="#">
					<div className="text body">Read More  →</div>
				</a> */}
			</div>
		</div>
	)
}