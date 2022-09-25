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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ical = __importStar(require("ical/ical"));
const rrule_1 = __importDefault(require("rrule"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
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
class IsItWeekA {
    /** Constructor. See props of the class with the same name for more info */
    constructor(weekMarkerDate, calendarURL, inputDate) {
        /** Is it a weekend today? */
        this.isWeekend = false;
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
    getMonday(d) {
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
    forwardOrRewindToDay(d, goTo, forwardList) {
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
    isItWeekAorB() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
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
            const baseResponse = yield cross_fetch_1.default(this.calendarURL, {
                method: "GET",
                mode: "no-cors",
                credentials: "same-origin",
            });
            const ics = yield baseResponse.text();
            // New Version!
            console.log(ics);
            const data = ical.parseICS(ics);
            console.log(data);
            const mapWithoutRecurrences = new Map(Object.entries(data));
            const map = new Map();
            // Process recurrences and add to the Map.
            mapWithoutRecurrences.forEach((event, key) => {
                var _a, _b, _c;
                // Add every event in the Map into the one with recurrences.
                map.set(key, event);
                // because otherwise you can get an infinite number of calendar events.
                var rangeStart = new Date("2020-01-01");
                var rangeEnd = new Date("2030-12-31");
                if (event.type === "VEVENT") {
                    let title = event.summary;
                    if (typeof event.start === "undefined") {
                        console.error("event.start undefined:", title);
                    }
                    let startDate = event.start || new Date();
                    if (typeof event.end === "undefined") {
                        console.error("event.end undefined:", title, (_a = event.start) === null || _a === void 0 ? void 0 : _a.toISOString());
                    }
                    let endDate = event.end || new Date();
                    // Calculate the duration of the event for use with recurring events.
                    let duration = endDate.getTime() - startDate.getTime();
                    // Simple case - no recurrences, just print out the calendar event.
                    if (typeof event.rrule === 'undefined') {
                        if ((title === null || title === void 0 ? void 0 : title.toLowerCase().startsWith("week")) && startDate.getFullYear() === 2022 && startDate.getMonth() > 6) {
                            console.log("title:", title);
                            console.log("startDate:", startDate);
                            console.log("endDate:", endDate);
                            console.log("duration:", duration);
                            console.log("event type:", "non-recurrence");
                            console.log();
                        }
                    }
                    // Complicated case - if an RRULE exists, handle multiple recurrences of the event.
                    else if (typeof event.rrule !== 'undefined') {
                        // For recurring events, get the set of event start dates that fall within the range
                        // of dates we're looking for.
                        console.warn(event);
                        console.warn(event.summary);
                        console.warn(event.rrule);
                        console.warn(typeof event.rrule);
                        console.warn(event.rrule.between);
                        const partialFixedRRule = rrule_1.default.fromString(event.rrule);
                        const fixedRRule = new rrule_1.default(Object.assign(Object.assign({}, partialFixedRRule.options), { dtstart: event.start }));
                        console.warn(fixedRRule);
                        console.warn(fixedRRule.between);
                        console.warn(fixedRRule.options.dtstart);
                        // event.rrule = fixedRRule;
                        var dates = fixedRRule.between(rangeStart, rangeEnd, true, function (date, i) { return true; });
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
                        console.debug(dates);
                        // Loop through the set of date entries to see which recurrences should be printed.
                        for (const date of dates) {
                            /// @ts-expect-error TypeScript is really dumb with this... try and force "start" to be a compatible type, it complains it's incompatible, set "start" to a `Date`, it complains. can't do right for wrong
                            let curEvent = Object.assign(Object.assign({}, event), { start: date });
                            let showRecurrence = true;
                            let curDuration = duration;
                            const startDate = new Date(date);
                            // Use just the date of the recurrence to look up overrides and exceptions (i.e. chop off time information)
                            let dateLookupKey = date.toISOString().substring(0, 10);
                            // For each date that we're checking, it's possible that there is a recurrence override for that one day.
                            if ((curEvent.recurrences != undefined) && (curEvent.recurrences[dateLookupKey] != undefined)) {
                                // We found an override, so for this recurrence, use a potentially different title, start date, and duration.
                                curEvent = curEvent.recurrences[dateLookupKey];
                                const startDate = curEvent.start;
                                if (startDate) {
                                    // curDuration = parseInt(moment(curEvent.end).format("x")) - parseInt(startDate.format("x"));
                                    curDuration = (((_b = curEvent.end) === null || _b === void 0 ? void 0 : _b.getTime()) || startDate.getTime()) - startDate.getTime();
                                }
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
                                map.set(startDate.toISOString(), Object.assign({}, curEvent));
                                if (((_c = recurrenceTitle.toLowerCase()) === null || _c === void 0 ? void 0 : _c.startsWith("week")) && startDate.getFullYear() === 2022 && startDate.getMonth() > 6) {
                                    console.log("title:", recurrenceTitle);
                                    console.log("startDate:", startDate);
                                    console.log("endDate:", endDate);
                                    console.log("duration:", duration);
                                    console.log("event type:", "recurrence");
                                    console.log();
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
            // 	// Narrow down to only events that are around the date we are looking for
            // 	map.forEach(filterEvents);
            // 	// If recurrences are found, they're added to the map and we re-run the filter function to include the new events
            // 	if (recurrencesFound) map.forEach(filterEvents);
            // const testMap2 = new Map(map.entries());
            // console.log(testMap2);
            console.log("map without recurrences size", mapWithoutRecurrences.size);
            console.log("map with recurrences size", map.size);
            map.forEach((event, key, map) => {
                var _a, _b, _c, _d;
                // Flag that is set to false if the event matches our conditions to then be checked if "Week A" or "Week B" marker event
                let shouldDelete = true;
                /** Intial check: do the ISO strings match? */
                if (((_a = event.start) === null || _a === void 0 ? void 0 : _a.toISOString()) === startTime) {
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
                if (event.start && Math.abs(weekStart.valueOf() - ((_b = event.start) === null || _b === void 0 ? void 0 : _b.valueOf())) <= 24 * 60 * 60 * 1000) {
                    shouldDelete = false;
                }
                // if (event.summary?.toLowerCase().startsWith("week")) {
                // 	if (event.start?.getMonth() === 8) {
                // 		shouldDelete = false;
                // 	} else if (event.start?.getMonth() === 9) {
                // 		shouldDelete = false;
                // 	}
                // In the event of issues, uncomment this if-block to spit out all week events for the current year to the console
                if (((_c = event.start) === null || _c === void 0 ? void 0 : _c.getFullYear()) === new Date().getFullYear() && ((_d = event.start) === null || _d === void 0 ? void 0 : _d.getMonth()) >= new Date().getMonth()) {
                    // console.log(event.start);
                    console.log(event.summary + ":", event.start);
                    // console.log(event.rrule);
                    // console.log(event.recurrences);
                    // console.log(event.recurrenceid);
                }
                // 	// return;
                // }
                // Delete this key if none of our conditions met
                if (shouldDelete) {
                    map.delete(key);
                }
            });
            // Filter events to those that are "Week A" or "Week B"
            let theEvent;
            map.forEach((entry, key) => {
                var _a;
                console.debug(entry);
                const summary = (_a = entry.summary) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                // This was originally just (summary === "week a" || summary === "week b") but someone put two spaces in one week so now it's this.
                if ((summary === null || summary === void 0 ? void 0 : summary.startsWith("week")) && summary.endsWith("a")) {
                    theEvent = entry;
                }
                else if ((summary === null || summary === void 0 ? void 0 : summary.startsWith("week")) && summary.endsWith("b")) {
                    theEvent = entry;
                }
                else {
                    map.delete(key);
                }
            });
            // Print warning to console if > 1 event found (shouldn't happen!)
            if (map.size > 1) {
                console.warn(`More than one Week A/B marker event found! Got ${map.size} events`);
            }
            if (map.size === 0 || !theEvent) {
                console.warn("No events in Map. Assuming holiday.");
                // Neither detected.  Probably Hols.
                return {
                    week: "unknown",
                    isWeekend: this.isWeekend,
                };
            }
            else {
                // const theEvent = eventsToday[0];
                console.debug("One event found:", theEvent);
                switch ((_a = theEvent.summary) === null || _a === void 0 ? void 0 : _a.toLowerCase().slice(-1)) { // NORMALISE!
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
                        return {
                            week: "unknown",
                            isWeekend: this.isWeekend,
                        };
                        break;
                }
            }
        });
    }
}
exports.default = IsItWeekA;
