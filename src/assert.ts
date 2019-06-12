/**
 * @author WMXPY
 * @namespace Connor
 * @description Assert
 */

export class Assert<T = any> {

    public static that<T = any>(element: T): Assert<T> {

        return new Assert<T>(element);
    }

    private readonly _element: T;

    private _reverse: boolean = false;

    private constructor(element: T) {

        this._element = element;
    }

    public get is(): this { return this; }
    public get to(): this { return this; }
    public get be(): this { return this; }
    public get should(): this { return this; }

    public get not(): this {
        this._reverse = true;
        return this;
    }
    public get value(): T {
        return this._element;
    }

    public exist(error?: Error): this {

        this._attempt(
            this._element !== null && this._element !== undefined,
            error,
        );
        return this;
    }

    public good(error?: Error): this {

        this._attempt(
            Boolean(this._element),
            error,
        );
        return this;
    }

    public true(error?: Error): this {

        this._attempt(
            typeof this._element === 'boolean' && this._element,
            error,
        );
        return this;
    }

    public array(error?: Error): this {

        this._attempt(
            Array.isArray(this._element),
            error,
        );
        return this;
    }

    public object(error?: Error): this {

        this._attempt(
            this._element !== null && typeof this._element === 'object',
            error,
        );
        return this;
    }

    public number(error?: Error): this {

        this._attempt(
            typeof this._element === 'number',
            error,
        );
        return this;
    }

    public string(error?: Error): this {

        this._attempt(
            typeof this._element === 'string',
            error,
        );
        return this;
    }

    public has(key: string, error?: Error): this {

        this._attempt(
            this._element[key] !== null && this._element[key] !== undefined,
            error,
        );
        return this;
    }

    private _attempt(condition: boolean, error?: Error): void {

        if (!this._condition(condition)) {
            const parsedError: Error = error || new Error('[Connor] Assert Failed');

            throw parsedError;
        }
        return;
    }

    private _condition(condition: boolean): boolean {

        if (this._reverse) {
            return !condition;
        }
        return condition;
    }
}
