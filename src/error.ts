/**
 * @author WMXPY
 * @namespace Connor
 * @description Error
 */

export class ConnorError extends Error {

    public code: number;
    public description: string;
    public message: string;
    public module: string | undefined;

    public constructor(
        code: number,
        moduleName: string | undefined,
        description: string,
        ...replaces: string[]) {

        super();

        this.code = code;
        this.description = replaces.reduce((prev: string, current: string) => {
            return prev.replace('{}', current);
        }, description);
        this.message = moduleName + " [" + code + "]: " + this.description;
    }
}
