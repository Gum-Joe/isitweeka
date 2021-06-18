import React from "react";

/**
 * Video container - used to render YT embeds at the top of the page.
 * We used this for april fools 2021 - hence the hard coded URL.
 */
const YouTubeContainer = () => {
	return (
		<div className="yt-container">
			<iframe width="840" height="472.5" src="https://www.youtube.com/embed/2qbcHv7wXck" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
		</div>
	);
};

export default YouTubeContainer;