/// Please only user SEVERE, MODERATE, or LOW...
// export type ThreatLevels = "CRITICAL" | "SEVERE" | "SUBSTANTIAL" | "MODERATE" | "LOW";
export enum ThreatLevels {
	LOW = "LOW",
	INFO = "INFO",
	MODERATE = "MODERATE",
	SUBSTANTIAL = "SUBSTANTIAL",
	SEVERE = "SEVERE",
	CRITICAL = "CRITICAL",
}

export interface AlertResponce {
	showAlert: boolean;
	message: string | "";
	alertLevel: ThreatLevels;
	/** Provides a website to link to when clicked */
	linkTo?: string;
}