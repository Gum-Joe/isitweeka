"use strict";
/**
 * Handles setting up a connection to redis
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const redis_1 = require("redis");
/** Store the connection itself to distribute out when requested */
let theClient;
/** Attempts to connect */
let attemptsToConnect = 0;
/**
 * Creates a connection to the DB based on the ECMS config.
 *
 * Make sure the ECMS config (the .env file) is loaded!
 *
 * Prefer using a provided pool instead.
 *
 * @returns a pg pool (A object that let's us create and free connection to the DB)
 */
function connectToRedis() {
    const logger = (0, logger_1.default)("redis");
    logger.info("Creating new Redis connection...");
    logger.info(`Connecting to ${process.env.IIWA_REDIS_URL}`);
    if (typeof theClient !== "undefined") {
        logger.info("Reusing already created Redis Client...");
        return theClient;
    }
    theClient = (0, redis_1.createClient)({
        url: process.env.IIWA_REDIS_URL,
    });
    theClient.on("error", (err) => {
        logger.error("Redis Client Error", err);
        attemptsToConnect++;
        if (err.code === "ECONNREFUSED" && attemptsToConnect > 3) {
            logger.error("Could not connect to Redis!");
            logger.error("Exiting...");
            process.exit(-1);
        }
    });
    theClient.on("connect", () => {
        logger.info("Redis Client Connected - event fired!");
        attemptsToConnect = 0;
    });
    theClient.connect()
        .catch((err) => {
        logger.error("Redis Client connection error", err);
        if (err.code === "ECONNREFUSED" && attemptsToConnect > 3) {
            logger.error("Could not connect to Redis!");
            process.exit(-1);
        }
    });
    return theClient;
}
exports.default = connectToRedis;
