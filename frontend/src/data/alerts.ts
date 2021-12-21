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
	alertLevel: ThreatLevels.LOW,
	message: "Have a nice holiday everyone.",
	//linkText: "more info",
	//linkTo: "https://www.instagram.com/p/CW8oED8IooV"
};

export const KECHGAlerts: AlertResponce = {
	showAlert: true,
	//message: "BREAKING: Student Council Chair Adeen Irfan has resigned, triggering an election.",
	// alertLevel: ThreatLevels.CRITICAL,
	message: "Headteacher Mrs Johnson to retire at the end of the academic year",
	alertLevel: ThreatLevels.CRITICAL,
	linkText: "read more now",
	linkTo: "https://www.instagram.com/p/CXrTk2hrjm5"
};
