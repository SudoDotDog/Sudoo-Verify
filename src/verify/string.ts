/**
 * @author WMXPY
 * @namespace Verify_Verify
 * @description String
 */

import { MinorVerifyResult } from "../declare";
import { StringPattern } from "../pattern";

export const verifyStringPattern = (pattern: StringPattern, target: any): MinorVerifyResult => {

    return {
        succeed: true,
    };
};
