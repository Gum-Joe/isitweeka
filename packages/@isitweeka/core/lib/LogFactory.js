"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerFactory = void 0;
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
const chalk_1 = __importDefault(require("chalk"));
const winston_1 = __importDefault(require("winston"));
require("winston-daily-rotate-file");
const { combine, colorize, printf, timestamp } = winston_1.default.format;
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
class LoggerFactory {
    constructor(logFileLocation, maxLogLevel) {
        /**
         * Log level to use when logging to __console__ (default: debug for dev, info for prod).
         * Can be one of info, debug, none, warn, error.
         * Log files will always use debug logging.
         */
        this.maxLogLevel = (process.env.NODE_ENV === "development") ?
            "debug" :
            (process.env.NODE_ENV === "test" ? "none" : "info");
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
    createLogger(moduleName) {
        const options = {
            transports: [
                // Console Logger
                new winston_1.default.transports.Console({
                    format: combine(colorize(), timestamp(), printf((info) => {
                        return `${chalk_1.default.grey(info.timestamp)} ${chalk_1.default.magenta(moduleName)} ${info.level} ${info.message}`;
                    })),
                    level: this.maxLogLevel,
                }),
                new winston_1.default.transports.DailyRotateFile({
                    filename: "ecms-log-%DATE%.log",
                    dirname: this.logFileLocation,
                    datePattern: "YYYY-MM-DD",
                    zippedArchive: true,
                    maxFiles: "365d",
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
        const newLogger = winston_1.default.createLogger(options);
        // Disable logging if testing
        if (process.env.IIWA_LOG_SILENT === "true" || process.env.NODE_ENV === "test") {
            newLogger.transports[0].silent = true; // turns off
        }
        else {
            newLogger.transports[0].silent = false;
        }
        return newLogger;
    }
}
exports.LoggerFactory = LoggerFactory;
