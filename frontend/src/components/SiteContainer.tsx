import React, { Component } from "react";
import { EventData } from "./EventsList";
import Button from "./New/Button";
import { GregorianDay, SHOW_CHARITY_CARD_WHEN_ERROR, IIWA_CW_URL, SHOW_CHARITY_CARD } from "../utils/constants";
import { getScrollDownWithAdditional } from "../utils/scroll";
import { AlertResponce, ThreatLevels } from "../utils/AlertInterfaces";
import AlertBanner from "./AlterBanner";
// import Banner from "./MailingListBanner";
import Socials from "./Socials";
import IsItWeekA from "../utils/IsItWeekA";
// import YoutubeContainer from "./YoutubeContainer";
// import YearGroupCalendar from "./YearGroupCalendar";
import { IsItWeekAReturn } from "libisitweeka";
import "react-circular-progressbar/dist/styles.css";
import EventsGrid from "./New/EventsGrid";
// import { StudentCouncilElectionTracker } from "./New/Special/StudentCouncilElectionTracker"; // Re-enable next election (with tweaks!)
import { CharityProps, CharityWidget } from "./New/Special/CharityWidget";

/**
 * Props to provide to the site
 */
export interface SiteProps {
	/**
	 * Calendar to fetch events from, e.g. `calendar@camphillboys.bham.sch.uk`
	 * @deprecated Use the IsItWeekA as a Service URL instead
	 */
	calendarURL: string;
	/** EXACT URL of the path on the isitweeka server to get the current week from */
	iiwaURL: string;
	/** Day of the Week A/B event that marks a week as being A/B, 0-6, where 0 is Sunday */
	weekMarkerDate: GregorianDay;
	/** Events data - eventually replaced with state */
	eventsFetcher: () => Promise<EventData>;
	/** Fetches site alert */
	alertsFetcher: () => Promise<AlertResponce>;
	/**
	 * Whether the card should be shown in the jumbotron
	 */
	showCard?: boolean;
}

// const baseEventImageStyle = {
// 	backgroundSize: "contain",
// 	backgroundRepeat: "no-repeat",
// 	backgroundPosition: "center",
// 	display: "flex",
// 	flex: 1,
// 	margin: "auto",
// 	width: "90%",
// 	maxHeight: "80%",
// };

