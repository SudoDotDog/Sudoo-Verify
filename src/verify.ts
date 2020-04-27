/**
 * @author WMXPY
 * @namespace Verify
 * @description Verify
 */

import { Invalid, VerifyFunction, VerifyOption } from "./declare";
import { BooleanPattern, ListPattern, MapPattern, NumberPattern, Pattern, StringPattern } from "./pattern";

export const getVerifyFunction = (pattern: Pattern): VerifyFunction => {

    switch (pattern.type) {

        case 'string': return verifyStringPattern;
        case 'boolean': return verifyBooleanPattern;
        case 'number': return verifyNumberPattern;
        case 'list': return verifyListPattern;
        case 'map': return verifyMapPattern;
    }

    return null as any;
};

export const verifyPattern = (
    pattern: Pattern,
    target: any,
    option: VerifyOption,
    stack: string[],
): Invalid[] => {

    const invalids: Invalid[] = [];

    const verifyFunction: VerifyFunction = getVerifyFunction(pattern);

    const result: Invalid[] = verifyFunction(pattern, target, option, stack);
    invalids.push(...result);

    return invalids;
};

export const verifyStringPattern: VerifyFunction<StringPattern> = (
    pattern: StringPattern,
    target: any,
    option: VerifyOption,
    stack: string[],
): Invalid[] => {

    if (typeof target === 'string') {
        return [];
    }

    return [{
        stack,
    }];
};

export const verifyBooleanPattern: VerifyFunction<BooleanPattern> = (
    pattern: BooleanPattern,
    target: any,
    option: VerifyOption,
    stack: string[],
): Invalid[] => {

    if (typeof target === 'boolean') {
        return [];
    }

    return [{
        stack,
    }];
};

export const verifyNumberPattern: VerifyFunction<NumberPattern> = (
    pattern: NumberPattern,
    target: any,
    option: VerifyOption,
    stack: string[],
): Invalid[] => {

    if (typeof target === 'number') {
        return [];
    }

    return [{
        stack,
    }];
};

export const verifyListPattern: VerifyFunction<ListPattern> = (
    pattern: ListPattern,
    target: any,
    options: VerifyOption,
    stack: string[],
): Invalid[] => {

    if (Array.isArray(target)) {
        return [];
    }

    return [{
        stack,
    }];
};

export const verifyMapPattern: VerifyFunction<MapPattern> = (
    pattern: MapPattern,
    target: any,
    option: VerifyOption,
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
