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

		// New Version! - Now it handles recurrences.

		// DEBUG
		// console.log(ics);

		const data = ical.parseICS(ics);

		// DEBUG
		// console.log(data);

		// Initial map of events
		const mapWithoutRecurrences = new Map(Object.entries(data));

		// Blank map populated with recurred events for processing further down.
		const map = new Map<keyof ical.FullCalendar, ical.CalendarComponent>();

		// Process recurrences and build new Map of cal events that *includes* recurrences.
		mapWithoutRecurrences.forEach((event, key) => {
			// When dealing with calendar recurrences, you need a range of dates to query against,

			// because otherwise you can get an infinite number of calendar events.
			var rangeStart = new Date("2020-01-01");
			var rangeEnd = new Date("2030-12-31");

			if (event.type === "VEVENT") {
				// Add every event in the Map into the one with recurrences.
				map.set(key, event);
				let title = event.summary;

				// Here for debug purposes. Code works fine if event.start is undefined
				if (typeof event.start === "undefined") {
					// console.error("event.start undefined:", title);
				}
				let startDate = event.start || new Date();

				// Here for debug purposes. Code works fine if event.end is undefined
				if (typeof event.end === "undefined") {
					// console.error("event.end undefined:", title, event.start?.toISOString());
				}
				let endDate = event.end || new Date();

				// Calculate the duration of the event for use with recurring events.
				let duration = endDate.getTime() - startDate.getTime();

				// **PART OF IF/ELSE BLOCK**
				// Simple case - no recurrences, just print out the calendar event.
				if (typeof event.rrule === 'undefined') {
					if (title?.toLowerCase().startsWith("week") && startDate.getFullYear() === 2022 && startDate.getMonth() > 6) {
						// console.log("title:", title);
						// console.log("startDate:", startDate);
						// console.log("endDate:", endDate);
						// console.log("duration:", duration);
						// console.log("event type:", "non-recurrence");
						// console.log();
					}
					// **ELSE BLOCK BELOW**
				}
				// Complicated case - if an RRULE exists, handle multiple recurrences of the event.
				else if (typeof event.rrule !== 'undefined') {
					// For recurring events, get the set of event start dates that fall within the range
					// of dates we're looking for.
					// console.warn(event);
					// console.warn(event.summary);
					// console.warn(event.rrule);
					// console.warn(typeof event.rrule);
					// console.warn(event.rrule.between);
					const partialFixedRRule = rrule.fromString(event.rrule as unknown as string);
					const fixedRRule = new rrule({
						...partialFixedRRule.options,
						dtstart: event.start,
					});
					// console.warn(fixedRRule);
					// console.warn(fixedRRule.between);
					// console.warn(fixedRRule.options.dtstart);
					// event.rrule = fixedRRule;
					var dates = fixedRRule.between(
						rangeStart,
						rangeEnd,
						true,
						function (date, i) { return true; }
					);

					// The "dates" array contains the set of dates within our desired date range range that are valid
					// for the recurrence rule.  *However*, it's possible for us to have a specific recurrence that
					// had its date changed from outside the range to inside the range.  One way to handle this is
					// to add *all* recurrence override entries into the set of dates that we check, and then later
					// filter out any recurrences that don't actually belong within our range.
					if (event.recurrences != undefined) {
						for (var r in event.recurrences) {
							// Only add dates that weren't already in the range we added from the rrule so that 
							// we don't double-add those events.
							let d = new Date(r);
							if (d.getTime() < rangeStart.getTime() || d.getTime() > rangeEnd.getTime()) {
								dates.push(d);
							}
							// if (moment(new Date(r)).isBetween(rangeStart, rangeEnd) != true) {
							// 	dates.push(new Date(r));
							// }
						}
					}

					// console.debug(dates);

					// Loop through the set of date entries to see which recurrences should be printed.
					for (const date of dates) {

						/// TypeScript is really dumb with this... try and force "start" to be a compatible type,
						/// it complains it's incompatible, set "start" to a `Date`, it complains.
						/// *sigh* Can't do right for doing wrong, as they say in Dudley.
						/// @ts-ignore See above ^^^
						let curEvent: ical.CalendarComponent = { ...event, start: date };
						let showRecurrence = true;
						let curDuration = duration;

						const startDate = new Date(date);

						// Use just the date of the recurrence to look up overrides and exceptions (i.e. chop off time information)
						let dateLookupKey = date.toISOString().substring(0, 10);

						/** Used to make Typescript allow indexing of the incorrectly-typed "array" (it's an object, actually) of events generated by `ical` */
						type FixedCalendarComponentArray = { [key: string]: ical.CalendarComponent; };

						// **PART OF IF/ELSE BLOCK**
						// For each date that we're checking, it's possible that there is a recurrence override for that one day.
						if ((curEvent.recurrences != undefined) && ((curEvent.recurrences as unknown as FixedCalendarComponentArray)[dateLookupKey] != undefined)) {
							// We found an override, so for this recurrence, use a potentially different title, start date, and duration.
							curEvent = (curEvent.recurrences as unknown as FixedCalendarComponentArray)[dateLookupKey];
							const startDate = curEvent.start;
							if (startDate) {
								// curDuration = parseInt(moment(curEvent.end).format("x")) - parseInt(startDate.format("x"));
								curDuration = (curEvent.end?.getTime() || startDate.getTime()) - startDate.getTime();
							}
							// **ELSE BLOCK BELOW**
						}
						// If there's no recurrence override, check for an exception date.  Exception dates represent exceptions to the rule.
						else if ((curEvent.exdate != undefined) && (curEvent.exdate[dateLookupKey] != undefined)) {
							// This date is an exception date, which means we should skip it in the recurrence pattern.
							showRecurrence = false;
						}

						// Set the the title and the end date from either the regular event or the recurrence override.
						const recurrenceTitle = curEvent.summary || "Untitled";
						// endDate = moment(parseInt(startDate.format("x")) + curDuration, 'x');
						endDate = new Date(startDate.getTime() + curDuration);

						// If this recurrence ends before the start of the date range, or starts after the end of the date range, 
						// don't process it.
						// if (endDate.isBefore(rangeStart) || startDate.isAfter(rangeEnd)) {
						// 	showRecurrence = false;
						// }
						if (endDate.getTime() < rangeStart.getTime() || startDate.getTime() > rangeEnd.getTime()) {
							showRecurrence = false;
						}

						if (showRecurrence === true) {
							map.set(startDate.toISOString(), { ...curEvent });
							if (recurrenceTitle.toLowerCase()?.startsWith("week") && startDate.getFullYear() === 2022 && startDate.getMonth() > 6) {
								// console.log("title:", recurrenceTitle);
								// console.log("startDate:", startDate);
								// console.log("endDate:", endDate);
								// console.log("duration:", duration);
								// console.log("event type:", "recurrence");
								// console.log();
							}
						}

					}
				}
			}

			// if (event.recurrences) {
			// 	console.log("recurrences found!", event.recurrences.length);
			// 	console.log("typeof recurrences", typeof event.recurrences);
			// 	console.log("recurrences (O.values)", Object.values(event.recurrences));
			// 	console.log("recurrences (Arr.from)", Array.from(event.recurrences));
			// 	recurrencesFound = true;
			// 	for (const recurrence of Object.values(event.recurrences)) {
			// 		console.log("recurrence");
			// 		console.log(recurrence.start);
			// 		if (typeof recurrence.recurrenceid !== "undefined") {
			// 			console.log("recurrence has an id");
			// 			map.set(recurrence.recurrenceid.toISOString(), recurrence);
			// 		}
			// 	}
			// }
		});

		// DEBUG
		// console.log("map without recurrences size", mapWithoutRecurrences.size);
		// console.log("map with recurrences size", map.size);

		// Narrow down to only events that are around the date we are looking for
		map.forEach((event, key, map) => {
			// Flag that is set to false if the event matches our conditions to then be checked if "Week A" or "Week B" marker event
			let shouldDelete = true;

			/** Intial check: do the ISO strings match? */
			if (event.start?.toISOString() === startTime) {
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
			if (event.start && Math.abs(weekStart.valueOf() - event.start?.valueOf()) <= 24 * 60 * 60 * 1000) {
				shouldDelete = false;
			}

			// if (event.summary?.toLowerCase().startsWith("week")) {
			// 	if (event.start?.getMonth() === 8) {
			// 		shouldDelete = false;
			// 	} else if (event.start?.getMonth() === 9) {
			// 		shouldDelete = false;
			// 	}
			// In the event of issues, uncomment this if-block to spit out all week events for the current year to the console
			// if (event.start?.getFullYear() === new Date().getFullYear() && event.start?.getMonth() >= new Date().getMonth()) {
			// 	// console.log(event.start);
			// 	console.log(event.summary + ":", event.start);
			// 	// console.log(event.rrule);
			// 	// console.log(event.recurrences);
			// 	// console.log(event.recurrenceid);
			// }
			// 	// return;
			// }

			// Delete this key if none of our conditions met
			if (shouldDelete) {
				map.delete(key);
			}
		});

		// Filter events to those that are "Week A" or "Week B"
		let theEvent: ical.CalendarComponent | undefined;
		map.forEach((entry, key) => {
			const summary = entry.summary?.toLowerCase().trim();
			// If summary is undefined or an empty string, we know it's not a week marker.
			if (summary) {
				// This was originally just (summary === "week a" || summary === "week b") but someone put two spaces in one week so now it's this.
				if (summary.startsWith("week") && summary.endsWith("a")) {
					theEvent = entry;
				} else if (summary?.startsWith("week") && summary.endsWith("b")) {
					theEvent = entry;
				}
			} else {
				map.delete(key);
			}
		});

		// Print warning to console if > 1 event found (shouldn't happen!)
		if (map.size > 1) {
			console.warn(`More than one Week A/B marker event found! Got ${map.size} events`);
		}

		if (map.size === 0 || !theEvent) {
			console.info("No events in Map. Assuming holiday.");
			// Neither detected.  Probably Hols.
			return {
				week: "unknown",
				isWeekend: this.isWeekend,
			};
		} else {
			// const theEvent = eventsToday[0];
			// console.debug("One event found:", theEvent);

			switch (theEvent.summary?.toLowerCase().trim().slice(-1)) { // NORMALISE!
				case "a":
					return {
						week: "A",
						isWeekend: this.isWeekend,
					};
					break;
				case "b":
					return {
						week: "B",
						isWeekend: this.isWeekend,
					};
					break;
				default:
					// NEITHER!
					// Something went wrong
					console.warn("Somehow the **1** event found was not a week event");
					return {
						week: "unknown",
						isWeekend: this.isWeekend,
					};
					break;
			}
		}
	}
}