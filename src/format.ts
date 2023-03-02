/**
 * @author WMXPY
 * @namespace Connor
 * @description Format
 */

export const formatReplace = (value: any): string => {

    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'number') {
        return value.toString();
    }

    return JSON.stringify(value);
};
