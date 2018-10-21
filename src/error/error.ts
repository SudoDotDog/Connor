/**
 * @author WMXPY
 * @namespace Util_Error
 * @description Error
 */

export class ConnorError extends Error {

    public code: number;
    public description: string;
    public message: string;

    public constructor(code: number, description: string, ...replaces: string[]) {

        super();

        this.code = code;
        this.description = description;
        this.message = code + ": " + description;
    }
}

// export const error = (code: ERROR_CODE, ...replaces: string[]): MarkedError => {

//     const newError: MarkedError = Boolean(ERROR_LIST[code])
//         ? new MarkedError(code, ERROR_LIST[code], info, node, trace)
//         : new MarkedError(ERROR_CODE.INTERNAL_ERROR, ERROR_LIST[ERROR_CODE.INTERNAL_ERROR], info, node, trace);

//     if (newError.code > 9001) console.log(newError);
//     return newError;
// };
