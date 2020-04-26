/**
 * @author WMXPY
 * @namespace Verify
 * @description Verify
 */

import { MinorVerifyResult } from "./declare";
import { StringPattern } from "./pattern";

export const verifyStringPattern = (pattern: StringPattern, target: any): MinorVerifyResult => {

    return {
        succeed: true,
    };
};
