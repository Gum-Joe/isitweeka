import React from "react";
import { EventItem, EventTypes } from "../EventsList";

type CardTypes = "legacy" | "new";

export type NewCardExt = { cardType: CardTypes; stats?: Array<{ title: string; value: string }> };

// TODO: Implement Button.
export const Card: React.FunctionComponent<EventItem & NewCardExt> = (props) => {
	if (props.hidden) return null;
	
	const panelStyle = props.backgroundColor ? {
		backgroundColor: props.backgroundColor,
		color: props.textColour,
	} : undefined;
	
	switch (props.cardType) {
		case "legacy":
			return (
				<div className="card" style={{ backgroundColor: props.textColour }}>
					<div className="panel title text big" style={panelStyle}>{props.title}</div>
					{props.description ? <div className="panel description text body" style={panelStyle}>{props.description}</div> : null}
					<div className="panel stats" style={panelStyle}>
						{props.when ? <div className="stat">
							<div className="stat-label text big">When</div>
							<div className="stat-value text big">{props.when}</div>
						</div> : null}
					</div>
					{props.eventType === EventTypes.HOUSE ? <div className="panel stats" style={panelStyle}>
						<div className="stat">
							<div className="stat-label">Victor</div>
							<div className="stat-value">{props.currentVictor}</div>
						</div>
					</div> : null}
				</div>
			);
	}
	return (
		<div className="card">
			<div className="panel title">{props.title}</div>
			<div className="panel description">{props.description}</div>
			{props.stats ? <div className="panel stats">{props.stats.map((stat, index) => {
				return (
					<div className="stat" key={stat.title}>
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
		</div>
	)
}