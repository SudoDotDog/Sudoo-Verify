/**
 * @author WMXPY
 * @namespace Verify
 * @description Declare
 */

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

export const createVerifyResult = (succeed: boolean, invalids: Invalid[] = []): VerifyResult => {

    return {
        succeed,
        invalids,
    };
};
