import { AlertResponce, ThreatLevels } from "../utils/AlertInterfaces";

export const dummyAlert: AlertResponce = {
	showAlert: true,
	message: "ATTENTION: ALL EXAMS ARE CANCELLED - Albus Dumbledore",
	alertLevel: ThreatLevels.CRITICAL,
}