/**
 * @author WMXPY
 * @namespace Connor
 * @description Index
 */

import { ConnorAssert } from "./assert";
import { ErrorCreationFunction, IConnorDictionary } from "./declare";
import { ConnorError } from "./error";
import { CONNOR_ERROR_DESCRIPTION, CONNOR_MODULE, INTERNAL_ERROR_MESSAGE } from "./static";

export class Connor {

    public static get instance(): Connor {

        if (!this._instance) {

            this._instance = new Connor();
        }
        return this._instance;
    }

    public static dictionary(dict: IConnorDictionary): Connor {

        const connor: Connor = this.instance;
        connor._combineDictionary(dict);
        return connor;
    }

    public static refresh(): void {

        this._instance = undefined;
    }

    public static getErrorCreator(moduleName?: string): ErrorCreationFunction {

        return this.instance.getErrorCreator(moduleName);
    }

    public static getAssertCreator(moduleName?: string): <T>(element: T) => ConnorAssert<T> {

        return this.instance.getAssertCreator(moduleName);
    }

    private static _instance: Connor | undefined;

    private _dictionary: IConnorDictionary;

    private constructor() {

        this._dictionary = {
            0: INTERNAL_ERROR_MESSAGE,
        };
    }

    public getRawDescription(symbol: number | string): string {

        if (typeof symbol === 'number') {

            const description: string | undefined = this._dictionary[symbol];
            if (!description) {

                throw new ConnorError(0,
                    CONNOR_MODULE.CONNOR,
                    this._dictionary[0],
                    CONNOR_ERROR_DESCRIPTION.ERROR_NOT_FOUND);
            }
            return description;
        }
        return symbol;
    }

    public getErrorCreator(moduleName?: string): ErrorCreationFunction {

        return createErrorCreator(this, moduleName);
    }

    public getAssertCreator(moduleName?: string): <T>(element: T) => ConnorAssert<T> {

        return createAssertCreator(this, moduleName);
    }

    private _combineDictionary(dict: IConnorDictionary): Connor {

        if (dict[0] || dict[1]) {

            throw new ConnorError(0,
                CONNOR_MODULE.CONNOR,
                this._dictionary[0],
                CONNOR_ERROR_DESCRIPTION.CORE_0_1_ARE_OCCUPIED);
        }

        this._dictionary = { ...this._dictionary, ...dict };
        return this;
    }
}

const createAssertCreator = (connor: Connor, moduleName?: string): <T>(element: T) => ConnorAssert<T> => {

    return <T>(element: T): ConnorAssert<T> => {

        const creator: ErrorCreationFunction = createErrorCreator(connor, moduleName);
        return new ConnorAssert<T>(creator, element);
    };
};

const createErrorCreator = (connor: Connor, moduleName?: string): ErrorCreationFunction => {

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
export {
    ConnorAssert,
    ErrorCreationFunction as ConnorError,
};
