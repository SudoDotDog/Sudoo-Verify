/**
 * @author WMXPY
 * @namespace Verify
 * @description Declare
 */

import { Pattern } from "./pattern";

export type VerifyOption = {

    readonly detailed: boolean;
    readonly breaking: boolean;
};

export type Invalid = {

    readonly stack: string[];
};

export type VerifyResult = {

    readonly invalids: Invalid[];
    readonly succeed: boolean;
};

export type VerifyFunction<P extends any = any> = (pattern: P, target: any, option: VerifyOption, stack: string[]) => Invalid[];

export const createVerifyResult = (succeed: boolean, invalids: Invalid[] = []): VerifyResult => {

    return {
        succeed,
        invalids,
    };
};
