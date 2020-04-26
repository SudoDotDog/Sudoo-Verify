/**
 * @author WMXPY
 * @namespace Verify
 * @description Verify
 */

import { Invalid, MinorVerifyResult } from "./declare";
import { MapPattern, Pattern, StringPattern } from "./pattern";

export const verifyPattern = (pattern: Pattern, target: any): Invalid[] => {

    const invalids: Invalid[] = [];

    switch (pattern.type) {

        case 'string': {

            const result: MinorVerifyResult = verifyStringPattern(pattern, target);
        }
    }

    return invalids;
};

export const verifyStringPattern = (pattern: StringPattern, target: any): MinorVerifyResult => {

    return {
        succeed: true,
    };
};

export const verifyMapPattern = (pattern: MapPattern, target: any): Invalid[] => {

    const keys: string[] = Object.keys(pattern.map);
    for (const key of keys) {


    }

    return [];
};
