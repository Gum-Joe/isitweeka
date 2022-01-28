/**
 * Handles setting up a connection to redis
 */
import { RedisClientType } from "redis";
/**
 * Creates a connection to the DB based on the ECMS config.
 *
 * Make sure the ECMS config (the .env file) is loaded!
 *
 * Prefer using a provided pool instead.
 *
 * @returns a pg pool (A object that let's us create and free connection to the DB)
 */
export default function connectToRedis(): RedisClientType<any, any>;
