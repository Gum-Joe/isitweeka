/**
 * Creates a logger pointing to the right location for log files.
 * Please make sure env vars are loaded.
 *
 * @param logPrefix Prefix for lgos (the part of ECMS making log messages)
 */
export default function createLogger(logPrefix: string): import("winston").Logger;
