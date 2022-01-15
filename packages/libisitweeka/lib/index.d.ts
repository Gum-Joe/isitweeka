/** Return values from IsItWeekA . First type is a return where the week is know, with a specifier if it is a weekend, second is if the week could not be detected (e.g. is holiday) */
export declare type IsItWeekAReturn = {
    isWeekend: boolean;
    week: "A" | "B";
} | {
    isWeekend: boolean;
    week: "unknown";
};
/** Type to represent a (Gregorian calendar!) day */
export declare type GregorianDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;
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
    readonly calendarURL: string;
    /** Day of the event with summary (title) "Week A" or "Week B" that marks a week as being A/B, 0-6, where 0 is Sunday */
    readonly weekMarkerDate: GregorianDay;
    /** Day we're looking for which week it is from (normally today) NOTE: may not be the same as what is inputted due to internal transformations */
    inputDate: Date;
    /** Is it a weekend today? */
    protected isWeekend: boolean;
    /** Constructor. See props of the class with the same name for more info */
    constructor(weekMarkerDate: GregorianDay, calendarURL: string, inputDate: Date);
    /**
     * Gets the monday from a week
     * From https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
     * @deprecated Use {@link forwardOrRewindToDay} instead
     */
    getMonday(d: Date): Date;
    /**
     * Go back to the first of a given day during a week, or to the next of the day for forwardList
     * Based on https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
     * @param d Date object representing the day to 'rewind'
     * @param goTo Day number (0-6, 0 = Sunday) to go to
     * @param forwardList List of day numbers to forward to `goTo` (instead of backwards).
     */
    forwardOrRewindToDay(d: Date, goTo: GregorianDay, forwardList: number[]): Date;
    /**
     * Loads the KECHB/G calendar (depending on the props provided - see {@link calendarURL}), finds the current week, then goes to the Monday/Sunday (whichever given by `props.weekMarkerDate`) of that week
     * and checks for an event with the title (`event.summary`) of "Week A" or "Week B".
     * @see SiteContainer documentation for more information on the algoirthm
     */
    isItWeekAorB(): Promise<IsItWeekAReturn>;
}
