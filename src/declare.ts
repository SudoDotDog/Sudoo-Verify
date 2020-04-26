/**
 * @author WMXPY
 * @namespace Verify
 * @description Declare
 */

export type VerifyOptions = {

    readonly detailed: boolean;
};

export type Invalid = {
};

export type MajorVerifyResult = {

    readonly invalids: Invalid[];
    readonly succeed: boolean;
};
