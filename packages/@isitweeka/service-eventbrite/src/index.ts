/**
 * Start this script, don't require it!
 * Fetches KECHB week and stores it in redis
 */
import { createClient, RedisClientType } from "redis";
import { REDIS_KEY_EVENTBRITE_CW, LoggerFactory } from "@isitweeka/core";
import fetch, { Headers } from "cross-fetch";


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



async function updateEventbrite(redis: ReturnType<typeof createClient>, orgID: string, eventID: string, accessToken: string, redisKey: string): Promise<void> {
  logger.info("Getting Eventbrite information...");
  const baseResponse = await fetch(`https://www.eventbriteapi.com/v3/organizations/${orgID}/reports/sales?event_ids=${eventID}`, {
    method: "GET",
    mode: "no-cors",
    headers: new Headers({
      "Authorization": `Bearer ${accessToken}`,
    })
  });

  const resJSON = await baseResponse.json();
  
  const response = {
    net: resJSON.totals.net,
    ticketQuantity: resJSON.totals.quantity,
  }

  await redis.HSET(redisKey, response)
    .catch((err) => logger.error('Error storing in redis:', err))

}

interface EnvVars {
  IIWA_EVENTBRITE_ORG_ID: string;
  IIWA_EVENTBRITE_EVENT_ID: string;
  IIWA_EVENTBRITE_ACCESS_TOKEN: string;
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

(async () => {
  try {
    logger.info("Starting IsItWeekA service to get money raised data from Eventbrite...");

    checkEnvVars();

    logger.info("Connecting to redis...");
    const client = createClient({
      url: process.env.IIWA_REDIS_URL  || "redis://localhost:6379",
    });
  
    client.on('error', (err) => logger.error('Redis Client Error', err));
  
    await client.connect();

    logger.info("Connected to redis.");

    logger.info("Running initial update of eventbrite net revenue & ticket sales data...");
      await updateEventbrite(
        client,
        process.env.IIWA_EVENTBRITE_ORG_ID as string,
        process.env.IIWA_EVENTBRITE_EVENT_ID as string,
        process.env.IIWA_EVENTBRITE_ACCESS_TOKEN as string,
        REDIS_KEY_EVENTBRITE_CW);
    
  
    setInterval(async () => {
      logger.info("Updating Eventbrite net revenue & ticket sales data...");
      await updateEventbrite(
        client,
        process.env.IIWA_EVENTBRITE_ORG_ID as string,
        process.env.IIWA_EVENTBRITE_EVENT_ID as string,
        process.env.IIWA_EVENTBRITE_ACCESS_TOKEN as string,
        REDIS_KEY_EVENTBRITE_CW);
      
    }, 30 * 1000);
  } catch (err) {
    console.log('Error ', err);
  }
  
  
})();
