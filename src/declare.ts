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

export type MajorVerifyResult = {

    readonly invalids: Invalid[];
    readonly succeed: boolean;
};
