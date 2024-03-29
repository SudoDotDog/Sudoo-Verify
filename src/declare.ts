/**
 * @author WMXPY
 * @namespace Verify
 * @description Declare
 */

export type VerifyOption = {

    readonly hidden: boolean;
    readonly breaking: boolean;
};

export type InvalidSlice = 'type' | 'size' | 'value' | 'range' | 'internal' | 'hidden';
export type StackElement = string | number;
export type ExpectElement = RegExp | Date | string | number | boolean | undefined | null;

export type Invalid = {

    readonly expect: ExpectElement;
    readonly actual: ExpectElement;

    readonly slice: InvalidSlice;
    readonly stack: StackElement[];

    readonly relationship?: string;
};

export type VerifyResult = {

    readonly invalids: Invalid[];
    readonly succeed: boolean;
};

export type StringedResult = {

    readonly invalids: string[];
    readonly succeed: boolean;
};

export type VerifyFunction<P = any> = (pattern: P, target: any, option: VerifyOption, stack: StackElement[]) => Invalid[];

export const createInvalid = (expect: ExpectElement, actual: ExpectElement, slice: InvalidSlice, stack: StackElement[], relationship?: string): Invalid => {

    if (typeof relationship === 'string') {

        return {
            expect,
            actual,
            slice,
            stack,
            relationship,
        };
    }

    return {
        expect,
        actual,
        slice,
        stack,
    };
};

export const createTypeInvalid = (expect: ExpectElement, actual: ExpectElement, stack: StackElement[]): Invalid => {

    return createInvalid(expect, actual, 'type', stack);
};

export const createSizeInvalid = (expect: ExpectElement, actual: ExpectElement, stack: StackElement[]): Invalid => {

    return createInvalid(expect, actual, 'size', stack);
};

export const createValueInvalid = (expect: ExpectElement, actual: ExpectElement, stack: StackElement[]): Invalid => {

    return createInvalid(expect, actual, 'value', stack);
};

export const createRangeInvalid = (expect: ExpectElement, actual: ExpectElement, relationship: string, stack: StackElement[]): Invalid => {

    return createInvalid(expect, actual, 'range', stack, relationship);
};

export const createInternalInvalid = (expect: ExpectElement, actual: ExpectElement, stack: StackElement[]): Invalid => {

    return createInvalid(expect, actual, 'internal', stack);
};

export const createHiddenInvalid = (expect: ExpectElement, actual: ExpectElement, stack: StackElement[]): Invalid => {

    return createInvalid(expect, actual, 'hidden', stack);
};

export const createVerifyResult = (succeed: boolean, invalids: Invalid[] = []): VerifyResult => {

    return {
        succeed,
        invalids,
    };
};

export const createStringedResult = (succeed: boolean, invalids: string[] = []): StringedResult => {

    return {
        succeed,
        invalids,
    };
};
