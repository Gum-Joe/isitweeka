"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const ical = __importStar(require("ical/ical"));
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
            const baseResponse = yield (0, cross_fetch_1.default)(this.calendarURL, {
                method: "GET",
                mode: "no-cors",
                credentials: "same-origin",
            });
            const ics = yield baseResponse.text();
            // console.log(ics);
            const data = ical.parseICS(ics);
            // console.log(data);
            // Convert to map for easy parsing
            const map = new Map(Object.entries(data));
            // Narrow down to only events that are around the date we are looking for
            map.forEach((v, key) => {
                var _a, _b;
                // Flag that is set to false if the event matches our conditions to then be checked if "Week A" or "Week B" marker event
                let shouldDelete = true;
                /** Intial check: do the ISO strings match? */
                if (((_a = v.start) === null || _a === void 0 ? void 0 : _a.toISOString()) === startTime) {
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
                if (v.start && Math.abs(weekStart.valueOf() - ((_b = v.start) === null || _b === void 0 ? void 0 : _b.valueOf())) <= 24 * 60 * 60 * 1000) {
                    shouldDelete = false;
                }
                // Delete this key if none of our conditions met
                if (shouldDelete) {
                    map.delete(key);
                }
            });
            // Filter events to those that are "Week A" or "Week B"
            let theEvent;
            map.forEach((entry, key) => {
                var _a, _b;
                if (((_a = entry.summary) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "week a" || ((_b = entry.summary) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === "week b") {
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
                // Neither detected.  Probably Hols.
                return {
                    week: "unknown",
                    isWeekend: this.isWeekend,
                };
            }
            else {
                // const theEvent = eventsToday[0];
                switch ((_a = theEvent.summary) === null || _a === void 0 ? void 0 : _a.toLowerCase()) { // NORMALISE!
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
        });
    }
}
exports.default = IsItWeekA;
