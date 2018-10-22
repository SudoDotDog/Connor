/**
 * @author WMXPY
 * @namespace Connor
 * @description Static
 */

export const INTERNAL_ERROR_MESSAGE = 'Connor Internal Error: {}';

export enum CONNOR_MODULE {
    ASSERT = 'ASSERT',
    CONNOR = 'CONNOR',
}

export enum ASSERT_ERROR_DESCRIPTION {
    ELEMENT_NOT_EXIST = 'Expect element exists, but, not exist',
    ELEMENT_NOT_TRUE = 'Expect element is true, but, false',
    ELEMENT_NOT_NUMBER = 'Expect element is a number, but, not a number',
    ELEMENT_NOT_STRING = 'Expect element is a string, but, not a string',
    ELEMENT_NOT_ARRAY = 'Expect element is an array, but, not an array',

    ELEMENT_SHOULD_HAS_KEY = 'Expect element has a key, but, does not',
}

export enum CONNOR_ERROR_DESCRIPTION {
    CORE_0_1_ARE_OCCUPIED = 'Code 0 and 1 are occupied by internal error',
    ERROR_NOT_FOUND = 'Error not found',
}
