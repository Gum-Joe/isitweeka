import { AlertResponce, ThreatLevels } from "../utils/AlertInterfaces";

/*export const KECHBAlerts: AlertResponce = {
	showAlert: true,
	//message: "BREAKING: Student Council Chair Adeen Irfan has resigned, triggering an election.",
	// alertLevel: ThreatLevels.CRITICAL,
	message: "Welcome to IsItWeekA - it's currently in beta & will be fully launched first week back. Make sure to follow our socials!",
	alertLevel: ThreatLevels.INFO,
};*/

// export const KECHBAlerts: AlertResponce = {
// 	showAlert: false,
// 	//message: "BREAKING: Student Council Chair Adeen Irfan has resigned, triggering an election.",
// 	// alertLevel: ThreatLevels.CRITICAL,
// 	//message: "Welcome to IsItWeekA! We'll use these banners for important alerts in the future.",
// 	alertLevel: ThreatLevels.INFO,
// 	message: "Charity Week update: discussions for new dates for events are ongoing.",
// 	//linkText: "more info",
// 	//linkTo: "https://www.instagram.com/p/CZSJNPMLH8C"
// };

export const KECHBAlerts: AlertResponce = {
	showAlert: true,
	alertLevel: ThreatLevels.INFO,
	message: "Donate now to the Walk to Ukraine fundraiser",
	linkText: "Donate Now  →",
	linkTo: "https://www.justgiving.com/fundraising/chb-charity-committee?utm_medium=qrcode&utm_source=offline&utm_term=d00419302"
};

export const KECHGAlerts: AlertResponce = {
	showAlert: false,
	//message: "BREAKING: Student Council Chair Adeen Irfan has resigned, triggering an election.",
	// alertLevel: ThreatLevels.CRITICAL,
	message: "Remember to get your tickets for Songs from the Shows!",
	alertLevel: ThreatLevels.INFO,
	//linkText: "more info",
	//linkTo: "https://www.instagram.com/p/CYcI989LXwh"
};
