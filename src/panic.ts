/**
 * @author WMXPY
 * @namespace Connor
 * @description Panic
 */

import { Connor } from "./connor";
import { ErrorCreationFunction } from "./declare";
import { ConnorError } from "./error";

export class Panic<Code extends string | number> {

    public static withDictionary<Code extends string | number>(moduleName: string, errorList: Record<number, string>): Panic<Code> {

        Connor.dictionary(moduleName, errorList);
        return new Panic<Code>(moduleName);
    }

    public static fromModule<Code extends string | number>(moduleName: string): Panic<Code> {

        return new Panic<Code>(moduleName);
    }

    private readonly _getError: ErrorCreationFunction;

    private constructor(moduleName: string) {

        this._getError = Connor.getErrorCreator(moduleName);
    }

    public code(code: Code, ...replaces: string[]): ConnorError {

        return this._getError(code, ...replaces);
    }
}
