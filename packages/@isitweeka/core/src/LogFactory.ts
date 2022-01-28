/**
 * Contains the logger we use
 * 
 * This is the logger all modules should use when logging,
 * so it's clear from which module the log line came from
 * and the format is consitent.
 * 
 * Pass an instance of the Logger to all extensions.
 * @packageDocumentation
 */
import chalk from "chalk";
import winston from "winston";
import "winston-daily-rotate-file";

const { combine, colorize, printf, timestamp } = winston.format;

/** The logger created by core */
export type Logger = winston.Logger;

/**
 * Used to create Loggers.
 * This is done so the server can set the log file location itself, e.g. from config
 * 
 * @example ```ts
 * 	const LoggingFactory = new LoggerFactory("./logs/")
 * 	const logger = LoggingFactory.createLogger("server")
 * 	logger.info("Log line") // 2021-10-15T21:33:13.842Z server info Log line.
 * ```
 */
export class LoggerFactory {
	
	/**
	 * Absolute path to folder for where to put logs.
	 * 
	 * The log file will be generated as so: `${this.logFileLocation}/ecms-log-YYYY-MM-DD_HH-mm-ss.log
	 */
	public readonly logFileLocation: string;
	/**
	 * Log level to use when logging to __console__ (default: debug for dev, info for prod).
	 * Can be one of info, debug, none, warn, error.
	 * Log files will always use debug logging.
	 */
	public readonly maxLogLevel: string = (process.env.NODE_ENV === "development") ?
		"debug" :
		(process.env.NODE_ENV === "test" ? "none" : "info");

	constructor(logFileLocation: string, maxLogLevel?: string) {
		this.logFileLocation = logFileLocation;
		if (maxLogLevel) {
			this.maxLogLevel = maxLogLevel;
		}
		
	}

	/**
	 * Creates a new Logger Instance, for a particular module.
	 * This is what we use to do Logger
	 * 
	 * The format is:
	 * `timestamp moduleName level Message`
	 * 
	 * E.g:
	 * `2021-10-15T21:33:13.842Z server info Log line.` (where server is moduleName)
	 * 
	 * From https://github.com/rykan-tech/authentication/blob/master/login/src/util/constants.ts
	 * 
	 * @param moduleName Name of module (part of the system) logging is for.
	 * 	Module here is different from a Node.JS package or ECMS Extensions - it is a distinct part of the ECMS system.
	 * 
	 * @example "server"
	 * @example "core"
	 * @example "config"
	 * @example "auth"
	*/
	public createLogger(moduleName: string): winston.Logger {
		const options: winston.LoggerOptions = {
			transports: [
				// Console Logger
				new winston.transports.Console({
					format: combine(
						colorize(),
						timestamp(),
						printf((info) => {
							return `${chalk.grey(info.timestamp)} ${chalk.magenta(moduleName)} ${info.level} ${info.message}`;
						}),
					),
					level: this.maxLogLevel,
				}),
				new winston.transports.DailyRotateFile({
					filename: "ecms-log-%DATE%.log", 
					dirname: this.logFileLocation,
					datePattern: "YYYY-MM-DD", // see https://momentjs.com/docs/#/displaying/format/ - controls when logs rotated (once a month as system won't be used daily)
					zippedArchive: true,
					maxFiles: "365d", // Keep the last year of logs
					/*format: combine(
						timestamp(),
						printf((info) => {
							info.moduleName = moduleName;
							return `${info.timestamp} ${moduleName} ${info.level} ${info.message}`;
						}),
					),*/
					level: "debug",
				}),
			],
		};
		const newLogger = winston.createLogger(options);

		// Disable logging if testing
		if (process.env.IIWA_LOG_SILENT === "true" || process.env.NODE_ENV === "test") {
			newLogger.transports[0].silent = true;  // turns off
		} else {
			newLogger.transports[0].silent = false;
		}

		return newLogger;
	}
}