/**
 * @author WMXPY
 * @namespace Verify
 * @description Declare
 */

export type VerifyOption = {

    readonly detailed: boolean;
    readonly breaking: boolean;
};

export type InvalidSlice = 'type' | 'size' | 'value';
export type StackElement = string | number;
export type ExpectElement = string | number | boolean;

export type Invalid = {

    readonly expect: ExpectElement;
    readonly actual: ExpectElement;

    readonly slice: InvalidSlice;
    readonly stack: StackElement[];
};

export type VerifyResult = {

    readonly invalids: Invalid[];
    readonly succeed: boolean;
};

export type VerifyFunction<P extends any = any> = (pattern: P, target: any, option: VerifyOption, stack: StackElement[]) => Invalid[];

export const createInvalid = (expect: ExpectElement, actual: ExpectElement, slice: InvalidSlice, stack: StackElement[]): Invalid => {

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

export const createVerifyResult = (succeed: boolean, invalids: Invalid[] = []): VerifyResult => {

    return {
        succeed,
        invalids,
    };
};
