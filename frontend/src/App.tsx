import React, { Component } from "react";
import gaSetState from "./utils/gAnalytics";
//import "./App.css";
import "./scss/index.scss";
import CookieConsent from "react-cookie-consent";
import SiteContainer from "./components/SiteContainer";
import { TabContainer } from "./components/Tabs";
import { Navbar } from "react-bootstrap";
import Cookies from "js-cookie";
import { COOKIE_SCHOOL_PREFERENCE, IIWA_KECHB_URL, IIWA_KECHG_URL } from "./utils/constants";
import { KECHBEvents, KECHGEvents } from "./data/events-mock";
import Footer from "./components/Footer";
import { KECHBAlerts, KECHGAlerts } from "./data/alerts";

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

class App extends Component<Record<string, never>> {

	constructor(props: Record<string, never>) {
		super(props);
		this.hideCookieConsent = new URLSearchParams(window.location.search).has("autoDeclineCookies");
	}

	hideCookieConsent: boolean;

	/**
	 * Provided to TabContainer to update the cookie with whichever school the user has clicked
	 * @param tab Tab name (so school name) from tabs list
	 * @param index Tab index
	 */
	updateCookie(tab: string, index: number) {
		// ONLY set cookie if opt in set.
		if (Cookies.get("CookieConsent") === "true") {
			Cookies.set(COOKIE_SCHOOL_PREFERENCE, JSON.stringify({
				school: tab,
				tabIndex: index,
			}), {
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
								calendarURL="/cal/KECHB/calendar.json"
								iiwaURL={IIWA_KECHB_URL}
								weekMarkerDate={1}
								showCard
								eventsFetcher={
									async () => KECHBEvents
								}
								alertsFetcher={
									async () => KECHBAlerts
								}
							/>
						),
					},
					{
						tab: "KECHG",
						component: (
							<SiteContainer
								calendarURL="/cal/KECHG/calendar.json"
								iiwaURL={IIWA_KECHG_URL}
								weekMarkerDate={0}
								eventsFetcher={
									async () => KECHGEvents
								}

								alertsFetcher={
									async () => KECHGAlerts
								}
							/>
						),
					},
				]} onTabChange={this.updateCookie} initialTab={(() => JSON.parse(Cookies.get(COOKIE_SCHOOL_PREFERENCE) || "{}")?.tabIndex || 0)()} />

				<Footer />

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
						style={this.hideCookieConsent ? { display: "none" } : undefined}
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						/// @ts-ignore Due to the version of react-cookie-consent used missing the type declaration for the "visible" prop, this hack is sadly required.
						visible={this.hideCookieConsent ? "hidden" : "byCookieValue"}
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
