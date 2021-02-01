import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FocusTrap from "focus-trap-react";
import React, { useEffect, useState } from "react";
import FontAwesome from "react-fontawesome";
import { Portal } from "react-portal";
import Button from "./Button.Forward";

type MailListProps =  {
	isListForMobile: true;
	dimisser: () => void;
} | {
	isListForMobile: false;
}


const SHOW_MOBILE_AT_WIDTH = 1050;

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

	return (
		<div className={!props.isListForMobile ? "sosumi sosumi-desktop" : "sosumi-mobile"}>
			{
				props.isListForMobile && <h3 className="sosumi-dismiss">
					<FontAwesomeIcon className="r-banner-dismiss" icon={faTimes} onClick={props.dimisser} />
				</h3>
			}
			<h3>Want updates on the exciting things we have in store?</h3>
			{
				props.isListForMobile &&
				<h4 id="required-message">(All fields are required)</h4>
			}
			<form action="https://isitweeka.us7.list-manage.com/subscribe/post" method="POST">
				{/* NOTE: DO NOT DELETE THESE HIDDEN VALUES OR CHANGE THE SUBMIT LINK OR THINGS WILL BREAK */}
				<input type="hidden" name="u" value="1a205026e7a571c5b62dd369d" />
				<input type="hidden" name="id" value="249833b0f4" />
				<div className="input-container">
					<label htmlFor="name-input">Name:</label>
					<input required={true} placeholder={"Anakin Skywalker"} id="name-input MERGE6" type="text" name="MERGE6" />
				</div>
				<div className="input-container">
					<label htmlFor="email-input">Email:</label>
					<input required={true} placeholder={"anakin@gmail.com"} id="email-input MERGE0" type="email" name="MERGE0" />
				</div>
				<div className="input-checkbox-container">
					<label htmlFor="dob-input">I am age 13 or above & accept the privacy policy:</label>
					<input required={true} id="dob-input gdpr[49308]" type="checkbox" name="gdpr[49308]"/>
				</div>
				<Button buttonType="fill" style={{ fontSize: "1em" }} type="submit" onClick={handleClick} light>Sign up</Button>
				<a className="privacy-policy-link" href="/privacy.html">Privacy&nbsp;Policy</a>
			</form>
		</div>
	);
};


const MailingListContainer: React.FC = (props) => {

	const [mobileListIsOpen, setmobileListIsOpen] = useState(false);

	function mailingListMobileDismisser() {
		
		// When the modal is hidden...
		const scrollY = document.body.style.top;
		document.body.style.position = "";
		document.body.style.top = "";
		window.scrollTo(0, parseInt(scrollY || "0") * -1);
		setmobileListIsOpen(false);
	}

	useEffect(() => {

		// Wait and set modal
		setTimeout(() => {
			// Inital body adjustments
			// When the modal is shown, we want a fixed body#
			if (window.innerWidth <= SHOW_MOBILE_AT_WIDTH) {
				const scrolled = window.scrollY;
				console.log(scrolled);
				document.body.style.position = "fixed";
				document.body.style.top = `-${scrolled}px`;
				setmobileListIsOpen(true);
			}
		}, 4500);
	}, []);

	return (
		<>
			<BaseMailingListForm isListForMobile={false} />
			{ mobileListIsOpen &&
				<Portal>
					<div className="mobile-bg-cover"></div>
					<BaseMailingListForm isListForMobile={true} dimisser={mailingListMobileDismisser} />
				</Portal>
			}
		</>
	);
};

export default MailingListContainer;