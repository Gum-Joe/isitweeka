import { AlertResponce, ThreatLevels } from "../utils/AlertInterfaces";

/*export const KECHBAlerts: AlertResponce = {
	showAlert: true,
	//message: "BREAKING: Student Council Chair Adeen Irfan has resigned, triggering an election.",
	// alertLevel: ThreatLevels.CRITICAL,
	message: "Welcome to IsItWeekA - it's currently in beta & will be fully launched first week back. Make sure to follow our socials!",
	alertLevel: ThreatLevels.INFO,
};*/

export const KECHBAlerts: AlertResponce = {
	showAlert: true,
	//message: "BREAKING: Student Council Chair Adeen Irfan has resigned, triggering an election.",
	// alertLevel: ThreatLevels.CRITICAL,
	message: "BREAKING NEWS: Camp Hill to be reorganised into the first Edwardian Empire!",
	alertLevel: ThreatLevels.CRITICAL,
	linkText: "view the major announcement",
	linkTo: "https://youtu.be/2qbcHv7wXck"
};

export const KECHGAlerts: AlertResponce = {
	showAlert: false,
	//message: "BREAKING: Student Council Chair Adeen Irfan has resigned, triggering an election.",
	// alertLevel: ThreatLevels.CRITICAL,
	message: "Welcome to IsItWeekA!  We'll use these banner for important alerts in the future.",
	alertLevel: ThreatLevels.LOW,
	//linkText: "more info",
	//linkTo: "https://twitter.com/KEVICHB/status/1359153991104557064?s=20"
};
