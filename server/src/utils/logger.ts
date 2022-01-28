import { LoggerFactory } from "@isitweeka/core/lib/LogFactory";
import { join } from "path";

/**
 * Creates a logger pointing to the right location for log files.
 * Please make sure env vars are loaded.
 * 
 * @param logPrefix Prefix for lgos (the part of ECMS making log messages)
 */
export default function createLogger(logPrefix: string) {
	/** Load logger */
	const ECMSLoggerFactory = new LoggerFactory(
		process.env.ECMS_LOGS_LOCATION || join(process.cwd(), "logs"),
		(process.env.NODE_ENV === "development" && process.env.ECMS_LOG_SILENT !== "true") ?
			"debug" :
			((process.env.NODE_ENV === "test" || process.env.ECMS_LOG_SILENT === "true") ? "none" : "info")
	);
	return ECMSLoggerFactory.createLogger(logPrefix);
}

