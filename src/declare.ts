/**
 * @author WMXPY
 * @namespace Verify
 * @description Declare
 */

export type VerifyOption = {

    readonly detailed: boolean;
    readonly breaking: boolean;
};

export type InvalidSlice = 'type' | 'value';
export type StackElement = string | number;

export type Invalid = {

    readonly expect: string;
    readonly actual: string;

    readonly slice: InvalidSlice;
    readonly stack: StackElement[];
};

export type VerifyResult = {

    readonly invalids: Invalid[];
    readonly succeed: boolean;
};

export type VerifyFunction<P extends any = any> = (pattern: P, target: any, option: VerifyOption, stack: StackElement[]) => Invalid[];

export const createInvalid = (expect: string, actual: string, slice: InvalidSlice, stack: StackElement[]): Invalid => {

    return {
        expect,
        actual,
        slice,
        stack,
    };
};

export const createTypeInvalid = (expect: string, actual: string, stack: StackElement[]): Invalid => {

    return createInvalid(expect, actual, 'type', stack);
};

export const createVerifyResult = (succeed: boolean, invalids: Invalid[] = []): VerifyResult => {

    return {
        succeed,
        invalids,
    };
};
