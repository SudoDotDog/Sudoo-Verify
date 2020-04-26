/**
 * @author WMXPY
 * @namespace Verify
 * @description Verify
 */

import { Invalid, VerifyOptions } from "./declare";
import { MapPattern, Pattern, StringPattern } from "./pattern";

export const verifyPattern = (
    pattern: Pattern,
    target: any,
    option: VerifyOptions,
    stack: string[],
): Invalid[] => {

    const invalids: Invalid[] = [];

    switch (pattern.type) {

        case 'string': {

            const result: Invalid[] = verifyStringPattern(pattern, target, option, stack);
            invalids.push(...result);
        }
    }

    return invalids;
};

export const verifyStringPattern = (
    pattern: StringPattern,
    target: any,
    option: VerifyOptions,
    stack: string[],
): Invalid[] => {

    const invalids: Invalid[] = [];

    if (typeof target === 'string') {
        return [];
    }

    return [{
        stack,
    }];
};

export const verifyMapPattern = (
    pattern: MapPattern,
    target: any,
    option: VerifyOptions,
    stack: string[],
): Invalid[] => {

    const invalids: Invalid[] = [];

    const keys: string[] = Object.keys(pattern.map);
    for (const key of keys) {

        const childPattern: Pattern = pattern.map[key];
        const childInvalids: Invalid[] = verifyPattern(childPattern, target[key], option, stack);

        invalids.push(...childInvalids);
    }

    return invalids;
};
