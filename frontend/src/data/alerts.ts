import { AlertResponce, ThreatLevels } from "../utils/AlertInterfaces";

export const dummyAlert: AlertResponce = {
	showAlert: true,
	message: "BREAKING: Student Council Chair Adeen Irfan has resigned, triggering an election.",
	alertLevel: ThreatLevels.CRITICAL,
	linkTo: "#",
}