import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

/**
 * Social Media links
 */
const Socials: React.FC = (props) => {
	return (
		<div className="social-container">
			<div className="instagram"><FontAwesomeIcon size={"2x"} icon={faInstagram} /></div>
			<div className="twitter"><FontAwesomeIcon size={"2x"} icon={faTwitter} /></div>
		</div>
	);
};

export default Socials;