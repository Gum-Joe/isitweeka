import React, { Component } from "react";
import EventsList, { EventData } from "./EventsList";
import Button from "./Button.Forward";
import { GregorianDay } from "../utils/constants";
import { getScrollDownWithAdditional } from "../utils/scroll";
import * as ical from "ical";
import { AlertResponce, ThreatLevels } from "../utils/AlertInterfaces";
import { KECHBAlerts } from "../data/alerts";
import AlertBanner from "./AlterBanner";
import Banner from "./MailingListBanner";
import Socials from "./Socials";

/**
 * Props to provide to the site
 */
export interface SiteProps {
	/** Calendar to fetch events from, e.g. `calendar@camphillboys.bham.sch.uk` */
	calendarURL: string;
	/** Day of the Week A/B event that marks a week as being A/B, 0-6, where 0 is Sunday */
	weekMarkerDate: GregorianDay;
	/** Events data - eventually replaced with state */
	eventsFetcher: () => Promise<EventData>;
	/** Fetches site alert */
	alertsFetcher: () => Promise<AlertResponce>;
}

const baseEventImageStyle = {
	backgroundSize: "contain",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center",
	display: "flex",
	flex: 1,
	margin: "auto",
	width: "90%",
	maxHeight: "80%",
};

interface TheState {
	/** Set to true if neither Week A or B is detected */
	isNotWeekAB: boolean;
	week: "A" | "B" | "unknown";
	/** Tells page when API has ran  (i.e. page loaded) */
	apiHasRan: boolean;
	isWeekend: boolean;
	eventData: EventData;
	alert: AlertResponce;
}

/**
 * Contains the site of isitweeka.com itself.
 * They way, we can easily create variations of it for e.g. different school.
 * 
 * How calendar loading works:
 * 1. We have a GitHub Action that every Friday fetches KECHB and KECHG school calendar and uploads it to the repo for deployment.
 * 2. The site fetches this:
 * 	1. goes back to the last `weekMarkerDate` (e.g. Monday - {@link SiteProps.weekMarkerDate}),
 * 		based on the current UTC date.
 * 		It goes forward to the next `weekMarkerDate` if it is a weekend.
 * 	2. Sees if a Week A or Week B event is in the calendar on the day. If not, displays a messages saying it's likely a holiday.
 */
export default class SiteContainer extends Component<SiteProps, TheState> {

	constructor(props: SiteProps) {
		super(props);
		this.state = {
			isNotWeekAB: false,
			week: "unknown",
			apiHasRan: false,
			isWeekend: false,
			eventData: {
				events: [],
				generatedAt: "",
			},
			// Default alert
			alert: {
				message: "ATTENTION: ALL EXAMS ARE CANCELLED - Albus Dumbledore",
				showAlert: false,
				alertLevel: ThreatLevels.LOW,
			}
			,
		};
	}

	componentDidMount() {
		try {
			this.getCalendar();
			this.fetchEvents();
			this.fetchNotifications();
		} catch (err) {
			console.error("Error: " + err?.message);
		}
	}

	/** Fetches any alerts that need to be diplayed */
	fetchNotifications = async () => {
		// TODO: GET request for whether there is an alert
		// TODO: set state to response

		// const baseResponse = await fetch("/alerts.json", {
		// 	method: "GET",
		// });

		// const response: AlertResponce = await baseResponse.json();

		//const response = KECHBAlerts;
		const response = await this.props.alertsFetcher();

		this.setState({
			alert: response,
		});
	}

	async fetchEvents() {
		// TODO: Add real fetch logic, likely based on an inputted URL
		this.setState({
			eventData: await this.props.eventsFetcher(),
		});
	}