interface TheState {
	/** Set to unknown if neither Week A or B is detected */
	week: "A" | "B" | "unknown";
	/** Tells page when API has ran  (i.e. page loaded) */
	apiHasRan: boolean;
	isWeekend: boolean;
	eventData: EventData;
	alert: AlertResponce;
	raised: {
		net: string,
		ticketQuantity: number,
		target: number;
	};
	charityData: CharityProps;
	showCharityCard: boolean;
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
			},
			raised: {
				net: "176.77",
				ticketQuantity: 156,
				target: 200,
			},
			charityData: {
				title: "Culture Week 2024",
				description: `Charity Week is back for 2024!

In w/c 24th June, Charity week will be returning, with fan favourite events making a comeback. Will you be in the hot seat for the Chase, or might you stun the judges with your skills in the X-Factor.

All in all, it will be a fantastic week to raise money for charity!

More info coming soon!

(Hint: Cultural Dress Day?)`,
				donateURL: "https://www.eventbrite.co.uk/e/kechb-culture-week-2024-tickets-918570989557?aff=isitweekasite",
				charity: {
					name: "Save the Children",
					url: "https://www.savethechildren.org.uk/"
				},
				raised: {
					net: "0",
					ticketQuantity: 0,
					target: 200,
				},
				style: {
					background: "#000",
					text: "var(--text-default)",
					accent: "#E82328",
				},
			},
			showCharityCard: SHOW_CHARITY_CARD,
		};
	}

	componentDidMount() {
		try {
			this.getCalendar();
			this.fetchEvents();
			this.fetchNotifications();
			// NOTE: REENABLE!
			this.getAmountRaised();
		} catch (err) {
			console.error("Error: " + err);
		}
	}

	/**
	 * Retreive the amount raised for the Charity Card
	 */
	async getAmountRaised() {
		try {
			const res = await fetch(IIWA_CW_URL);
			const raised = await res.json();
			if (raised.net.split(".")[1].length === 1) {
				raised.net = raised.net + "0";
			}

			if (raised.net.split(".")[0].length > 3) {
				raised.net = raised.net.split(".")[0];
			}
			console.log(raised);
			this.setState((prevState) => ({
				...prevState,
				charityData: {
					...prevState.charityData,
					raised: {
						...prevState.charityData.raised,
						...raised,
					},
				},
				raised: raised,
			}));
		} catch (e) {
			const raised = {
				net: "0.00",
				ticketQuantity: 0,
				target: 1,
			};
			this.setState((prevState) => ({
				...prevState,
				charityData: {
					...prevState.charityData,
					raised: {
						...prevState.charityData.raised,
						...raised,
					},
				},
				raised: raised,
				showCharityCard: SHOW_CHARITY_CARD_WHEN_ERROR,
			}));
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
	};

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

		// APRIL FOOLS OVERRIDE
		// At the top to prevent unnecessary API requests
		/* this.setState({
			apiHasRan: true,
			/// @ts-expect-error Overriding week value for April 1st 2022.
			week: "C",
			isWeekend: true,
		}); return; */

		const inputDate = new Date();
		// Used for fiddling:
		// NOTE: Do NOT allow code into production where these value are uncommented
		// inputDate.setDate(8);
		// inputDate.setMonth(6);
		// inputDate.setFullYear(2023);
		// Get which week it is 
		// Use the new API

		try {
			// Controller timeout from https://thewebdev.info/2022/04/21/how-to-set-request-timeout-with-fetch-api/
			// TODO: REMOVE WHEN API FUNCTIONAL!
			throw new Error("API non-functional!");
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 500);
			const apiRes = await fetch(this.props.iiwaURL, { signal: controller.signal });
			clearTimeout(timeoutId);
			const apiResJSON: IsItWeekAReturn = await apiRes.json();
			if (!apiResJSON.week || !("isWeekend" in apiResJSON)) {
				throw new Error("One or both of week or isWeekend not in response");
			}
			this.setState({
				apiHasRan: true,
				week: apiResJSON.week,
				isWeekend: apiResJSON.isWeekend,
			});
		} catch (err) {
			console.error("Error using IsItWeekA API!");
			console.error(err);
			console.error("Falling back to old API!");
			const weekChecker = new IsItWeekA(this.props.weekMarkerDate, this.props.calendarURL, inputDate);
			const theWeek = await weekChecker.isItWeekAorB();
			this.setState({
				apiHasRan: true,
				week: theWeek.week,
				isWeekend: theWeek.isWeekend,
			});
		}



	}

	/**
	 * Used to get what to display as the jumbotron, i.e. is it Week A, B or neither?
	 */
	getStatus() {
		if (this.state.week === "unknown") {
			// NOTE: getScrollDownWithAdditional was originally fed 150 instead of 0
			return (
				<>
					<h2 className="text title">It is neither Week A nor B.</h2>
					<h3 className="text body">This means it&#39;s probably a holiday.</h3>
					<h5 id="neitherAB-contact" className="text">If you believe this is in error, please email&nbsp;<a href="mailto:info@isitweeka.com">info@isitweeka.com</a></h5>
					<div style={{ display: "flex", flexWrap: "wrap", gap: 40, marginRight: "auto" }}>
						<Button style={{ marginTop: 0 }} className="forward" onClick={getScrollDownWithAdditional(0)}><div>Events & News  →</div></Button>
						{/* <Button style={{ marginTop: 0 }} onClick={() => document.getElementById("feedback-buttom")?.scrollIntoView({ behavior: "smooth" })}>NOT NEW! Send Feedback  →</Button> */}
					</div>
					{this.state.showCharityCard && this.props.showCard ? <div className="mobile">
						<CharityWidget {...this.state.charityData} />
					</div> : null}
					<Socials />
				</>
			);
		} else {
			// NOTE: getScrollDownWithAdditional was originally fed 150 instead of 0
			return (
				<>

					{/*{this.state.alert.showAlert ? <div className="mobile" style={{ height: 144 }} /> : null}*/}
					<h2 className="desktop">{this.state.isWeekend ? "Next week will be" : "It is"}</h2> {/* Special case for weekend, where we show next week*/}
					<h1 className="desktop">Week {this.state.week}</h1>
					<h2 className="mobile">{this.state.isWeekend ? "Next week will be week" : "It is week"}</h2> {/* Special case for weekend, where we show next week*/}
					<h1 className="mobile">{this.state.week}</h1>
					<div style={{ display: "flex", flexWrap: "wrap", gap: 40, marginRight: "auto" }}>
						<Button style={{ marginTop: 0 }} className="forward" id="event-scroll-button" onClick={getScrollDownWithAdditional(0)}>Events & News  →</Button>
						{/* <Button style={{ marginTop: 0 }} onClick={() => document.getElementById("feedback-buttom")?.scrollIntoView({ behavior: "smooth" })}>NOT NEW! Send Feedback  →</Button> */}
					</div>
					{this.state.showCharityCard && this.props.showCard ? <div className="mobile">
						<CharityWidget {...this.state.charityData} />
					</div> : null}
					<Socials />
				</>
			);
		}
	}

	render() {
		return (
			<>
				<div className="isitweeka-jumbotron">
					{/* <a id="feedback-buttom-top" target="__blank" href="https://forms.gle/KaS2VUAmZqfS1Nf26" style={{ visibility: "hidden", width: 0, height: 0 }} aria-hidden /> */}
					{this.state.alert.showAlert ? <AlertBanner alert={this.state.alert} /> : null}
					<div className="isitweeka">
						{
							this.state.apiHasRan ? this.getStatus() : (<h2>Loading...</h2>)
						}
					</div>
					{/* { this.props.showCard && <StudentCouncilElectionTracker
						total={25}
						candidateOne={{ colour: "#EB2A1C", name: "Dirujan Senthilvasan", photoUrl: "/sc/Dirujan.png", votes: 11 }}
						candidateTwo={{ colour: "#1D77BC", name: "Ayan Butt", photoUrl: "/sc/Ayan.png", votes: 13 }}
						summary="Ayan Wins" />
					} */}
					{this.state.showCharityCard && this.props.showCard ? <div className="desktop">
						<CharityWidget {...this.state.charityData} />
					</div> : null}
				</div>
				{ /* <Banner /> */}
				{ /* Pulled offline due to jankiness. Readd once a better solution with proper mobile styles and dedicated place is found:
					<YearGroupCalendar /> */ }
				<EventsGrid eventData={this.state.eventData} />
				{/* All features are re-implemented in cards, so now commented out! */}
				{/* <EventsList eventData={this.state.eventData} /> */}
			</>
		);
	}
}

/* Charity Week Widget */

/* 
	<div className="cw-widget">
		<h2>Charity Week</h2>
		<div className="raised-content">
			<div className="ring-cont"><CircularProgressbar strokeWidth={10} value={parseFloat(this.state.charityData.raised.net) / CW_TARGET * 100} text={(parseFloat(this.state.charityData.raised.net) / CW_TARGET * 100).toFixed(0) + "%"} /></div>
			<div className="raised-text">
				<h1>£{this.state.charityData.raised.net}</h1>
				<h3>raised</h3>
			</div>
		</div>
		<a href="https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite"><button><p>Donate Now</p> <FontAwesomeIcon icon={faArrowRight} /></button></a>
		<a className="cw-delayed" href="https://www.eventbrite.co.uk/e/camp-hill-charity-week-2022-tickets-234329203957?aff=isitweekasite" aria-disabled><button aria-disabled disabled><p>ticket sales delayed</p></button></a>
	</div>
*/
