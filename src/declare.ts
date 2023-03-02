/**
 * @author WMXPY
 * @namespace Connor
 * @description Declare
 */

import { ConnorAssert } from "./assume";
import { ConnorError } from "./error";

export type ConnorDictionary = Record<number, string>;
export type ErrorCreationFunction = (symbol: number | string, ...replaces: any[]) => ConnorError;
export type AssertCreationFunction = <T>(element: T) => ConnorAssert<T>;
