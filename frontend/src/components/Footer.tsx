/**
 * Footer
 */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button.Forward";
import { faGithub, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = () => {
	return (
		<div className="footer">
			<a id="feedback-buttom" href="#"><Button >give feedback</Button></a>

			<p>Created by Madeline Hart & Kishan Sambhi.<br />&#169; {(new Date()).getFullYear()}, source available on GitHub under the MIT license.</p>

			<div className="outbound-links">
				<a target="__blank" href="https://github.com/Gum-Joe/isitweeka">
					<FontAwesomeIcon icon={faGithub} />&nbsp;
					<u>GitHub</u>
				</a>
				<a target="__blank" href="https://github.com/Gum-Joe/isitweeka/issues">
					<u>Feature Tracker</u>
				</a>
				<a target="__blank" href="mailto:info@isitweeka.com">
					<FontAwesomeIcon icon={faEnvelope} />&nbsp;
					<u>Email us</u>
				</a>
				<a target="__blank" href="/privacy.html"><u>Privacy Policy</u></a>
			</div>

			<h4>Find Kishan here:</h4>
			<ul>
				<a target="__blank" href="https://github.com/Gum-Joe"><li><FontAwesomeIcon icon={faGithub} /> GitHub</li></a>
				<a target="__blank" href="https://twitter.com/k_sam_mighty"><li><FontAwesomeIcon icon={faTwitter} /> Twitter</li></a>
				<a target="__blank" href="https://instagram.com/k_sam_mighty"><li><FontAwesomeIcon icon={faInstagram} /> Instagram</li></a>
				{/* NOTE: Change to a personal e-mail when leaving school */}
				<a target="__blank" href="mailto:15Sambhi614@camphillboys.bham.sch.uk"><li><FontAwesomeIcon icon={faEnvelope} /> Email</li></a>
			</ul>
			<h4>Find Madaline here:</h4>
			<p></p>
		</div>
	);
};

export default Footer;