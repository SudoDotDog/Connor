/**
 * @author WMXPY
 * @namespace Connor
 * @description Index
 */

import { ConnorAssert } from "./assert";
import { AssertCreationFunction, ErrorCreationFunction, IConnorDictionary } from "./declare";
import { ConnorError } from "./error";
import { CONNOR_INTERNAL_ERROR, CONNOR_MODULE } from "./static";

export class Connor {

    public static instance(moduleName: string): Connor {

        if (this._has(moduleName)) {

            return this._instances.get(moduleName) as Connor;
        } else {

            const newConnor: Connor = new Connor(moduleName);
            this._instances.set(moduleName, newConnor);
            return newConnor;
        }
    }

    public static dictionary(moduleName: string, dict: IConnorDictionary): Connor {

        const connor: Connor = this.instance(moduleName);
        connor._combineDictionary(dict);
        return connor;
    }

    public static getErrorCreator(moduleName: string): ErrorCreationFunction {

        if (this._has(moduleName)) {

            const connor: Connor = this._instances.get(moduleName) as Connor;
            return connor.getErrorCreator();
        }
        throw new ConnorError(0, CONNOR_MODULE.CONNOR, CONNOR_INTERNAL_ERROR.MODULE_NOT_FOUND);
    }

    public static getAssertCreator(moduleName: string): AssertCreationFunction {

        if (this._has(moduleName)) {

            const connor: Connor = this._instances.get(moduleName) as Connor;
            return connor.getAssertCreator();
        }
        throw new ConnorError(0, CONNOR_MODULE.CONNOR, CONNOR_INTERNAL_ERROR.MODULE_NOT_FOUND);
    }

    private static _instances: Map<string, Connor>;

    private static _has(moduleName: string): boolean {

        if (this._instances === undefined) {

            this._instances = new Map<string, Connor>();
            return false;
        }

        return this._instances.has(moduleName);
    }

    private _dictionary: IConnorDictionary;
    private _moduleName: string;

    private constructor(moduleName: string) {

        if (moduleName === CONNOR_MODULE.CONNOR ||
            moduleName === CONNOR_MODULE.ASSERT) {

            throw new ConnorError(1, CONNOR_MODULE.CONNOR, CONNOR_INTERNAL_ERROR.MODULE_NAME_OCCUPIED);
        }

        this._dictionary = {};
        this._moduleName = moduleName;
    }

    public getRawDescription(symbol: number | string): string {

        if (typeof symbol === 'number') {

            const description: string | undefined = this._dictionary[symbol];
            if (description === undefined) {

                throw new ConnorError(0, CONNOR_MODULE.CONNOR, CONNOR_INTERNAL_ERROR.ERROR_NOT_FOUND);
            }
            return description;
        }
        return symbol;
    }

    public getErrorCreator(): ErrorCreationFunction {

        return createErrorCreator(this, this._moduleName);
    }

    public getAssertCreator(): <T>(element: T) => ConnorAssert<T> {

        return createAssertCreator(this, this._moduleName);
    }

    private _combineDictionary(dict: IConnorDictionary): Connor {

        this._dictionary = { ...this._dictionary, ...dict };
        return this;
    }
}

const createAssertCreator = (connor: Connor, moduleName: string): <T>(element: T) => ConnorAssert<T> => {

    return <T>(element: T): ConnorAssert<T> => {

        const creator: ErrorCreationFunction = createErrorCreator(connor, moduleName);
        return new ConnorAssert<T>(creator, element);
    };
};

const createErrorCreator = (connor: Connor, moduleName: string): ErrorCreationFunction => {

    return (symbol: number | string, ...replaces: string[]): ConnorError => {

        const info: string = connor.getRawDescription(symbol);
        const code: number
            = typeof symbol === 'number'
                ? symbol
                : 1;

        const error: ConnorError
            = new ConnorError(code, moduleName, info, ...replaces);

        return error;
    };
};

export default Connor;
export { AssertCreationFunction, ConnorAssert, ConnorError, ErrorCreationFunction, IConnorDictionary };
