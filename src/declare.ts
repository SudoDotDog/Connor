/**
 * @author WMXPY
 * @namespace Connor
 * @description Declare
 */

import { ConnorAssert } from "./assert";
import { ConnorError } from "./error";

export interface IConnorDictionary {
    [key: number]: string;
}

export type ErrorCreationFunction = (symbol: number | string, ...replaces: string[]) => ConnorError;

export type AssertCreationFunction = <T>(element: T) => ConnorAssert<T>;
