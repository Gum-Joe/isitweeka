/** Type to represent a (Gregorian calendar!) day */
export type GregorianDay = 0 | 1 | 2 | 3 | 4 | 5 | 6; 

/** Name of Cookie used to store school preference */
export const COOKIE_SCHOOL_PREFERENCE = "SchoolPreference";

export const FAKE_TICKET_TOTAL = (475 * 4 + (34 * 7));
export const CW_TARGET = 3000;

/**
 * Base URL of IsItWeekA as a Service
 */
export const IIWA_BASE_URL = "https://api.isitweeka.com";
export const IIWA_KECHB_URL = `${IIWA_BASE_URL}/isitweeka/kechb`;
export const IIWA_KECHG_URL = `${IIWA_BASE_URL}/isitweeka/kechg`;
export const IIWA_CW_URL = `${IIWA_BASE_URL}/eventbrite/cw`;

export const SHOW_CHARITY_CARD = true;
export const SHOW_CHARITY_CARD_WHEN_ERROR = process.env.NODE_ENV != "production";