/**
 * Footer
 */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button.Forward";
import { faGithub, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faAt, faLink } from "@fortawesome/free-solid-svg-icons";
import Socials from "./Socials";
import packageJSON from "../../package.json";

const Footer: React.FC = () => {
	return (
		<div className="footer">
			<a id="feedback-buttom" target="__blank" href="https://forms.gle/KaS2VUAmZqfS1Nf26"><Button>Give Feedback  →</Button></a>

			<p>
				Created and maintained by Kishan Sambhi &amp; Madeline Hart. <br />
				&#169; {(new Date()).getFullYear()}, source available on GitHub under the MIT license.<br /><br />
				Data controller information: data controlled by Kishan Sambhi, a KECH pupil, and will only ever be viewed by KECH pupils.<br />
				All changes to this site are reviewed, merged and deployed by a KECH pupil.<br /><br />
				Version {packageJSON.version}
			</p>

			<Socials />

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

			<div className="container-credits">
				<div>
					<h4>Find Kishan here:</h4>
					<ul>
						<a target="__blank" href="https://github.com/Gum-Joe"><li><FontAwesomeIcon icon={faGithub} /> GitHub</li></a>
						<a target="__blank" href="https://twitter.com/k_sam_mighty"><li><FontAwesomeIcon icon={faTwitter} /> Twitter</li></a>
						<a target="__blank" href="https://instagram.com/k_sam_mighty"><li><FontAwesomeIcon icon={faInstagram} /> Instagram</li></a>
						{/* NOTE: Change to a personal e-mail when leaving school */}
						<a target="__blank" href="mailto:15Sambhi614@camphillboys.bham.sch.uk"><li><FontAwesomeIcon icon={faEnvelope} /> Email</li></a>
					</ul>
				</div>

				<div>
					<h4>Find Madeline here:</h4>
					<ul>
						<a target="__blank" href="https://github.com/ILikeTeaALot"><li><FontAwesomeIcon icon={faGithub} /> GitHub</li></a>
						<a target="__blank" href="https://www.rykan.net"><li><FontAwesomeIcon icon={faLink} /> rykan.net</li></a>
						<a target="__blank" href="https://www.madelinehart.co.uk"><li><FontAwesomeIcon icon={faLink} /> madelinehart.co.uk</li></a>
						<a target="__blank" href="mailto:madeline@rykan.net"><li><FontAwesomeIcon icon={faAt} /> Email</li></a>
					</ul>
				</div>
			</div>

		</div>
	);
};

export default Footer;
