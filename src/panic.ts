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

    public code(code: Code, ...replaces: any[]): ConnorError {

        return this._getError(code, ...replaces);
    }

    public message(code: Code, ...replaces: any[]): string {

        const error: ConnorError = this.code(code, ...replaces);
        return error.message;
    }

    public flint(code: Code): (...replaces: any[]) => ConnorError {

        return (...replaces: string[]) => {
            return this.code(code, ...replaces);
        };
    }

    public paper(code: Code): (...replaces: any[]) => string {

        return (...replaces: string[]) => {
            return this.message(code, ...replaces);
        };
    }
}
