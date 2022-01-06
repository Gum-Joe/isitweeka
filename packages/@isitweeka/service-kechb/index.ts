/**
 * Start this script, don't require it!
 * Fetches KECHB week and stores it in redis
 */
import IsItWeekA, { IsItWeekAReturn } from "libisitweeka";
import { createClient } from 'redis';
const WEEK_MARKER_DATE_KECHB = 1;
const CALENDAR_URL_KECHB = "https://calendar.google.com/calendar/ical/calendar%40camphillboys.bham.sch.uk/public/basic.ics";
const REDIS_KEY = "isitweeka:kechb" || process.env.IIWA_REDIS_KEY;

async function getKECHBWeek(): Promise<IsItWeekAReturn> {
  const inputDate = new Date();
  const weekChecker = new IsItWeekA(WEEK_MARKER_DATE_KECHB, CALENDAR_URL_KECHB, inputDate);
	const theWeek = await weekChecker.isItWeekAorB();
  return theWeek;
}



(async () => {
  const client = createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect({
    url: process.env.IIWA_REDIS_URL,
  });

  setInterval(() => {
    const theWeek = getKECHBWeek();
    client.hset(REDIS_KEY, theWeek)
      .then(console.log("Set week in Redis successfully."))
      .catch((err) => console.log('Error getting week', err))
  }, 60 * 1000);
  
})();
