"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Start this script, don't require it!
 * Fetches KECHB week and stores it in redis
 */
const libisitweeka_1 = __importDefault(require("libisitweeka"));
const redis_1 = require("redis");
const core_1 = require("@isitweeka/core");
const logFactory = new core_1.LoggerFactory("./logs");
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
const logger = logFactory.createLogger("kech");
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
/*if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}*/
function getWeek(redis, markerDate, calendarURL, today, redisKey) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.info("Getting week...");
        const inputDate = new Date();
        logger.info(`Date is ${inputDate}`);
        const weekChecker = new libisitweeka_1.default(markerDate, calendarURL, today);
        logger.info("Running week checker...");
        const theWeek = yield weekChecker.isItWeekAorB();
        logger.info("Week check done.");
        logger.info(`It is week ${theWeek.week} and isWeekend: ${theWeek.isWeekend}`);
        logger.info("Storing in redis...");
        const theWeekRedis = Object.assign(Object.assign({}, theWeek), { isWeekend: 0 });
        if (theWeek.isWeekend === true) {
            theWeekRedis.isWeekend = 1;
        }
        else {
            theWeekRedis.isWeekend = 0;
        }
        yield redis.HSET(redisKey, theWeekRedis)
            .catch((err) => logger.error('Error getting week', err));
        logger.info("Set week in Redis successfully.");
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger.info("Starting IsItWeekA service for KECHB & G...");
        logger.info("Connecting to redis...");
        const client = (0, redis_1.createClient)({
            url: process.env.IIWA_REDIS_URL || "redis://localhost:6379",
        });
        client.on('error', (err) => logger.error('Redis Client Error', err));
        yield client.connect();
        logger.info("Connected to redis.");
        logger.info("Running initial week check...");
        logger.info("Updating week for KECHB...");
        yield getWeek(client, core_1.WEEK_MARKER_DATE_KECHB, core_1.CALENDAR_URL_KECHB, new Date(), core_1.REDIS_KEY_KECHB);
        logger.info("Updating week for KECHG...");
        yield getWeek(client, core_1.WEEK_MARKER_DATE_KECHG, core_1.CALENDAR_URL_KECHG, new Date(), core_1.REDIS_KEY_KECHG);
        setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            logger.info("Updating week for KECHB...");
            yield getWeek(client, core_1.WEEK_MARKER_DATE_KECHB, core_1.CALENDAR_URL_KECHB, new Date(), core_1.REDIS_KEY_KECHB);
            logger.info("Updating week for KECHG...");
            yield getWeek(client, core_1.WEEK_MARKER_DATE_KECHG, core_1.CALENDAR_URL_KECHG, new Date(), core_1.REDIS_KEY_KECHG);
        }), 30 * 1000);
    }
    catch (err) {
        console.log('Error ', err);
    }
}))();
