"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogFactory_1 = require("@isitweeka/core/lib/LogFactory");
const path_1 = require("path");
/**
 * Creates a logger pointing to the right location for log files.
 * Please make sure env vars are loaded.
 *
 * @param logPrefix Prefix for lgos (the part of ECMS making log messages)
 */
function createLogger(logPrefix) {
    /** Load logger */
    const ECMSLoggerFactory = new LogFactory_1.LoggerFactory(process.env.ECMS_LOGS_LOCATION || (0, path_1.join)(process.cwd(), "logs"), (process.env.NODE_ENV === "development" && process.env.ECMS_LOG_SILENT !== "true") ?
        "debug" :
        ((process.env.NODE_ENV === "test" || process.env.ECMS_LOG_SILENT === "true") ? "none" : "info"));
    return ECMSLoggerFactory.createLogger(logPrefix);
}
exports.default = createLogger;
