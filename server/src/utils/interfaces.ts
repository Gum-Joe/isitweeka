/**
 * Stores interfaces used by ECMS
 * @packageDocumentation
 */
import { APIMessage } from "@ecms/api/common";
import { GeneralTaskStatus, TaskStatus } from "@ecms/api/common";
import { ReqUploadCompetitorsCSV, SetupStates } from "@ecms/api/setup";
import type { Request, Response } from "express";

/**
 * An Express Request object with a type annotation for req.body
 */
export type RequestWithBody<T> = Request<Record<string, string>, any, Partial<T>>

/**
 * Allow us to respond with either the intended response (if code 200), or an error message
 * @template T the type of the intended response if the server returns a 200 code.
 */
export type ECMSResponse<T = undefined> = T extends undefined ? Response<APIMessage> : Response<T | APIMessage>

/**
 *  What's stored in Redis when importing competitors
 */
export type RedisCompetitorImport = Record<keyof ReqUploadCompetitorsCSV, string>



/**
 * Partial setup in redis when setup is running
 */
export interface PartialSetup {
	status: SetupStates;
	/** JSON setup data of form {@link SetupEventOrGroup} */
	data: string;
	// If set, means we need to grab a CSV.
	hasImportedCompetitors?: boolean;
}