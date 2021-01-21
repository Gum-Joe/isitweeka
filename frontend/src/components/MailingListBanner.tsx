import React from "react";
import Button from "./Button.Forward";

export default class Banner extends React.Component {
	handleClick = () => {
		// Here you are Kishan!
	}

	render() {
		return (
			<div style={{ display: "flex", position: "sticky", width: "100vw", height: 80, padding: "0 5vw", margin: 0, top: 0, bottom: 0, justifyContent: "center", alignItems: "center", gap: 16, boxSizing: "border-box", color: "#000", background: "#FFF" }}>
				<h3 style={{ margin: "auto 0", fontSize: "2em" }}>We have a mailing list!</h3>
				<form style={{ display: "flex", flexDirection: "row", gap: 16, margin: "auto 0", fontWeight: 500, fontSize: "1em" }}>
					<div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
						<label style={{ margin: "auto 0" }} htmlFor="name-input">Name:</label>
						<input style={{ margin: "auto 0" }} id="name-input" type="text" />
					</div>
					<div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
						<label style={{ margin: "auto 0" }} htmlFor="email-input">Email:</label>
						<input style={{ margin: "auto 0" }} id="email-input" type="email" />
					</div>
					<div style={{ display: "flex", flexDirection: "row", gap: 4 }}>
						<label style={{ margin: "auto 0" }} htmlFor="dob-input">I am in year 9 or above:</label>
						<input style={{ margin: "auto 0" }} id="dob-input" type="checkbox" />
					</div>
					<Button type="submit" onClick={this.handleClick} light>Sign up</Button>
				</form>
			</div>
		)
	}
}