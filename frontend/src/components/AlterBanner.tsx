import React from "react";
import { AlertResponce, ThreatLevels } from "../utils/AlertInterfaces";

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

	return (
		<div className="r-banner-container">
			<a target="__blank" href={props.alert.linkTo || undefined}
				className={`${getClassNameFromAlertLevel(props.alert.alertLevel)} r-banner ${typeof props.alert.linkTo !== "undefined" ? "r-banner-linked-alert" : ""}` }>
				<h3 className="desktop">{props.alert.message}</h3>
				<h3 className="mobile">{props.alert.message}</h3>
			</a>
		</div>
	);
};

export default AlertBanner;