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
const winston_1 = __importDefault(require("winston"));
const WEEK_MARKER_DATE_KECHB = 1;
const CALENDAR_URL_KECHB = "https://calendar.google.com/calendar/ical/calendar%40camphillboys.bham.sch.uk/public/basic.ics";
const REDIS_KEY = "isitweeka:kechb" || process.env.IIWA_REDIS_KEY;
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: 'combined.log' }),
    ],
});
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple(),
    }));
}
function getKECHBWeek() {
    return __awaiter(this, void 0, void 0, function* () {
        logger.info("Getting week...");
        const inputDate = new Date();
        logger.info(`Date is ${inputDate}`);
        const weekChecker = new libisitweeka_1.default(WEEK_MARKER_DATE_KECHB, CALENDAR_URL_KECHB, inputDate);
        logger.info("Running week checker...");
        const theWeek = yield weekChecker.isItWeekAorB();
        logger.info("Week check done.");
        return theWeek;
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger.info("Starting IsItWeekA service for KECHB...");
        const client = (0, redis_1.createClient)({
            url: process.env.IIWA_REDIS_URL,
        });
        client.on('error', (err) => logger.error('Redis Client Error', err));
        yield client.connect();
        setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
            logger.info("Updating week...");
            const theWeek = yield getKECHBWeek();
            const theWeekRedis = Object.assign(Object.assign({}, theWeek), { isWeekend: 0 });
            if (theWeek.isWeekend === true) {
                theWeekRedis.isWeekend = 1;
            }
            else {
                theWeekRedis.isWeekend = 0;
            }
            yield client.HSET(REDIS_KEY, theWeekRedis)
                .catch((err) => logger.error('Error getting week', err));
            logger.info("Set week in Redis successfully.");
        }), 60 * 1000);
    }
    catch (err) {
        console.log('Error ', err);
    }
}))();
