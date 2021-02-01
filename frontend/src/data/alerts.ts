import { AlertResponce, ThreatLevels } from "../utils/AlertInterfaces";

export const KECHBAlerts: AlertResponce = {
	showAlert: false,
	message: "BREAKING: Student Council Chair Adeen Irfan has resigned, triggering an election.",
	alertLevel: ThreatLevels.CRITICAL,
	linkTo: "#",
	linkText: "More Info"
};