"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Start this script, don't require it!
 * Fetches KECHB week and stores it in redis
 */
const redis_1 = require("redis");
const core_1 = require("@isitweeka/core");
const cross_fetch_1 = __importStar(require("cross-fetch"));
const logFactory = new core_1.LoggerFactory("./");
/*const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});*/
const logger = logFactory.createLogger("eventbrite");
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
/*if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}*/
function updateEventbrite(redis, orgID, eventID, accessToken, redisKey) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.info("Getting Eventbrite information...");
        const baseResponse = yield (0, cross_fetch_1.default)(`https://www.eventbriteapi.com/v3/organizations/${orgID}/reports/sales?event_ids=${eventID}`, {
            method: "GET",
            mode: "no-cors",
            headers: new cross_fetch_1.Headers({
                "Authorization": `Bearer ${accessToken}`,
            })
        });
        const resJSON = yield baseResponse.json();
        const response = {
            net: resJSON.totals.net,
            ticketQuantity: resJSON.totals.quantity,
        };
        yield redis.HSET(redisKey, response)
            .catch((err) => logger.error('Error storing in redis:', err));
    });
}
function checkEnvVars() {
    if (typeof process.env.IIWA_EVENTBRITE_ORG_ID === "undefined" || typeof process.env.IIWA_EVENTBRITE_EVENT_ID === "undefined" || typeof process.env.IIWA_EVENTBRITE_ACCESS_TOKEN === "undefined") {
        logger.error("Not all env vars specified!");
        logger.error("IIWA_EVENTBRITE_ORG_ID: " + process.env.IIWA_EVENTBRITE_ORG_ID);
        logger.error("IIWA_EVENTBRITE_EVENT_ID: " + process.env.IIWA_EVENTBRITE_EVENT_ID);
        logger.error("IIWA_EVENTBRITE_ACCESS_TOKEN: " + process.env.IIWA_EVENTBRITE_ACCESS_TOKEN);
        throw new Error("Some env var missing - see logs");
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger.info("Starting IsItWeekA service to get money raised data from Eventbrite...");
        checkEnvVars();
        logger.info("Connecting to redis...");
        const client = (0, redis_1.createClient)({
            url: process.env.IIWA_REDIS_URL || "redis://localhost:6379",
        });
        client.on('error', (err) => logger.error('Redis Client Error', err));
        yield client.connect();
        logger.info("Connected to redis.");
        logger.info("Running initial update of eventbrite net revenue & ticket sales data...");
        yield updateEventbrite(client, process.env.IIWA_EVENTBRITE_ORG_ID, process.env.IIWA_EVENTBRITE_EVENT_ID, process.env.IIWA_EVENTBRITE_ACCESS_TOKEN, core_1.REDIS_KEY_EVENTBRITE_CW);
        setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            logger.info("Updating Eventbrite net revenue & ticket sales data...");
            yield updateEventbrite(client, process.env.IIWA_EVENTBRITE_ORG_ID, process.env.IIWA_EVENTBRITE_EVENT_ID, process.env.IIWA_EVENTBRITE_ACCESS_TOKEN, core_1.REDIS_KEY_EVENTBRITE_CW);
        }), 30 * 1000);
    }
    catch (err) {
        console.log('Error ', err);
    }
}))();
