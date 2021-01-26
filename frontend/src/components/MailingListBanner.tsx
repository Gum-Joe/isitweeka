import React from "react";
import Button from "./Button.Forward";

export default class Banner extends React.Component {
	handleClick = () => {
		// Here you are Kishan!
	}

	render() {
		return (
			<div className={"sosumi"}>
				<h3>We have a mailing list!</h3>
				<form>
					<div className="input-container">
						<label htmlFor="name-input">Name:</label>
						<input id="name-input" type="text" />
					</div>
					<div className="input-container">
						<label htmlFor="email-input">Email:</label>
						<input id="email-input" type="email" />
					</div>
					<div className="input-checkbox-container">
						<label htmlFor="dob-input">I am in year 9 or above:</label>
						<input id="dob-input" type="checkbox" />
					</div>
					<Button buttonType="fill" style={{ fontSize: "1em" }} type="submit" onClick={this.handleClick} light>Sign up</Button>
				</form>
			</div>
		);
	}
}