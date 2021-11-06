import { AlertResponce, ThreatLevels } from "../utils/AlertInterfaces";

/*export const KECHBAlerts: AlertResponce = {
	showAlert: true,
	//message: "BREAKING: Student Council Chair Adeen Irfan has resigned, triggering an election.",
	// alertLevel: ThreatLevels.CRITICAL,
	message: "Welcome to IsItWeekA - it's currently in beta & will be fully launched first week back. Make sure to follow our socials!",
	alertLevel: ThreatLevels.INFO,
};*/

export const KECHBAlerts: AlertResponce = {
	showAlert: false,
	//message: "BREAKING: Student Council Chair Adeen Irfan has resigned, triggering an election.",
	// alertLevel: ThreatLevels.CRITICAL,
	//message: "Welcome to IsItWeekA! We'll use these banners for important alerts in the future.",
	alertLevel: ThreatLevels.CRITICAL,
	message: "Good luck to everyone with their university admission tests!",
	linkText: "see more",
	linkTo: "https://www.instagram.com/p/CVzp3lFrNgB"
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
