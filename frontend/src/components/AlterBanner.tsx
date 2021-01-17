import React from "react";
import { ThreatLevels } from "../utils/AlertInterfaces";

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
	alertLevel: ThreatLevels;
	alertMessage: string;
}

/**
 * Show an alert banner for import messages, etc
 */
const AlertBanner: React.FC<AlertBannerProps> = (props) => {

	return (
		<div className="r-banner-container">
			<div className={ `${getClassNameFromAlertLevel(props.alertLevel)} r-banner` }>
				<h3 className="desktop">{props.alertMessage}</h3>
				<h3 className="mobile">{props.alertMessage}</h3>
			</div>
		</div>
	);
}

export default AlertBanner;