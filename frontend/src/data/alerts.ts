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
	//message: "Welcome to IsItWeekA! We'll use these banners for important alerts in the future.",
	alertLevel: ThreatLevels.INFO,
	message: "Howard takes the lead in Senior Football after thrashing Tudor 4-0, whilst Beaufort and Seymour draw at 0-0.",
	linkText: "see tweets",
	linkTo: "https://twitter.com/IsItWeekA/status/1442875276963168258"
};

export const KECHGAlerts: AlertResponce = {
	showAlert: true,
	//message: "BREAKING: Student Council Chair Adeen Irfan has resigned, triggering an election.",
	// alertLevel: ThreatLevels.CRITICAL,
	message: "Welcome to IsItWeekA! We'll use these banners for important alerts in the future.",
	alertLevel: ThreatLevels.LOW,
	//linkText: "more info",
	//linkTo: "https://twitter.com/KEVICHB/status/1359153991104557064?s=20"
};
