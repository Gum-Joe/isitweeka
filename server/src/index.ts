/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * Entry point for ECMS - starts ECMS up
 * @packageDocumentation
 */

// Preable log line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - get weird error since package.json outside src/ (and therefore rootDir)
import packageJSON from "../package.json";
console.log(`IsItWeekA as a Service v${packageJSON.version}`);
console.log("Starting IsItWeekA...");

/** Intitalise our config into environmntal variables */
import dotenv from "dotenv";
dotenv.config();

import createLogger from "./utils/logger";
const logger = createLogger("server");

logger.debug("IsItWeekA Logger Loaded.");

import connectToRedis from "./utils/redis";

// Init redis & DB
logger.info("Loading Connections...");
const redis = connectToRedis();

import { join } from "path";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import { REDIS_KEY_EVENTBRITE_CW, REDIS_KEY_KECHB, REDIS_KEY_KECHG } from "@isitweeka/core";
import { IsItWeekAReturn } from "libisitweeka";

/** Initiale Express */
const app = express();

logger.info("Setting up CORS...");
// From https://www.npmjs.com/package/cors
// DO NOT ADD AN EMPTY STRING TO THIS!
const whitelist = ['http://isitweeka.com', 'http://localhost:4000', 'https://isitweeka.com', ""]
const corsOptions: cors.CorsOptions = {
  origin: whitelist
}

app.use(cors(corsOptions));
// @ts-ignore: Types wrong?
//app.options("*", cors(corsOptions));

// TEST ROUTE
app.get("/heartbeat", (req, res, next) => {
	res.json({
		message: "Server alive",
	});
});

app.get('/isitweeka/kechb', async (req, res, next) => {
  logger.info("Getting week from redis...");
	try {
		const fromRedis = await redis.HGETALL(REDIS_KEY_KECHB);
		let finalResponse: IsItWeekAReturn;

		if (fromRedis.isWeekend === "1") {
			finalResponse = {
				...(fromRedis as unknown as IsItWeekAReturn),
				isWeekend: true
			}
		} else {
			finalResponse = {
				...(fromRedis as unknown as IsItWeekAReturn),
				isWeekend: false
			}
		}
		res.json(finalResponse);
		logger.info(`Done. Got It Is Week ${finalResponse.week} and isWeekend: ${finalResponse.isWeekend} from redis.`);
	} catch (err) {
		next(err);
	}
});

const handleServingWeek = (redisKey: string) => async (req: Request, res: Response, next: NextFunction) => {
	logger.info("Getting week from redis key ${REDIS_KEY_KECHG}...");
	try {
		const fromRedis = await redis.HGETALL(redisKey);
		let finalResponse: IsItWeekAReturn;

		if (fromRedis.isWeekend === "1") {
			finalResponse = {
				...(fromRedis as unknown as IsItWeekAReturn),
				isWeekend: true
			};
		} else {
			finalResponse = {
				...(fromRedis as unknown as IsItWeekAReturn),
				isWeekend: false
			};
		}
		res.json(finalResponse);
		logger.info(`Done. Got It Is Week ${finalResponse.week} and isWeekend: ${finalResponse.isWeekend} from redis.`);
	} catch (err) {
		next(err);
	}
};
app.get('/isitweeka/kechb', handleServingWeek(REDIS_KEY_KECHB));
app.get('/isitweeka/kechg', handleServingWeek(REDIS_KEY_KECHG));
app.get("/eventbrite/cw", async (req, res, next) => {
	logger.info("Getting eventbrite CW data from redis...");
	try {
		const fromRedis = await redis.HGETALL(REDIS_KEY_EVENTBRITE_CW);
		res.json(fromRedis);
		logger.info(`Done.`);
	} catch (err) {
		next(err);
	}
});



// Baseline middleware
//app.use(helmet()); // Security
app.use(express.json());
app.use(express.urlencoded());
// Setup logging here
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

app.listen(4000, () => {
	logger.info("Server started.");
});


