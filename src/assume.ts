/**
 * @author WMXPY
 * @namespace Connor
 * @description Assume
 */

import { isNumber, isString } from "util";
import { ErrorCreationFunction } from "./declare";
import { ConnorError } from "./error";
import { ASSERT_ERROR_DESCRIPTION } from "./static";

export class ConnorAssert<T> {

    private _creator: ErrorCreationFunction;
    private _elements: T[];
    private _reverse: boolean;

    public constructor(creator: ErrorCreationFunction, element: T) {

        this._creator = creator;
        this._elements = [element];
        this._reverse = false;
    }

    public get is(): this {
        return this;
    }
    public get are(): this {
        return this;
    }
    public get to(): this {
        return this;
    }
    public get be(): this {
        return this;
    }

    public get not(): this {

        this._reverse = true;
        return this;
    }

    public and(element: T): this {

        this._elements.push(element);
        return this;
    }

    public exist(symbol?: number | string, ...replaces: string[]): this {

        const result: boolean = this._eachElement((value: T) => {

            return value !== null && value !== undefined;
        });
        if (!result) {

            throw this._error(ASSERT_ERROR_DESCRIPTION.ELEMENT_NOT_EXIST, symbol, ...replaces);
        }
        return this;
    }

    public true(symbol?: number | string, ...replaces: string[]): this {

        const result: boolean = this._eachElement((value: T) => {

            return Boolean(value);
        });
        if (!result) {

            throw this._error(ASSERT_ERROR_DESCRIPTION.ELEMENT_NOT_TRUE, symbol, ...replaces);
        }
        return this;
    }

    public array(symbol?: number | string, ...replaces: string[]): this {

        const result: boolean = this._eachElement((value: T) => {

            return value instanceof Array;
        });
        if (!result) {

            throw this._error(ASSERT_ERROR_DESCRIPTION.ELEMENT_NOT_ARRAY, symbol, ...replaces);
        }
        return this;
    }

    // eslint-disable-next-line id-blacklist
    public number(symbol?: number | string, ...replaces: string[]): this {

        const result: boolean = this._eachElement((value: T) => {

            return isNumber(value);
        });
        if (!result) {

            throw this._error(ASSERT_ERROR_DESCRIPTION.ELEMENT_NOT_NUMBER, symbol, ...replaces);
        }
        return this;
    }

    // eslint-disable-next-line id-blacklist
    public string(symbol?: number | string, ...replaces: string[]): this {

        const result: boolean = this._eachElement((value: T) => {

            return isString(value);
        });
        if (!result) {

            throw this._error(ASSERT_ERROR_DESCRIPTION.ELEMENT_NOT_STRING, symbol, ...replaces);
        }
        return this;
    }

    public has(key: string | number, symbol?: number | string, ...replaces: string[]): this {

        const result: boolean = this._eachElement((value: T) => {

            return Boolean(value) && Boolean((value as any)[key]);
        });
        if (!result) {

            throw this._error(ASSERT_ERROR_DESCRIPTION.ELEMENT_SHOULD_HAS_KEY, symbol, ...replaces);
        }
        return this;
    }

    public firstValue(): T {

        return this._elements[0];
    }

    private _error(description: string, symbol?: number | string, ...replaces: string[]): ConnorError {

        if (symbol !== undefined) {

            return this._creator(symbol, ...replaces);
        }
        return this._creator(0, description);
    }

    private _eachElement(func: (value: T) => boolean): boolean {

        for (const element of this._elements) {

            const result: boolean = func(element);
            if (this._reverse === result) {

                return false;
            }
        }
        return true;
    }
}
