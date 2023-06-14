/**
 * Stores interfaces used by ECMS
 * @packageDocumentation
 */
import type { Request, Response } from "express";
/**
 * An Express Request object with a type annotation for req.body
 */
export type RequestWithBody<T> = Request<Record<string, string>, any, Partial<T>>;
interface APIMessage {
    message: string;
}
/**
 * Allow us to respond with either the intended response (if code 200), or an error message
 * @template T the type of the intended response if the server returns a 200 code.
 */
export type ECMSResponse<T = undefined> = T extends undefined ? Response<APIMessage> : Response<T | APIMessage>;
export {};
