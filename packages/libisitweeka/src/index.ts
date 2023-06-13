import * as ical from "ical/ical";
import rrule from "rrule";
import fetch from "cross-fetch";

/** Return values from IsItWeekA . First type is a return where the week is know, with a specifier if it is a weekend, second is if the week could not be detected (e.g. is holiday) */
export type IsItWeekAReturn = {
	isWeekend: boolean;
	week: "A" | "B";
} | {
	isWeekend: boolean;
	week: "unknown";
};

/** Type to represent a (Gregorian calendar!) day */
export type GregorianDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Base class used to determine if it is Week A or B
 * 
 * How calendar loading works:
 * 1. We have a GitHub Action that every Friday fetches KECHB and KECHG school calendar and uploads it to the repo for deployment.
 * 2. The site fetches this:
 * 	1. goes back to the last `weekMarkerDate` (e.g. Monday - {@link SiteProps.weekMarkerDate}),
 * 		based on the current UTC date.
 * 		It goes forward to the next `weekMarkerDate` if it is a weekend.
 * 	NB: It also checks the area within 24hrs of the targetted date to cope with daylight savings etc
 * 	2. Sees if a Week A or Week B event is in the calendar on the day. If not, return that it's likely a holiday.
 * 
 * @example ```typescript
 * // 1 used as it represented Monday (as the weekmarker)
 * const weekChecker = new IsItWeekA(1, "/cal/KECHB/basic.ics", new Date());
 * const isWeekAOrB = await weekChecker.isItWeekAorB(); // then looks at output object
 * ```
 */
export default class IsItWeekA {

	/** Calendar to fetch events from, e.g. `calendar@camphillboys.bham.sch.uk` */
	public readonly calendarURL: string;
	/** Day of the event with summary (title) "Week A" or "Week B" that marks a week as being A/B, 0-6, where 0 is Sunday */
	public readonly weekMarkerDate: GregorianDay;
	/** Day we're looking for which week it is from (normally today) NOTE: may not be the same as what is inputted due to internal transformations */
	public inputDate: Date;
	/** Is it a weekend today? */
	protected isWeekend = false;

	/** Constructor. See props of the class with the same name for more info */
	constructor(
		weekMarkerDate: GregorianDay,
		calendarURL: string,
		inputDate: Date,
	) {
		this.weekMarkerDate = weekMarkerDate;
		this.calendarURL = calendarURL;
		// inputDate should probably have a default of Date.now()
		this.inputDate = new Date(inputDate); // So we can adjust it
	}

	/**
	 * Gets the monday from a week
	 * From https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
	 * @deprecated Use {@link forwardOrRewindToDay} instead
	 */
	public getMonday(d: Date) {
		const dhere = new Date(d);
		const day = dhere.getDay();
		// Sunday is day 0
		// Sat is Day 6
		// If Sun or Sat go to next week
		/**
		 * What this does is:
		 * - Take the current date
		 * - Subtract the day of the week, taking us to the previous Sunday
		 * - Go forward one to monday
		 * - BUT if the current date is a Saturday, add 8 instead as we want 2 days after that Saturday (the next week), not the previous Monday
		 */
		const diff = dhere.getDate() - day + (day === 6 ? 8 : 1); // adjust when day is saturday -> add 6 to bring us back to Saturday, then add 2 to go to Monday
		return new Date(dhere.setDate(diff));
	}

	/**
	 * Go back to the first of a given day during a week, or to the next of the day for forwardList
	 * Based on https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
	 * @param d Date object representing the day to 'rewind'
	 * @param goTo Day number (0-6, 0 = Sunday) to go to
	 * @param forwardList List of day numbers to forward to `goTo` (instead of backwards).
	 */
	public forwardOrRewindToDay(d: Date, goTo: GregorianDay, forwardList: number[]) {
		const dhere = new Date(d);
		const day = dhere.getUTCDay();
		//console.log(day);
		//console.log(dhere.getUTCDate());
		//console.log(forwardList);
		//console.log(goTo);
		// Sunday is day 0
		// Sat is Day 6
		// If Sun or Sat go to next week
		/**
		 * What this does is:
		 * - Take the current date
		 * - Subtract the day of the week, taking us to the previous Sunday
		 * - Go forward by goTo days to the day we want (works as goTo is effectivly a "Sunday offset")
		 * - BUT if the current date is in the forward list, add 7 as well to go forward 1 week
		 */
		const diff = dhere.getUTCDate() - day + goTo + (forwardList.includes(day) ? 7 : 0); // adjust when day is saturday -> add 6 to bring us back to Saturday, then add 2 to go to Monday
		return new Date(dhere.setUTCDate(diff));
	}

	/**
	 * Loads the KECHB/G calendar (depending on the props provided - see {@link calendarURL}), finds the current week, then goes to the Monday/Sunday (whichever given by `props.weekMarkerDate`) of that week
	 * and checks for an event with the title (`event.summary`) of "Week A" or "Week B".
	 * @see SiteContainer documentation for more information on the algoirthm
	 */
	public async isItWeekAorB(): Promise<IsItWeekAReturn> {

		const addDays = (date: Date, days: number) => {
  		var result = new Date(date);
  		result.setDate(result.getDate() + days);
  		return result;
		}
		
		let startDate = new Date();
		let isWeekend = false;

		// Move to either last monday if in week or next monday if 
		// in weekend
		const inputDay = this.inputDate.getDay();
		if (inputDay === 0) {
			isWeekend = true;
			startDate = addDays(this.inputDate, 1);
		} else if (inputDay === 6) {
			isWeekend = true;
			startDate = addDays(this.inputDate, 2);
		} else {
			isWeekend = false;
			startDate = addDays(this.inputDate, 1 - inputDay);
		}

		const calendarIndex = await fetch(this.calendarURL, {
			method: "GET",
			mode: "no-cors",
			credentials: "same-origin",
		});

		// Parse date into the format YYYYMMDD
		const index = await calendarIndex.json();
		const year = String(startDate.getFullYear());
		const month = String(startDate.getMonth() + 1).padStart(2, '0');
		const day = String(startDate.getDate()).padStart(2, '0');
		const date = year + month + day;

		// Repond with data from index
		if (date in index) {
			return {
				week: index[date],
				isWeekend: isWeekend,
			};
		} else {
			return {
				week: "unknown",
				isWeekend: isWeekend,
			};
		}
	}
}
