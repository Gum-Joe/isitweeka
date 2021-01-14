import { AlertResponce, ThreatLevels } from "../utils/AlertInterfaces";

export const dummyAlert: AlertResponce = {
	showAlert: true,
	message: "!!! ATTENTION !!!",
	threatLevel: ThreatLevels.SEVERE,
}