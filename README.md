# isitweeka

This repo contains the source code for the website https://isitweeka.com/, a centre of information for students of King Edward VI Camp Hill School for Boys and King Edward VI Camp Hill School for Girls.

It is primarily concerned with telling students what timetable week it is (A or B), but also provides information on school events (including house event results) and an alert banner for important news (ranging from green and blue for low level alerts, to red for breaking news).

It also has a widely followed social media account covering school news, events and house events. See [@isitweeka](https://instagram.com/isitweeka) on Instagram for this.

Our frontend in `frontend/` is based on Create React App. A CI script builds this into a bundle every push and deploys it to GitHub Pages to host our website.

Here's how everything in this repo works:

## How we find out what week it is
At a higher level (for a deeper level, and the modules involved, read the code) we find the week like this:

### Before academic year 2022/23
1. Every other week we download a copy of the school's calendar of events as a `.ical` file
2. This file is stored on our website as a static file
3. When the site loads, the ical file is fetched
4. We find the current date in the calendar, and rewind back to the nearest `weekMarkerDate` (a number, where 0 is Sunday, where an event saying what week it is should be found).
	- On Saturdays and Sundays however, we go to the *next* monday as students will be interested in what the next week is
5. If there is an event "Week A" or "Week B", display the week detected. Else, say it is neither Week A or B

### From academic year 2022/23
KECHB (but not KECHG) changed how they define the week this year (moving from a separate event each week defining the week to a recurring event), and so an algorithm change was needed:
1. Every other week we download a copy of the school's calendar of events as a `.ical` file
2. This file is stored on our website as a static file
3. When the site loads, the ical file is fetched
4. If a recurring rule is used, loop through recurrences until one matching this (or next on weekends) week is found. If no recurrences, the same steps as 4. apply
5. Use the current date (weekday or weekend) to determine the message shown ("It is" or "Next week is")
6. If no recurrence or IIWA marker event is found, say it is neither Week A or B

Code also exists to do this detection on a server, with the site then just requesting an API that says what week it is. However this requires running a server which costws money, so instead this client side detection is used instead.

## Structure of repo
### Packages
IsItWeekA makes use of a monorepo structure to hold the various modules that make it up:
- `@isitweeka/core`
	- Held in `packages/@isitweeka/core`
	- Contains code shared between all modules of IIWA, namely:
		- Common constants for:
			- Calendar URLs
			- `WEEK_MARKER_DATE_`: the day (where 0 is Sunday) of the event (or recurrence of the root event), each week, in the school calendar that marks if the Week is A or B.
			- Redis keys for our sever side APIs (see explanation of API below)
		- Common logger shared between modules (specfically a `LogFactory`, where you provide a location for log file and a `winston` Logger is returned)
- `libisitweeka`
	- Held in `packages/libisitweeka`
	- Contains a class, `IsItWeekA`, that has the actual logic to find what week it is (see doc comments for it's specific usage)
	- It would be nice to one day replace this with a platform neutral implementation - e.g. a Rust/WASM implementation of the algorithms
- `frontend`
	- Held in `frontend/`
	- A Create React App project with all the frontend code of the site, includes SCSS (Sass) for styling and static assets
- `isitweeka-server`
	- Held in `server/`
	- Contains code for a server to serve the IsItWeekA API (generally unused)
	- **_See below for why this exists_**
- `@isitweeka/service-___`
	- Services that provide information for `isitweeka-server`
	- **_See below for why this exists_**

### Other folders
Below, find how things are structured in this repo:
- `.github/` - CI config files, such as the CI that buids and deploys the website, and the CI that regularly updates our copy of the school calendars stored in `frontend/public/cal`
	- *NOTE:* When this runs and pushes an update to the repo, it does not trigger a site deployment!
- `assets/` - Core assets of IsItWeekA, namely copies of our Logo in various sizes
- `config/`
	- Contains our shared TypeScript config file used by all modules
	- The file `tsconfig.json` in the root of the repo references all the modules, allowing TS Incemental Builds and TS Projects to be used - one command builds everything
- `scripts/` - misc. scripts 

## The API
Whilst this is currently not deployed, sometimes a server-side API is required. This is normally for when the site needs to fetch data from external APIs such as Eventbrite - this requires an API key, which we can't put in public client-side code.

Therefore, an API was created. I wanted something modular, so this is what we did:
1. There are a series of services that run as their __own programs__P:
	1. `packages/@isitweeka/service-kech/` - using `libisitweeka` figure out the current week for KECHB and KECHG once every 30 seconds
	2. `packages/@isitweeka/service-eventbrite`
		1. This is used to fetched donation data from Eventbrite
		2. It is configurable by environment variables for the API Key, Organisation ID and Event ID
		3. Runs every 30 seconds
2. These services fetch data and place it into a Redis database
	1. This means services can be written in any platform we want so long as it can reach the Redis DB
	2. For simplicity, TypeScript (node.js) was used, but Python, Rust, Java, anything could be used
	3. Redis keys to use for each service are stored in `packages/@isitweea/core/src/constants.ts`
3. The server `server/` receives requests from clients at specific routes, fetches the appropriate key from redis and sends it back to the client

The API runs using docker containers:
1. Each service has a docker file
2. These docker files are build (manually!) and uploaded to a GitHub container registry for my username Gum-Joe
3. A server then uses docker compose to pull and run these containers

Since the API is setup lik this, to add a new sevice:
1. Write the service, set up to store the result of each fetch in a specfic redis key
2. Build it as a docker image and add it to the `docker-compose.yml` files
3. Add a route in `server/` that returns the data from Redis
4. Rebuild server image
5. Push newly built images to a container registry
6. Use the docker compose config files (the `.prod.yml` one) to deploy the updated images to production so they can be used as the API

## Building everything (frontend, API, etc.)
### Requirements
- Node.js LTS
- The `yarn` package manager
### Development
#### All modules
```bash
yarn
yarn run build
```
#### Frontend only
```bash
yarn
yarn run build
cd frontend
yarn start
```
### Production
#### Frontend only
```bash
yarn
yarn run build
cd frontend
yarn build
```
The contents of `frontend/build` may then be served as a static site. 
### The API (for production)
1. Make a copy of `.env.template` as `.env`. Here, fill in the environment variables as apprioraite:
	1. For Eventbrite service (`@isitweeka/service-eventbrite`):
		1. `IIWA_EVENTBRITE_ORG_ID`: the ID of the organisation holding the event you want to track total net revenue (i.e. amount raised) of
		2. `IIWA_EVENTBRITE_EVENT_ID`: the ID of the event you want to track total net revenue (i.e. amount raised) of
		3. `IIWA_EVENTBRITE_ACCESS_TOKEN`: Access Token of an account with appropriate permissions to access said event in the Eventbrite Organiser (get one at https://www.eventbrite.com/platform/)
2. Build docker containers with `docker compose build`
3. Push built images to GH container registry
4. Deploy in production with `docker compose -f docker-compose.prod.yml up` (make sure secrets file (`.env`) has been copied to prod)
