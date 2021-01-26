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
		console.log("Alert button clicked");
		gtag("event", "alert_link_clicked", {
			"event_category": "engagement",
			"value": "true",
			"label": "alert_link_clicked",
		});
	}


	return (
		<div className="r-banner-container" style={{
			...(
				dismissed === true ? { display: "none" } : {} // Handle hiding it
			)
		}}>
			<div 
				className={`${getClassNameFromAlertLevel(props.alert.alertLevel)} r-banner`}>
				<h3 className="desktop">
					{props.alert.message}{/*&nbsp;*/}
					{ typeof props.alert.linkTo !== "undefined" ? 
						<a className="r-banner-link" onClick={reportAlertButtonClick}>{props.alert.linkText || "View More"}</a>
						: null
					}
				</h3>
				
				<h3 className="mobile">
					<span>{props.alert.message}</span>&nbsp;
					<br />
					{ typeof props.alert.linkTo !== "undefined" ? 
						<a className="r-banner-link" onClick={reportAlertButtonClick}>
							<span>{"View"}</span>
						</a> : null }
				</h3>
				<h3 className="desktop"><FontAwesomeIcon onClick={handleDismiss} className="r-banner-dismiss" icon={faTimes} /></h3>
				<h3 className="mobile"><FontAwesomeIcon onClick={handleDismiss} className="r-banner-dismiss" icon={faTimes} /></h3>
			</div>
		</div>
	);
};

export default AlertBanner;