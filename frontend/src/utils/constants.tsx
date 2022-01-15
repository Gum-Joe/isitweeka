/** Type to represent a (Gregorian calendar!) day */
export type GregorianDay = 0 | 1 | 2 | 3 | 4 | 5 | 6; 

/** Name of Cookie used to store school preference */
export const COOKIE_SCHOOL_PREFERENCE = "SchoolPreference";

/**
 * Base URL of IsItWeekA as a Service
 */
export const IIWA_BASE_URL = "http://localhost:4000";
export const IIWA_KECHB_URL = `${IIWA_BASE_URL}/isitweeka/kechb`;
export const IIWA_KECHG_URL = `${IIWA_BASE_URL}/isitweeka/kechg`;
export const IIWA_CW_URL = `${IIWA_BASE_URL}/eventbrite/cw`;