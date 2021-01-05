import React, { Component } from "react";
import gaSetState, { GA_DISABLE_COOKIE_STR, GA_PROPERTY } from "./utils/gAnalytics";
import "./App.css";
import CookieConsent from "react-cookie-consent";
import { EventData } from "./components/EventsList";
import dummyResponse from "./events.json";
import SiteContainer from "./components/SiteContainer";
import { TabContainer } from "./components/Tabs";




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
				]} />		

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
		);
	}
}

export default App;
