import React, { Component } from "react";
import EventsList, { EventData } from "./EventsList";
import Button from "./Button.Forward";
import dummyResponse from "../data/events-mock";
import { GregorianDay } from "../utils/constants";
import { getScrollDownWithAdditional } from "../utils/scroll";
import * as ical from "ical";
import { AlertResponce, ThreatLevels } from "../utils/AlertInterfaces";
import { dummyAlert } from "../data/alerts";

/**
 * Props to provide to the site
 */
export interface SiteProps {
	/** Calendar to fetch events from, e.g. `calendar@camphillboys.bham.sch.uk` */
	calendarURL: string;
	/** Day of the Week A/B event that marks a week as being A/B, 0-6, where 0 is Sunday */
	weekMarkerDate: GregorianDay;
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
	alertMessage: string;
	showAlert: boolean;
	alertLevel: ThreatLevels;
}

/**
 * Contains the site of isitweeka.com itself.
 * They way, we can easily create variations of it for e.g. different school
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
			alertMessage: "ATTENTION: ALL EXAMS ARE CANCELLED - Albus Dumbledore",
			showAlert: false,
			alertLevel: ThreatLevels.LOW,
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

	fetchNotifications = async () => {
		// TODO: GET request for whether there is an alert
		// TODO: set state to response

		// const baseResponse = await fetch("/alerts.json", {
		// 	method: "GET",
		// });

		// const response: AlertResponce = await baseResponse.json();

		const response = dummyAlert;

		this.setState({
			showAlert: response.showAlert,
			alertMessage: response.message,
			alertLevel: response.threatLevel,
		});
	}

	async fetchEvents() {
		// TODO: Add real fetch logic, likely based on an inputted URL
		this.setState({
			eventData: dummyResponse,
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
		const day = dhere.getDay();
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
		const diff = dhere.getDate() - day + goTo + (forwardList.includes(day) ? 7 : 0); // adjust when day is saturday -> add 6 to bring us back to Saturday, then add 2 to go to Monday
		return new Date(dhere.setDate(diff));
	}

	/**
	 * Loads the KECHB calendar, finds the current week, then goes to the Monday of that week and checks for a Week A or Week B event.
	 */
	async getCalendar() {
		const inputDate = new Date();
		// Used for fiddling:
		// inputDate.setDate(1);
		// inputDate.setMonth(0);
		// inputDate.setFullYear(2021);
		const weekStart = this.forwardOrRewindToDay(inputDate, this.props.weekMarkerDate, [0, 6]);
		weekStart.setUTCHours(0, 0, 0, 0); // Set to start of day
		const weekEnd = new Date(weekStart);
		weekEnd.setDate(weekEnd.getDate() + 1);
		weekEnd.setUTCHours(0, 0, 0, 0); // Set to start of day

		// Tell us if weekend!
		const dayNow = inputDate.getDay();
		if (dayNow === 6 || dayNow === 0) { // 0 is Sunday, 6 is Saturday
			this.setState({
				isWeekend: true,
			});
		}

		const startTime = weekStart.toISOString();
		const endTime = weekEnd.toISOString();

		const baseResponse = await fetch(this.props.calendarURL, {
			method: "GET",
			mode: "no-cors",
			credentials: "same-origin",
		});

		const ics = await baseResponse.text();

		// console.log(ics);

		const data = ical.parseICS(ics);

		// console.log(data);

		const map = new Map(Object.entries(data));

		map.forEach((v, key) => {
			if (v.start?.toISOString() !== startTime) {
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

	getBackgroundColorForAlertLevel = () => {
		switch (this.state.alertLevel) {
			case ThreatLevels.LOW:
				return "var(--great-northern-green)";
			case ThreatLevels.MODERATE:
				return "var(--south-eastern-yellow)";
			case ThreatLevels.SUBSTANTIAL:
				return "var(--south-eastern-yellow)";
			case ThreatLevels.SEVERE:
				return "var(--midland-red)";
			case ThreatLevels.CRITICAL:
				return "var(--north-western-blue)";
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
					<h2>It is neither Week A nor B.</h2>
					<h3>This means it&#39;s probably a holiday.</h3>
					<Button style={{ marginRight: "auto" }} className="forward" onClick={getScrollDownWithAdditional(0)}><div>events</div></Button>
					<h5>If you believe this is in error, please email&nbsp;<a href="mailto:info@isitweeka.com">info@isitweeka.com</a></h5>
				</>
			);
		} else {
			// NOTE: getScrollDownWithAdditional was originally fed 150 instead of 0
			return (
				<>
					{this.state.showAlert ? <div className="r-banner" style={{
						// position: "absolute",
						// top: 168,
						left: 0,
						width: "100%",
						minHeight: 68,
						display: "flex",
						padding: "0 20px",
						boxSizing: "border-box",
					}}>
						<div style={{
							margin: "0 auto",
							padding: 20,
							display: "flex",
							boxSizing: "border-box",
							borderRadius: 12,
							backgroundColor: this.getBackgroundColorForAlertLevel(),
						}}>
							<h3 className="desktop" style={{
								margin: "auto 0",
								fontSize: "1.75em",
								lineHeight: 1,
								textTransform: "uppercase"
							}}>{this.state.alertMessage}</h3>
							<h3 className="mobile" style={{
								margin: "auto 0",
								fontSize: "1em",
								lineHeight: 1,
								textTransform: "uppercase"
							}}>{this.state.alertMessage}</h3>
						</div>
					</div> : null}
					<h2 className="desktop">{this.state.isWeekend ? "Next week will be" : "It is"}</h2> {/* Special case for weekend, where we show next week*/}
					<h1 className="desktop">Week {this.state.week}</h1>
					<h2 className="mobile">{this.state.isWeekend ? "Next week will be" : "It is week"}</h2> {/* Special case for weekend, where we show next week*/}
					<h1 className="mobile">{this.state.week}</h1>
					<h4>More coming soon...</h4>
					<Button style={{ marginRight: "auto" }} className="forward" onClick={getScrollDownWithAdditional(0)}>events</Button>
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

				<EventsList eventData={this.state.eventData} />
			</>
		);
	}
}
