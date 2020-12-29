import React, { Component } from 'react';
import gaSetState, { GA_DISABLE_COOKIE_STR, GA_PROPERTY } from "./gAnalytics";
import './App.css';
import CookieConsent from 'react-cookie-consent';
import { Navbar } from "react-bootstrap";
import EventRow from "./components/EventRow";
import { dummyResponse, EventData } from "./components/EventsList";

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

const baseEventImageStyle = {
  backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", display: "flex", flex: 1, margin: "auto", width: "90%", maxHeight: "80%"
};

/**
 * YES I KNOW THIS IS A BAD IDEA!!!!!!
 * But it's more convient
 * And i've limited it's use
 * And it's only for access to a public read-only
 */
const API_KEY = 'AIzaSyBJtspfBiYYXzpF3Nc32owjtjnJbRToxK4';

interface TheState {
  /** Used to see whether the API has been loaded */
  gapiReady: boolean;
  /** Set to true if neither Week A or B is detected */
  isNotWeekAB: boolean;
  week: "A" | "B" | "unknown";
  /** Tells page when API has ran  (i.e. page loaded) */
  apiHasRan: boolean;
  isWeekend: boolean;
  eventData: EventData;
}

class App extends Component<{}, TheState> {

  constructor(props: {}) {
    super(props);
    this.state = {
      gapiReady: false,
      isNotWeekAB: false,
      week: "unknown",
      apiHasRan : false,
      isWeekend: false,
      eventData: {
        events: [],
        generatedAt: 0,
      }
    }
  }

  componentDidMount() {
    this.loadGoogleAPI();
    this.fetchEvents();
  }

  async fetchEvents() {
    this.setState({
      eventData: dummyResponse,
    });
  };

