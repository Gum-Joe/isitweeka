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
	message: "Anyone to be able to stand in upcoming Student Council election, not just SC members.",
	linkText: "read more",
	linkTo: "https://www.instagram.com/isitweeka/p/CYt5gRaIvJK/?utm_medium=copy_link"
};

export const KECHGAlerts: AlertResponce = {
	showAlert: true,
	//message: "BREAKING: Student Council Chair Adeen Irfan has resigned, triggering an election.",
	// alertLevel: ThreatLevels.CRITICAL,
	message: "\"Oliver!\" to be the next KECHB Musical - hopefully with KECHG as well",
	alertLevel: ThreatLevels.INFO,
	linkText: "more info",
	linkTo: "https://www.instagram.com/p/CYcI989LXwh"
};
