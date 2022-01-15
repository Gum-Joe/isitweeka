/**
 * Start this script, don't require it!
 * Fetches KECHB week and stores it in redis
 */
import IsItWeekA, { GregorianDay, IsItWeekAReturn } from "libisitweeka";
import { createClient, RedisClientType } from "redis";
import { REDIS_KEY_KECHB, WEEK_MARKER_DATE_KECHB, CALENDAR_URL_KECHB, REDIS_KEY_KECHG, WEEK_MARKER_DATE_KECHG, CALENDAR_URL_KECHG, LoggerFactory } from "@isitweeka/core";
import winston from "winston";


const logFactory = new LoggerFactory("./");

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



async function getWeek(redis: ReturnType<typeof createClient>, markerDate: GregorianDay, calendarURL: string, today: Date, redisKey: string): Promise<void> {
  logger.info("Getting week...");
  
  const inputDate = new Date();
  logger.info(`Date is ${inputDate}`);

  const weekChecker = new IsItWeekA(markerDate, calendarURL, today);
  logger.info("Running week checker...");
	const theWeek = await weekChecker.isItWeekAorB();
  logger.info("Week check done.");
  logger.info(`It is week ${theWeek.week} and isWeekend: ${theWeek.isWeekend}`);
  logger.info("Storing in redis...");

  const theWeekRedis = { ...theWeek, isWeekend: 0 };
  if (theWeek.isWeekend === true) {
    theWeekRedis.isWeekend = 1;
  } else {
    theWeekRedis.isWeekend = 0;
  }
  await redis.HSET(redisKey, theWeekRedis)
    .catch((err) => logger.error('Error getting week', err))
  logger.info("Set week in Redis successfully.")

}



(async () => {
  try {
    logger.info("Starting IsItWeekA service for KECHB & G...");
    logger.info("Connecting to redis...");
    const client = createClient({
      url: process.env.IIWA_REDIS_URL  || "redis://localhost:6379",
    });
  
    client.on('error', (err) => logger.error('Redis Client Error', err));
  
    await client.connect();

    logger.info("Connected to redis.");

    logger.info("Running initial week check...");
    logger.info("Updating week for KECHB...");
    await getWeek(client, WEEK_MARKER_DATE_KECHB, CALENDAR_URL_KECHB, new Date(), REDIS_KEY_KECHB);

    logger.info("Updating week for KECHG...");
    await getWeek(client, WEEK_MARKER_DATE_KECHG, CALENDAR_URL_KECHG, new Date(), REDIS_KEY_KECHG);
  
    setInterval(async () => {
      logger.info("Updating week for KECHB...");
      await getWeek(client, WEEK_MARKER_DATE_KECHB, CALENDAR_URL_KECHB, new Date(), REDIS_KEY_KECHB);

      logger.info("Updating week for KECHG...");
      await getWeek(client, WEEK_MARKER_DATE_KECHG, CALENDAR_URL_KECHG, new Date(), REDIS_KEY_KECHG);
      
    }, 30 * 1000);
  } catch (err) {
    console.log('Error ', err);
  }
  
  
})();
