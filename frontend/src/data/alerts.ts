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
	alertLevel: ThreatLevels.CRITICAL,
	message: "Year 11 and 13 to have contingency exams this December and March, as (part) exclusively revealed by us earlier this week",
	linkText: "get the details",
	linkTo: "https://www.instagram.com/p/CVS5neso2H9/?utm_source=ig_web_copy_link"
};

export const KECHGAlerts: AlertResponce = {
	showAlert: true,
	//message: "BREAKING: Student Council Chair Adeen Irfan has resigned, triggering an election.",
	// alertLevel: ThreatLevels.CRITICAL,
	message: "KECHG raises £1160.26 from a doughnut sale for the Macmillan Coffee Morning, selling 490 doughnuts in 5 minutes!",
	alertLevel: ThreatLevels.LOW,
	linkText: "see more",
	linkTo: "https://www.instagram.com/p/CUsfdZwIZ41"
};
