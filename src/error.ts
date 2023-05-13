/**
 * @author WMXPY
 * @namespace Connor
 * @description Error
 */

import { formatReplace } from "./format";

export class ConnorError extends Error {

    public readonly code: number;
    public readonly description: string;
    public readonly message: string;
    public readonly module: string | undefined;

    public constructor(
        code: number,
        moduleName: string | undefined,
        description: string,
        ...replaces: any[]) {

        const enrichedDescription: string =
            replaces.reduce((prev: string, current: string) => {
                return prev.replace('{}', formatReplace(current));
            }, description);

        const message: string = `${moduleName} [${code}]: ${enrichedDescription}`;

        super(message);

        this.code = code;
        this.description = enrichedDescription;
        this.message = message;

        Object.setPrototypeOf(this, ConnorError.prototype);
    }

    private _reduceDescription(description: string, replaces: string[]): string {

        return replaces.reduce((prev: string, current: string) => {
            return prev.replace('{}', formatReplace(current));
        }, description);
    }
}
