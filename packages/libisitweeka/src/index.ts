
import * as ical from "ical/ical";
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

		// Get to the start of the week
		const weekStart = this.forwardOrRewindToDay(this.inputDate, this.weekMarkerDate, [6]);
		weekStart.setUTCHours(0, 0, 0, 0); // Set to start of day
		const weekEnd = new Date(weekStart);
		weekEnd.setUTCDate(weekEnd.getUTCDate() + 1);
		weekEnd.setUTCHours(0, 0, 0, 0); // Set to start of day

		// Tell us if weekend!
		const dayNow = this.inputDate.getUTCDay();
		if (dayNow === 6 || dayNow === 0) { // 0 is Sunday, 6 is Saturday
			console.debug("Is Weekend");
			this.isWeekend = true;
		}

		// Representations of the values we are looking for
		const startTime = weekStart.toISOString();
		const endTime = weekEnd.toISOString();

		// DEBUG
		// console.log(weekStart.toISOString());
		// console.log(weekEnd.toISOString());

		// Fetch the iCal file
		const baseResponse = await fetch(this.calendarURL, {
			method: "GET",
			mode: "no-cors",
			credentials: "same-origin",
		});

		const ics = await baseResponse.text();

		// console.log(ics);

		const data = ical.parseICS(ics);

		// console.log(data);

		// Convert to map for easy parsing
		const map = new Map(Object.entries(data));

		let recurrencesFound = false;

		const filterEvents = (v: ical.CalendarComponent, key: string): void => {
			// Flag that is set to false if the event matches our conditions to then be checked if "Week A" or "Week B" marker event
			let shouldDelete = true;

			/** Intial check: do the ISO strings match? */
			if (v.start?.toISOString() === startTime) {
				shouldDelete = false;
			}
			/**
			 * Sometimes, e.g. daylight savings, the start time of the "Week A" event in the calendar is NOT at midnight
			 * (by this I mean normally the start time is, for a all-day Week A/B event on a Monday, normally Monday at 00:00)
			 * E.g. for a Monday Week A event, the start time may be Sunday 23:00 due to daylight saving (see issue #57)
			 *
			 * Here, we check if the event is the day before or day after `weekStart`, and also the day itself for extra measure, to catch the error described above.
			 * THis is done by checking if the UNIX time value of the event is within 24hrs of the target time
			 */
			if (v.start && Math.abs(weekStart.valueOf() - v.start?.valueOf()) <= 24 * 60 * 60 * 1000) {
				shouldDelete = false;
			}

			if (v.summary?.toLowerCase().startsWith("week")) {
				if (v.start?.getMonth() === 8) {
					shouldDelete = false;
				} else if (v.start?.getMonth() === 9) {
					shouldDelete = false;
				}
				// In the event of issues, uncomment this if-block to spit out all week events for the current year to the console
				if (v.start?.getFullYear() === new Date().getFullYear()) {
					console.log(v.start);
					console.log(v.summary);
					console.log(v.rrule);
					console.log(v.recurrences);
					console.log(v.recurrenceid);
				}
				// return;
			}

			if (v.recurrences) {
				console.log("recurrences found!", v.recurrences.length);
				console.log("typeof recurrences", typeof v.recurrences);
				console.log("recurrences (O.values)", Object.values(v.recurrences));
				console.log("recurrences (Arr.from)", Array.from(v.recurrences));
				recurrencesFound = true;
				for (const recurrence of Object.values(v.recurrences)) {
					console.log("recurrence");
					console.log(recurrence.start);
					if (typeof recurrence.recurrenceid !== "undefined") {
						console.log("recurrence has an id");
						map.set(recurrence.recurrenceid.toISOString(), recurrence);
					}
				}
			}

			// Delete this key if none of our conditions met
			if (shouldDelete) {
				map.delete(key);
			}
		};

		// Narrow down to only events that are around the date we are looking for
		map.forEach(filterEvents);

		// If recurrences are found, they're added to the map and we re-run the filter function to include the new events
		if (recurrencesFound) map.forEach(filterEvents);

		const testMap2 = new Map(map.entries());

		console.log(testMap2);

		// Filter events to those that are "Week A" or "Week B"
		let theEvent: ical.CalendarComponent | undefined;
		map.forEach((entry, key) => {
			const summary = entry.summary?.toLowerCase();
			// This was originally just (summary === "week a" || summary === "week b") but someone put two spaces in one week so now it's this.
			if (summary?.startsWith("week") && summary.endsWith("a")) {
				theEvent = entry;
			} else if (summary?.startsWith("week") && summary.endsWith("b")) {
				theEvent = entry;
			} else {
				map.delete(key);
			}
		});
		// Print warning to console if > 1 event found (shouldn't happen!)
		if (map.size > 1) {
			console.warn(`More than one Week A/B marker event found! Got ${map.size} events`);
		}
		if (map.size === 0 || !theEvent) {
			// Neither detected.  Probably Hols.
			return {
				week: "unknown",
				isWeekend: this.isWeekend,
			};
		} else {
			// const theEvent = eventsToday[0];

			switch (theEvent.summary?.toLowerCase()) { // NORMALISE!
				case "week a":
					return {
						week: "A",
						isWeekend: this.isWeekend,
					};
					break;
				case "week b":
					return {
						week: "B",
						isWeekend: this.isWeekend,
					};
					break;
				default:
					// NEITHER!
					// Something went wrong
					return {
						week: "unknown",
						isWeekend: this.isWeekend,
					};
					break;
			}
		}
	}
}