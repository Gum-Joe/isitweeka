import winston from "winston";
import "winston-daily-rotate-file";
/** The logger created by core */
export declare type Logger = winston.Logger;
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
export declare class LoggerFactory {
    /**
     * Absolute path to folder for where to put logs.
     *
     * The log file will be generated as so: `${this.logFileLocation}/ecms-log-YYYY-MM-DD_HH-mm-ss.log
     */
    readonly logFileLocation: string;
    /**
     * Log level to use when logging to __console__ (default: debug for dev, info for prod).
     * Can be one of info, debug, none, warn, error.
     * Log files will always use debug logging.
     */
    readonly maxLogLevel: string;
    constructor(logFileLocation: string, maxLogLevel?: string);
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
    createLogger(moduleName: string): winston.Logger;
}
