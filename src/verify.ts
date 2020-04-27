/**
 * @author WMXPY
 * @namespace Verify
 * @description Verify
 */

import { createTypeInvalid, Invalid, StackElement, VerifyFunction, VerifyOption } from "./declare";
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
    stack: StackElement[],
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
    stack: StackElement[],
): Invalid[] => {

    const typeOfTarget = typeof target;
    if (typeOfTarget !== 'string') {
        return [createTypeInvalid('string', typeOfTarget, stack)];
    }

    return [];
};

export const verifyBooleanPattern: VerifyFunction<BooleanPattern> = (
    pattern: BooleanPattern,
    target: any,
    option: VerifyOption,
    stack: StackElement[],
): Invalid[] => {

    const typeOfTarget = typeof target;
    if (typeof target !== 'boolean') {
        return [createTypeInvalid('boolean', typeOfTarget, stack)];
    }

    return [];
};

export const verifyNumberPattern: VerifyFunction<NumberPattern> = (
    pattern: NumberPattern,
    target: any,
    option: VerifyOption,
    stack: StackElement[],
): Invalid[] => {

    const typeOfTarget = typeof target;
    if (typeof target !== 'number') {
        return [createTypeInvalid('number', typeOfTarget, stack)];
    }

    return [];
};

export const verifyListPattern: VerifyFunction<ListPattern> = (
    pattern: ListPattern,
    target: any,
    option: VerifyOption,
    stack: StackElement[],
): Invalid[] => {

    if (Array.isArray(target)) {
        return [createTypeInvalid('array', typeof target, stack)];
    }

    const invalids: Invalid[] = [];

    const list: any[] = target;
    for (let i = 0; i < list.length; i++) {

        const newStack: StackElement[] = [...stack, i];

        const element: any = list[i];
        const elementInvalids: Invalid[] = verifyPattern(pattern.element, element, option, newStack);

        invalids.push(...elementInvalids);
    }

    return invalids;
};

export const verifyMapPattern: VerifyFunction<MapPattern> = (
    pattern: MapPattern,
    target: any,
    option: VerifyOption,
    stack: StackElement[],
): Invalid[] => {

    const invalids: Invalid[] = [];

    const keys: StackElement[] = Object.keys(pattern.map);
    for (const key of keys) {

        const newStack: StackElement[] = [...stack, key];

        const childPattern: Pattern = pattern.map[key];
        const childInvalids: Invalid[] = verifyPattern(childPattern, target[key], option, newStack);

        invalids.push(...childInvalids);
    }

    return invalids;
};
