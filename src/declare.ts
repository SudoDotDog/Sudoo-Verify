/**
 * @author WMXPY
 * @namespace Verify
 * @description Declare
 */

export type MinorVerifyResult = {

    readonly succeed: boolean;
};

export type Invalid = {
};

export type MajorVerifyResult = {

    readonly invalids: Invalid[];
    readonly succeed: boolean;
};
