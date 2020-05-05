/**
 * @author WMXPY
 * @namespace Verify
 * @description Util
 */

import { createHiddenInvalid, createInternalInvalid, createStringedResult, createVerifyResult, ExpectElement, Invalid, StackElement, StringedResult, VerifyResult } from "./declare";

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

        const nulledInvalid: Invalid = createInternalInvalid('exist', 'null', []);
        return createVerifyResult(false, [nulledInvalid]);
    }

    if (typeof result === 'undefined') {

        const undefinedInvalid: Invalid = createInternalInvalid('exist', 'undefined', []);
        return createVerifyResult(false, [undefinedInvalid]);
    }

    if (result) {
        return result;
    }

    const invalid: Invalid = createInternalInvalid('exist', 'unknown', []);
    return createVerifyResult(false, [invalid]);
};

export const fillStringedResult = (result?: StringedResult | null): StringedResult => {

    if (result === null) {

        const nulledInvalid: string = stringifyInvalid(createInternalInvalid('exist', 'null', []));
        return createStringedResult(false, [nulledInvalid]);
    }

    if (typeof result === 'undefined') {

        const undefinedInvalid: string = stringifyInvalid(createInternalInvalid('exist', 'undefined', []));
        return createStringedResult(false, [undefinedInvalid]);
    }

    if (result) {
        return result;
    }

    const invalid: string = stringifyInvalid(createInternalInvalid('exist', 'unknown', []));
    return createStringedResult(false, [invalid]);
};

export const stringifyStack = (stack: StackElement[]): string => {

    if (stack.length === 0) {

        return 'ROOT';
    }

    const stackList: string[] = stack.map((each: StackElement) => each.toString());
    return stackList.join('.');
};

export const getTypeOf = (target: any): string => {

    if (target === null) {
        return 'null';
    }

    return typeof target;
};

export const stringifyExpectElement = (element: ExpectElement): string => {

    if (typeof element === 'undefined') {
        return 'undefined';
    }

    if (element === null) {
        return 'null';
    }

    return element.toString();
};

export const stringifyInvalid = (invalid: Invalid): string => {

    const expect: string = stringifyExpectElement(invalid.expect);
    const actual: string = stringifyExpectElement(invalid.actual);

    const stackText: string = stringifyStack(invalid.stack);

    switch (invalid.slice) {

        case 'range': {
            const relationship: string = invalid.relationship ? invalid.relationship.toString() : 'in';
            return `Invalid Range of [${stackText}]; Should (${relationship}) "${expect}"; But got "${actual}"`;
        }
        case 'size': {
            return `Invalid Size of [${stackText}]; Should be size of "${expect}"; But got size of "${actual}"`;
        }
        case 'type': {
            return `Invalid Type of [${stackText}]; Should be type of "${expect}"; But got type of "${actual}"`;
        }
        case 'value': {
            return `Invalid Value of [${stackText}]; Should be "${expect}"; But got "${actual}"`;
        }
        case 'internal': {
            return `Internal Error of [${stackText}]; Should be "${expect}"; But got "${actual}"`;
        }
        case 'hidden': {
            return `Type Error`;
        }
    }

    return `Invalid with unknown reason`;
};

export const hideInvalidDetail = (invalid: Invalid): Invalid => {

    const newInvalid = createHiddenInvalid('expect', 'actual', invalid.stack);
    return newInvalid;
};
