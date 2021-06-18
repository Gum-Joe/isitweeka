import React, { useState } from "react";
import { AlertResponce, ThreatLevels } from "../utils/AlertInterfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

/**
 * Gets the className to use for a given alert level.
 * Only accepts a {@link ThreatLevels}
 *
 * @returns The className
 * @example Given `LOW` return ``r-banner-alert-LOW`.
 */
function getClassNameFromAlertLevel(level: ThreatLevels): `r-banner-alert-${ThreatLevels}` {
	switch (level) {
		case ThreatLevels.LOW:
			return "r-banner-alert-LOW";
		case ThreatLevels.INFO:
			return "r-banner-alert-INFO";
		case ThreatLevels.MODERATE:
			return "r-banner-alert-MODERATE";
		case ThreatLevels.SUBSTANTIAL:
			return "r-banner-alert-SUBSTANTIAL";
		case ThreatLevels.SEVERE:
			return "r-banner-alert-SEVERE";
		case ThreatLevels.CRITICAL:
			return "r-banner-alert-CRITICAL";
	}
}

export interface AlertBannerProps {
	alert: AlertResponce
}

/**
 * Show an alert banner for import messages, etc
 */
const AlertBanner: React.FC<AlertBannerProps> = (props) => {

	const [dismissed, setDismissState] = useState(false);
	const [expanded, setExpandState] = useState(false);

	function handleDismiss() {
		console.log("Banner dismissed");
		setDismissState(true);
		gtag("event", "alert_dimissed", {
			"value": "true",
			"label": "alert_dimissed",
		});
	}

	/**
	 * Reports to Google analytics when the "View More" link was clicked so we can track conversions
	 */
	function reportAlertButtonClick() {
		if (!expanded) {
			setExpandState(true);
			return;
		}
		console.log("Alert button clicked");
		gtag("event", "alert_link_clicked", {
			"event_category": "engagement",
			"value": "true",
			"label": "alert_link_clicked",
		});
	}

	const showExpandButtonMobile = props.alert.message.length > 30 && !expanded;

	return (
		<>
			<div className="r-banner-container" style={{
				...(
					dismissed ? { display: "none" } : {} // Handle hiding it
				),
			}}>
				<div
					className={`${getClassNameFromAlertLevel(props.alert.alertLevel)} r-banner`}>
					<h3 className="desktop">
						{props.alert.message}{/*&nbsp;*/}
						{props.alert.linkTo ?
							<a className="r-banner-link" href={props.alert.linkTo} target="__blank" onClick={reportAlertButtonClick}>{props.alert.linkText || "View More"}</a>
							: null
						}
					</h3>

					<h3 className="mobile">
						<span>{showExpandButtonMobile ? "New Alert(s)" : props.alert.message}</span>&nbsp;
						<br />
						<a className="r-banner-link" href={expanded ? props.alert.linkTo : undefined} target="__blank" onClick={(event) => { !expanded && event.preventDefault(); reportAlertButtonClick(); }}>
							<span>{expanded ? props.alert.linkText || "View" : "Expand"}</span>
						</a>
					</h3>
					<h3 className="desktop"><FontAwesomeIcon onClick={handleDismiss} className="r-banner-dismiss" icon={faTimes} /></h3>
					<h3 className="mobile"><FontAwesomeIcon onClick={handleDismiss} className="r-banner-dismiss" icon={faTimes} /></h3>
				</div>
			</div>
			{dismissed ? null : <div className="mobile not-x" style={{ height: 144 }} />}
		</>
	);
};

export default AlertBanner;
