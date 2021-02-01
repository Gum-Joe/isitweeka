import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import FontAwesome from "react-fontawesome";
import { Portal } from "react-portal";
import Button from "./Button.Forward";

type MailListProps =  {
	isListForMobile: true;
	dimisser: () => void;
} | {
	isListForMobile: false;
}

const BaseMailingListForm: React.FC<MailListProps> = (props) => {
	const handleClick = () => {
		// Here you are Kishan!
		// Kishan: xD

		/** Track sign ups */
		gtag("event", "maillist_signup", {
			"event_category": "engagement",
			"value": "true",
			"label": "maillist_signup",
		});
	};

	const [popupIsOpen, setOpenState] = useState(true);
	return (
		<div className={!props.isListForMobile ? "sosumi sosumi-desktop" : "sosumi-mobile"}>
			{
				props.isListForMobile && <h3 className="sosumi-dismiss">
					<FontAwesomeIcon className="r-banner-dismiss" icon={faTimes} onClick={props.dimisser} />
				</h3>
			}
			<h3>Want updates on the exciting things we have in store?</h3>
			<form action="https://isitweeka.us7.list-manage.com/subscribe/post" method="POST">
				{/* NOTE: DO NOT DELETE THESE HIDDEN VALUES OR CHANGE THE SUBMIT LINK OR THINGS WILL BREAK */}
				<input type="hidden" name="u" value="1a205026e7a571c5b62dd369d" />
				<input type="hidden" name="id" value="249833b0f4" />
				<div className="input-container">
					<label htmlFor="name-input">Name:</label>
					<input id="name-input MERGE6" type="text" name="MERGE6" />
				</div>
				<div className="input-container">
					<label htmlFor="email-input">Email:</label>
					<input id="email-input MERGE0" type="email" name="MERGE0" />
				</div>
				<div className="input-checkbox-container">
					<label htmlFor="dob-input">I am in year 9 or above:</label>
					<input id="dob-input" type="checkbox" />
				</div>
				<Button buttonType="fill" style={{ fontSize: "1em" }} type="submit" onClick={handleClick} light>Sign up</Button>
			</form>
		</div>
	);
};

const MailingListContainer: React.FC = (props) => {

	const [mobileListIsOpen, setmobileListIsOpen] = useState(true);

	function mailingListMobileDismisser() {
		setmobileListIsOpen(false);
	}

	return (
		<>
			<BaseMailingListForm isListForMobile={false} />
			{ mobileListIsOpen && <Portal>
				<BaseMailingListForm isListForMobile={true} dimisser={mailingListMobileDismisser} />
			</Portal> }
		</>
	);
};

export default MailingListContainer;