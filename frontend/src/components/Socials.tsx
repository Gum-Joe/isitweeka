import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

/**
 * Social Media links
 */
const Socials: React.FC = (props) => {
	return (
		<div className="social-container">
			<a href="https://instagram.com/isitweeka" target="__blank" className="instagram"><FontAwesomeIcon size={"2x"} icon={faInstagram} /></a>
			<a href="https://twitter.com/IsItWeekA" target="__blank" className="twitter"><FontAwesomeIcon size={"2x"} icon={faTwitter} /></a>
		</div>
	);
};

export default Socials;