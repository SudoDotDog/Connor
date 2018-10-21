/**
 * @author WMXPY
 * @namespace Connor
 * @description Index
 */

import { ErrorCreationFunction, IConnorDictionary } from "./declare";
import { ConnorError } from "./error";

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

    private static _instance: Connor | undefined;

    private _dictionary: IConnorDictionary;

    private constructor() {

        this._dictionary = {
            0: 'Connor Internal Error: {}',
        };
    }

    public getRawDescription(symbol: number | string): string {

        if (typeof symbol === 'number') {

            const description: string | undefined = this._dictionary[symbol];
            if (!description) {

                throw new ConnorError(0, 'Connor', this._dictionary[0], 'Error not found');
            }
            return description;
        }
        return symbol;
    }

    public getErrorCreator(moduleName?: string): ErrorCreationFunction {

        return createErrorCreator(this, moduleName);
    }

    private _combineDictionary(dict: IConnorDictionary): Connor {

        if (dict[0] || dict[1]) {

            throw new ConnorError(0, 'Connor', this._dictionary[0], 'Core 0 and 1 are occupied by internal error');
        }

        this._dictionary = { ...this._dictionary, ...dict };
        return this;
    }
}

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
