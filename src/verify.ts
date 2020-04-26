/**
 * @author WMXPY
 * @namespace Verify
 * @description Verify
 */

import { Invalid, MajorVerifyResult, MinorVerifyResult } from "./declare";
import { Pattern, StringPattern } from "./pattern";

export const verifyPattern = (pattern: Pattern, target: any): MajorVerifyResult => {

    const invalids: Invalid[] = [];

    switch (pattern.type) {

        case 'string': {

            const result: MinorVerifyResult = verifyStringPattern(pattern, target);
        }
    }

    return {
        invalids,
        succeed: true,
    };
};

export const verifyStringPattern = (pattern: StringPattern, target: any): MinorVerifyResult => {

    return {
        succeed: true,
    };
};
