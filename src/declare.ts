/**
 * @author WMXPY
 * @namespace Connor
 * @description Declare
 */

import { ConnorError } from "./error";

export interface IConnorDictionary {
    [key: number]: string;
}

export type ErrorCreationFunction = (symbol: number | string, ...replaces: string[]) => ConnorError;
