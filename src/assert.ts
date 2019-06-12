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

    public get is(): this {
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
    public get value(): T {
        return this._element;
    }

    public exist(error: Error): T {

        if (this._condition(
            this._element === null
            || this._element === undefined,
        )) {
            throw error;
        }
        return this._element;
    }

    private _condition(condition: boolean): boolean {

        if (this._reverse) {
            return !condition;
        }
        return condition;
    }
}
