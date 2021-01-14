/// Please only user SEVERE, MODERATE, or LOW...
// export type ThreatLevels = "CRITICAL" | "SEVERE" | "SUBSTANTIAL" | "MODERATE" | "LOW";
export enum ThreatLevels {
	"LOW",
	"MODERATE",
	"SUBSTANTIAL",
	"SEVERE",
	"CRITICAL",
}

export interface AlertResponce {
	showAlert: boolean;
	message: string | "";
	threatLevel: ThreatLevels;
}