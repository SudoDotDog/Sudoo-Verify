/**
 * @author WMXPY
 * @namespace Verify
 * @description Verify
 */

import { MajorVerifyResult, MinorVerifyResult } from "./declare";
import { Pattern, StringPattern } from "./pattern";

export const verifyPattern = (pattern: Pattern, target: any): MajorVerifyResult => {

    return {
        invalids: [],
        succeed: true,
    };
};

export const verifyStringPattern = (pattern: StringPattern, target: any): MinorVerifyResult => {

    return {
        succeed: true,
    };
};
