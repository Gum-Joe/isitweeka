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
	message: "Have a nice holiday everyone!",
	alertLevel: ThreatLevels.LOW,
	linkText: "see tweets",
	linkTo: "https://twitter.com/IsItWeekA"
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
