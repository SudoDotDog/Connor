/**
 * @author WMXPY
 * @namespace Connor
 * @description Panic
 */

import { ErrorCreationFunction } from "./declare";
import { ConnorError } from "./error";
import Connor from "./index";

export class Panic<Code extends string | number> {

    public static withDictionary<Code extends string | number>(moduleName: string, errorList: string): Panic<Code> {

        return new Panic<Code>(moduleName, errorList);
    }

    private readonly _getError: ErrorCreationFunction;

    private constructor(moduleName: string, errorList: string) {

        Connor.dictionary(moduleName, errorList);
        this._getError = Connor.getErrorCreator(moduleName);
    }

    public code(code: Code, ...replaces: string[]): ConnorError {

        return this._getError(code, ...replaces);
    }
}