	/**
	 * Gets the monday from a week
	 * From https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
	 * @deprecated Use {@link forwardOrRewindToDay} instead
	 */
	getMonday(d: Date) {
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
	forwardOrRewindToDay(d: Date, goTo: GregorianDay, forwardList: number[]) {
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
	 * Loads the KECHB/G calendar (depending on the props provided), finds the current week, then goes to the Monday/Sunday (whichever given by `props.weekMarkerDate`) of that week
	 * and checks for an event with the title (`event.summary`) of "Week A" or "Week B".
	 * @see SiteContainer documentation for more information on the algoirthm
	 */
	async getCalendar() {
		const inputDate = new Date();
		// Used for fiddling:
		//inputDate.setDate(1);
		//inputDate.setMonth(2);
		//inputDate.setFullYear(2021);
		// Get to the start of the week
		const weekStart = this.forwardOrRewindToDay(inputDate, this.props.weekMarkerDate, [6]);
		weekStart.setUTCHours(0, 0, 0, 0); // Set to start of day
		const weekEnd = new Date(weekStart);
		weekEnd.setUTCDate(weekEnd.getUTCDate() + 1);
		weekEnd.setUTCHours(0, 0, 0, 0); // Set to start of day

		// Tell us if weekend!
		const dayNow = inputDate.getUTCDay();
		if (dayNow === 6 || dayNow === 0) { // 0 is Sunday, 6 is Saturday
			this.setState({
				isWeekend: true,
			});
		}

		// Representations of the values we are looking for
		const startTime = weekStart.toISOString();
		const endTime = weekEnd.toISOString();

		// DEBUG
		// console.log(weekStart.toISOString());
		// console.log(weekEnd.toISOString());

		// Fetch the iCal file
		const baseResponse = await fetch(this.props.calendarURL, {
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

		// Narrow down to only events that are around the date we are looking for
		map.forEach((v, key) => {
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

			// Delete this key if none of our conditions met
			if (shouldDelete) {
				map.delete(key);
			}
		});

		// Filter events to those that are "Week A" or "Week B"
		let theEvent: ical.CalendarComponent | undefined;
		map.forEach((entry, key) => {
			if (entry.summary === "Week A" || entry.summary === "Week B") {
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
			this.setState({
				isNotWeekAB: true,
				week: "unknown",
				apiHasRan: true,
			});
		} else {
			// const theEvent = eventsToday[0];
			
			switch (theEvent.summary) {
				case "Week A":
					this.setState({
						week: "A",
						apiHasRan: true,
					});
					break;
				case "Week B":
					this.setState({
						week: "B",
						apiHasRan: true,
					});
					break;
				default:
					// NEITHER!
					// Something went wrong
					this.setState({
						isNotWeekAB: true,
						apiHasRan: true,
					});
					break;
			}
		}
	}

	/**
	 * Used to get what to display as the jumbotron, i.e. is it Week A, B or neither?
	 */
	getStatus() {
		if (this.state.isNotWeekAB || this.state.week === "unknown") {
			// NOTE: getScrollDownWithAdditional was originally fed 150 instead of 0
			return (
				<>
					{this.state.alert.showAlert ? <AlertBanner alert={this.state.alert} /> : null}
					<h2>It is neither Week A nor B.</h2>
					<h3>This means it&#39;s probably a holiday.</h3>
					<Button style={{ marginRight: "auto" }} className="forward" onClick={getScrollDownWithAdditional(0)}><div>events</div></Button>
					<h5>If you believe this is in error, please email&nbsp;<a href="mailto:info@isitweeka.com">info@isitweeka.com</a></h5>
					<Socials />
				</>
			);
		} else {
			// NOTE: getScrollDownWithAdditional was originally fed 150 instead of 0
			return (
				<>
					{this.state.alert.showAlert ? <AlertBanner alert={this.state.alert} /> : null}
					{/*{this.state.alert.showAlert ? <div className="mobile" style={{ height: 144 }} /> : null}*/}
					<h2 className="desktop">{this.state.isWeekend ? "Next week will be" : "It is"}</h2> {/* Special case for weekend, where we show next week*/}
					<h1 className="desktop">Week {this.state.week}</h1>
					<h2 className="mobile">{this.state.isWeekend ? "Next week will be week" : "It is week"}</h2> {/* Special case for weekend, where we show next week*/}
					<h1 className="mobile">{this.state.week}</h1>
					<h4>More coming soon...</h4>
					<Button style={{ marginRight: "auto", marginTop: 25 }} className="forward" onClick={getScrollDownWithAdditional(0)}>events</Button>
					<Socials />
				</>
			);
		}
	}

	render() {
		return (
			<>
				<div className="isitweeka isitweeka-jumbotron">
					{
						this.state.apiHasRan ? this.getStatus() : (<h2>Loading...</h2>)
					}
				</div>
				<Banner />
				<EventsList eventData={this.state.eventData} />
			</>
		);
	}
}