  /**
   * Loads the Google API, then runs {@link getCalendar}
   */
  loadGoogleAPI() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.gapi.load("client", () => {
        window.gapi.client.setApiKey(API_KEY);
        window.gapi.client.load("calendar", "v3", () => {
          this.setState({ gapiReady: true });
          try {
            this.getCalendar();
          } catch (err) {
            console.error("Error: " + err?.message)
          }
        });
      });
    };

    document.body.appendChild(script);
  }

  /**
   * Gets the monday from a week
   * From https://stackoverflow.com/questions/4156434/javascript-get-the-first-day-of-the-week-from-current-date
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
   * Loads the KECHB calendar, finds the current week, then goes to the Monday of that week and checks for a Week A or Week B event.
   */
  async getCalendar() {

    const a = "QA";
    console.log(a);
    const inputDate = new Date();
    // Used for fiddling:
    // inputDate.setDate(2);
    // inputDate.setMonth(0);
    // inputDate.setFullYear(2021);
    const weekStart = this.getMonday(inputDate);
    weekStart.setUTCHours(0, 0, 0, 0); // Set to start of day
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 1)
    weekEnd.setUTCHours(0, 0, 0, 0); // Set to start of day

    // Tell us if weekend!
    const dayNow = inputDate.getDay();
    if (dayNow === 6 || dayNow === 0) { // 0 is Sunday, 6 is Saturday
      this.setState({
        isWeekend: true,
      })
    }


    const startTime = weekStart.toISOString()
    const endTime = weekEnd.toISOString();

    // The "Calendar ID" from your calendar settings page, "Calendar Integration" secion:
    const calendarId = 'calendar@camphillboys.bham.sch.uk';

    // 1. Create a project using google's wizzard: https://console.developers.google.com/start/api?id=calendar
    // 2. Create credentials:
    //    a) Go to https://console.cloud.google.com/apis/credentials
    //    b) Create Credentials / API key
    //    c) Since your key will be called from any of your users' browsers, set "Application restrictions" to "None",
    //       leave "Website restrictions" blank; you may optionally set "API restrictions" to "Google Calendar API"

    // You can get a list of time zones from here: http://www.timezoneconverter.com/cgi-bin/zonehelp
    const userTimeZone = "Europe/London";

    // Initializes the client with the API key and the Translate API.
    await window.gapi.client.init({
      'apiKey': API_KEY,
      // Discovery docs docs: https://developers.google.com/api-client-library/javascript/features/discovery
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    })
    const response = await gapi.client.calendar.events.list({
      'calendarId': calendarId,
      'timeZone': userTimeZone,
      'singleEvents': true,
      'timeMin': (new Date(startTime)).toISOString(),
      timeMax: (new Date(endTime)).toISOString(),
      'maxResults': 20,
      'orderBy': 'startTime'
    });
    if (response.result.items) {
      const calendarRows = ['<table class="wellness-calendar"><tbody>'];
      // Filter events to those that are "Week A" or "Week B"
      const eventsToday = response.result.items.filter(entry => entry.summary === "Week A" || entry.summary === "Week B");
      if (eventsToday.length === 0) {
        // Neithe detected.  Probably Hols.
        this.setState({
          isNotWeekAB: true,
          week: "unknown",
          apiHasRan: true,
        })
      } else {
        const theEvent = eventsToday[0];
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
            })
            break;
        }
      }
    }
  }

  getStatus() {
    if (this.state.isNotWeekAB || this.state.week === "unknown") {
      return (
        <>
          <h2>It is neither Week A nor B.</h2>
          <h3>This means it's probably a holiday.</h3>
          <button style={{ marginRight: "auto", marginLeft: -8 }} className="forward" onClick={this.scrollDown}><div>events</div></button>
          <h5>If you believe this is in error, please email <a href="mailto:info@isitweeka.com">info@isitweeka.com</a></h5>
        </>
      )
    } else {
      return (
        <>
          <h2>{this.state.isWeekend ? "Next week will be" : "It is"}</h2> {/* Special case for weekend, where we show next week*/}
          <h1>Week {this.state.week}</h1>
          <h4>More coming soon...</h4>
          <button style={{ marginRight: "auto", marginLeft: -8 }} className="forward" onClick={this.scrollDown}><div>events</div></button>
        </>
      )
    }
  }

  scrollDown() {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }

  scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  render() {
    return (
      <div className="App">
        <div className="isitweeka">
          {
            this.state.apiHasRan ? this.getStatus() : ( <h2>Loading...</h2> )
          }
          {/*<h2>It is</h2>
          <h1>Week A/B</h1>
          <h3>More coming soon</h3>
          <h2>isitweeka.com</h2>
          <h1>IT BEGINS.</h1>
          <h3>More coming soon</h3>*/}
        </div>
        <div className="isitweeka events">
          <h2><button onClick={this.scrollUp} className="back" /> Upcoming Events</h2>
          <div className="events-list">
            {this.state.eventData.events.map(({ title, headerURL, backgroundColor }) => (
                <EventRow ticketsOnSale imageURL={headerURL} title={title} saleDate={"01/01/2021"} background={backgroundColor} />
            ))}
            {/*<div className="events-row">*/}
			{/*	<div style={{ ...baseEventImageStyle }}>*/}
			{/*	  <h4>[IMAGE SET AS BACKGROUND OF THIS DIV]</h4>*/}
			{/*	</div>*/}
			{/*	<div>*/}
			{/*	  <h3>Event Number Two?</h3>*/}
			{/*	  <h4>Tickets on sale 03/02/21</h4>*/}
			{/*	</div>*/}
            {/*</div>*/}
          </div>
        </div>

        {/* Cookie consent */}
        <Navbar fixed="bottom">
          <CookieConsent
            enableDeclineButton
            declineButtonText="No thanks"
            onAccept={
              () => { gaSetState(false); window.location.reload(); }
            }
            onDecline={
              () => { gaSetState(true); window.location.reload(); }
            }
          >
            This website uses cookies (via Google Analytics) for analytics.
            <a href={process.env.PUBLIC_URL + "/privacy.html"}>View Privacy Policy</a>
          </CookieConsent>
        </Navbar>
      </div>
    )
  }
}

export default App;
