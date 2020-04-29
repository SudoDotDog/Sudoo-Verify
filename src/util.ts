/**
 * @author WMXPY
 * @namespace Verify
 * @description Util
 */

import { createInternalInvalid, Invalid, VerifyResult } from "./declare";

export const attemptParseDate = (value: any, allowString: boolean): Date | null => {

    if (value instanceof Date) {

        const timeStamp: number = value.getTime();
        if (isNaN(timeStamp)) {
            return null;
        }
        return value;
    }

    if (allowString) {
        const timeStamp: number = Date.parse(value);
        if (isNaN(timeStamp)) {
            return null;
        }

        return new Date(timeStamp);
    }

    return null;
};

export const fillVerifyResult = (result?: VerifyResult | null): VerifyResult => {

    if (result === null) {

        return {
            succeed: false,
            invalids: [createInternalInvalid('exist', 'null', [])],
        };
    }

    if (typeof result === 'undefined') {

        return {
            succeed: false,
            invalids: [createInternalInvalid('exist', 'undefined', [])],
        };
    }

    if (result) {
        return result;
    }

    return {
        succeed: false,
        invalids: [createInternalInvalid('exist', 'unknown', [])],
    };
};

export const stringifyInvalid = (invalid: Invalid): string => {

    const expect: string = invalid.expect.toString();
    const actual: string = invalid.actual.toString();

    switch (invalid.slice) {

        case 'range': {
            const relationship: string = invalid.relationship ? invalid.relationship.toString() : 'in';
            return `Invalid Range; Should ${relationship} ${expect}; But got ${actual}`;
        }
        case 'size': {
            return `Invalid Size; Should be size of ${expect}; But got size of ${actual}`;
        }
        case 'type': {
            return `Invalid Type; Should be type of ${expect}; But got type of ${actual}`;
        }
        case 'value': {
            return `Invalid Value; Should be ${expect}; But got ${actual}`;
        }
        case 'internal': {
            return `Internal Error; Should be ${expect}; But got ${actual}`;
        }
    }

    return `Invalid with unknown reason`;
};