/**
 * @author WMXPY
 * @namespace Verify
 * @description Verify
 */

import { verifyAnyPattern, verifyBigIntPattern, verifyBooleanPattern, verifyCustomPattern, verifyDatePattern, verifyEmptyPattern, verifyExactPattern, verifyFunctionPattern, verifyNeverPattern, verifyNumberPattern, verifyStringPattern } from "./base";
import { createRangeInvalid, createSizeInvalid, createTypeInvalid, Invalid, StackElement, VerifyFunction, VerifyOption } from "./declare";
import { AndPattern, ExactListPattern, ListPattern, MapPattern, OrPattern, Pattern, RecordPattern } from "./pattern";

export const getVerifyFunction = (pattern: Pattern): VerifyFunction => {

    switch (pattern.type) {

        case 'string': return verifyStringPattern;
        case 'number': return verifyNumberPattern;
        case 'bigint': return verifyBigIntPattern;
        case 'boolean': return verifyBooleanPattern;
        case 'date': return verifyDatePattern;
        case 'function': return verifyFunctionPattern;
        case 'list': return verifyListPattern;
        case 'exact-list': return verifyExactList;
        case 'map': return verifyMapPattern;
        case 'record': return verifyRecordPattern;
        case 'custom': return verifyCustomPattern;
        case 'or': return verifyOrPattern;
        case 'and': return verifyAndPattern;
        case 'exact': return verifyExactPattern;
        case 'empty': return verifyEmptyPattern;
        case 'any': return verifyAnyPattern;
    }

    return verifyNeverPattern;
};

export const verifyPattern = (
    pattern: Pattern,
    target: any,
    option: VerifyOption,
    stack: StackElement[],
): Invalid[] => {

    const invalids: Invalid[] = [];

    const typeOfTarget = typeof target;
    if (typeOfTarget === 'undefined' && Boolean(pattern.optional)) {
        return [];
    }

    const verifyFunction: VerifyFunction = getVerifyFunction(pattern);

    const result: Invalid[] = verifyFunction(pattern, target, option, stack);
    invalids.push(...result);

    return invalids;
};

export const verifyListPattern: VerifyFunction<ListPattern> = (
    pattern: ListPattern,
    target: any,
    option: VerifyOption,
    stack: StackElement[],
): Invalid[] => {

    if (!Array.isArray(target)) {
        return [createTypeInvalid('list', typeof target, stack)];
    }

    const list: any[] = target;
    if (typeof pattern.maximumSize === 'number' && pattern.maximumSize < target.length) {
        return [createRangeInvalid(pattern.maximumSize, target.length, '<', stack)];
    }
    if (typeof pattern.minimumSize === 'number' && pattern.minimumSize > target.length) {
        return [createRangeInvalid(pattern.minimumSize, target.length, '>', stack)];
    }

    const invalids: Invalid[] = [];
    for (let i = 0; i < list.length; i++) {

        const newStack: StackElement[] = [...stack, i];

        const element: any = list[i];
        const elementInvalids: Invalid[] = verifyPattern(pattern.element, element, option, newStack);

        invalids.push(...elementInvalids);
    }

    return invalids;
};

export const verifyExactList: VerifyFunction<ExactListPattern> = (
    pattern: ExactListPattern,
    target: any,
    option: VerifyOption,
    stack: StackElement[],
): Invalid[] => {

    const typeOfTarget = typeof target;

    if (!Array.isArray(target)) {
        return [createTypeInvalid('list', typeOfTarget, stack)];
    }

    const invalids: Invalid[] = [];

    const list: any[] = target;

    if (list.length !== pattern.list.length) {
        return [createSizeInvalid(pattern.list.length, list.length, stack)];
    }

    for (let i = 0; i < pattern.list.length; i++) {

        const newStack: StackElement[] = [...stack, i];
        const currentPattern: Pattern = pattern.list[i];

        const element: any = list[i];
        const elementInvalids: Invalid[] = verifyPattern(currentPattern, element, option, newStack);

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

    const typeOfTarget = typeof target;

    if (typeOfTarget !== 'object') {
        return [createTypeInvalid('object', typeOfTarget, stack)];
    }

    const invalids: Invalid[] = [];

    const keys: StackElement[] = Object.keys(pattern.map);

    if (pattern.strict) {

        const actualKeys: StackElement[] = Object.keys(target);
        for (const actualKey of actualKeys) {
            if (!keys.includes(actualKey)) {
                invalids.push(createRangeInvalid(keys.join(','), actualKey, 'not included', stack));
            }
        }
    }

    for (const key of keys) {

        const newStack: StackElement[] = [...stack, key];

        const childPattern: Pattern = pattern.map[key];
        const childInvalids: Invalid[] = verifyPattern(childPattern, target[key], option, newStack);

        invalids.push(...childInvalids);
    }

    return invalids;
};

export const verifyRecordPattern: VerifyFunction<RecordPattern> = (
    pattern: RecordPattern,
    target: any,
    option: VerifyOption,
    stack: StackElement[],
): Invalid[] => {

    const typeOfTarget = typeof target;

    if (typeOfTarget !== 'object') {
        return [createTypeInvalid('object', typeOfTarget, stack)];
    }

    const invalids: Invalid[] = [];

    const keys: StackElement[] = Object.keys(target);
    for (const key of keys) {

        const newStack: StackElement[] = [...stack, `${key}(key)`];
        const childInvalids: Invalid[] = verifyPattern(pattern.key, target[key], option, newStack);

        invalids.push(...childInvalids);
    }

    const values: StackElement[] = Object.values(target);
    for (const value of values) {

        const newStack: StackElement[] = [...stack, `${value}(value)`];
        const childInvalids: Invalid[] = verifyPattern(pattern.value, target[value], option, newStack);

        invalids.push(...childInvalids);
    }

    return invalids;
};

export const verifyOrPattern: VerifyFunction<OrPattern> = (
    pattern: OrPattern,
    target: any,
    option: VerifyOption,
    stack: StackElement[],
): Invalid[] => {

    const invalids: Invalid[] = [];

    for (const each of pattern.options) {

        const result: Invalid[] = verifyPattern(each, target, option, stack);
        if (result.length === 0) {
            return [];
        }
        invalids.push(...result);
    }

    return invalids;
};

export const verifyAndPattern: VerifyFunction<AndPattern> = (
    pattern: AndPattern,
    target: any,
    option: VerifyOption,
    stack: StackElement[],
): Invalid[] => {

    for (const requirement of pattern.requirements) {

        const result: Invalid[] = verifyPattern(requirement, target, option, stack);
        if (result.length !== 0) {
            return result;
        }
    }

    return [];
};
