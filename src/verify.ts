/**
 * @author WMXPY
 * @namespace Verify
 * @description Verify
 */

import { Invalid, VerifyOption } from "./declare";
import { BooleanPattern, ListPattern, MapPattern, NumberPattern, Pattern, StringPattern } from "./pattern";

export const verifyPattern = (pattern: Pattern, target: any, option: VerifyOption, stack: string[]): Invalid[] => {

    const invalids: Invalid[] = [];

    switch (pattern.type) {

        case 'string': {

            const result: Invalid[] = verifyStringPattern(pattern, target, option, stack);
            invalids.push(...result);
            break;
        }
        case 'boolean': {

            const result: Invalid[] = verifyBooleanPattern(pattern, target, option, stack);
            invalids.push(...result);
            break;
        }
        case 'number': {

            const result: Invalid[] = verifyNumberPattern(pattern, target, option, stack);
            invalids.push(...result);
            break;
        }
        case 'list': {

            const result: Invalid[] = verifyListPattern(pattern, target, option, stack);
            invalids.push(...result);
            break;
        }
        case 'map': {

            const result: Invalid[] = verifyMapPattern(pattern, target, option, stack);
            invalids.push(...result);
            break;
        }
    }

    return invalids;
};

export const verifyStringPattern = (pattern: StringPattern, target: any, option: VerifyOption, stack: string[]): Invalid[] => {

    if (typeof target === 'string') {
        return [];
    }

    return [{
        stack,
    }];
};

export const verifyBooleanPattern = (pattern: BooleanPattern, target: any, option: VerifyOption, stack: string[]): Invalid[] => {

    if (typeof target === 'boolean') {
        return [];
    }

    return [{
        stack,
    }];
};

export const verifyNumberPattern = (pattern: NumberPattern, target: any, option: VerifyOption, stack: string[]): Invalid[] => {

    if (typeof target === 'number') {
        return [];
    }

    return [{
        stack,
    }];
};

export const verifyListPattern = (pattern: ListPattern, target: any, options: VerifyOption, stack: string[]): Invalid[] => {

    if (Array.isArray(target)) {
        return [];
    }

    return [{
        stack,
    }];
};

export const verifyMapPattern = (pattern: MapPattern, target: any, option: VerifyOption, stack: string[]): Invalid[] => {

    const invalids: Invalid[] = [];

    const keys: string[] = Object.keys(pattern.map);
    for (const key of keys) {

        const childPattern: Pattern = pattern.map[key];
        const childInvalids: Invalid[] = verifyPattern(childPattern, target[key], option, stack);

        invalids.push(...childInvalids);
    }

    return invalids;
};
