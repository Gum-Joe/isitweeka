import React, { Component } from "react";
import gaSetState, { GA_DISABLE_COOKIE_STR, GA_PROPERTY } from "./utils/gAnalytics";
import "./App.css";
import CookieConsent from "react-cookie-consent";
import { EventData } from "./components/EventsList";
import dummyResponse from "./events.json";
import SiteContainer from "./components/SiteContainer";
import { TabContainer } from "./components/Tabs";
import { Navbar } from "react-bootstrap";
import Cookies from "js-cookie";
import { COOKIE_SCHOOL_PREFERENCE } from "./utils/constants";

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

interface TheState {
  eventData: EventData;
}

class App extends Component<Record<string, never>, TheState> {

	constructor(props: Record<string, never>) {
		super(props);
		this.state = {
			eventData: {
				events: [],
				generatedAt: "",
			}
		};
	}

	componentDidMount() {
		this.fetchEvents();
	}

	async fetchEvents() {
		// TODO: Add real fetch logic
		this.setState({
			eventData: dummyResponse,
		});
	}

	/**
	 * Provided to TabContainer to update the cookie with whichever school the user has clicked
	 * @param tab Tab name (so school name) from tabs list
	 * @param index Tab index
	 */
	updateCookie(tab: string, index: number) {
		// ONLY set cookie if opt in set.
		if (Cookies.get("CookieConsent") === "true") {
			Cookies.set(COOKIE_SCHOOL_PREFERENCE, {
				school: tab,
				tabIndex: index,
			}, {
				secure: true,
				sameSite: "strict",
			});

			// Log this
			if (typeof gtag !== "undefined") {
				console.log("Setting to " + tab);
				gtag("set", "user_properties", {
					school: tab
				});
			}
			

		}
	}

	render() {
		return (
			<div className="App">

				<TabContainer tabs={[
					{
						tab: "KECHB",
						component: (
							<SiteContainer
								calendarURL="calendar@camphillboys.bham.sch.uk"
								weekMarkerDate={1}
							/>	
						),
					},
					{
						tab: "KECHG",
						component: (
							<SiteContainer
								calendarURL="calendar@kechg.org.uk"
								weekMarkerDate={0}
							/>
						),
					},
				]} onTabChange={this.updateCookie} initialTab={(() => Cookies.getJSON(COOKIE_SCHOOL_PREFERENCE)?.tabIndex || 0)()}/>		

				{/* Cookie consent */}
				<Navbar fixed="bottom">
				<CookieConsent
					enableDeclineButton
						flipButtons
					buttonText="I understand"
					declineButtonText="No thanks"
					onAccept={
						() => { gaSetState(false); window.location.reload(); }
					}
					onDecline={
						() => { gaSetState(true); window.location.reload(); }
					}
				>
					This website uses cookies for preferences and analytics (via Google Analytics).
						<a href={process.env.PUBLIC_URL + "/privacy.html"}> View Privacy Policy</a>
				</CookieConsent>
				</Navbar>
			</div>
		);
	}
}

export default App;
