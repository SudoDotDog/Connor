/**
 * @author WMXPY
 * @namespace Connor
 * @description Error
 */

export class ConnorError extends Error {

    public readonly code: number;
    public readonly description: string;
    public readonly message: string;
    public readonly module: string | undefined;

    public constructor(
        code: number,
        moduleName: string | undefined,
        description: string,
        ...replaces: string[]) {

        super();

        this.code = code;
        this.description = this._reduceDescription(description, replaces);

        this.message = `${moduleName} [${code}]: ${this.description}`;
    }

    private _reduceDescription(description: string, replaces: string[]): string {

        return replaces.reduce((prev: string, current: string) => {
            return prev.replace('{}', current);
        }, description);
    }
}
