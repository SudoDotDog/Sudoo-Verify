/**
 * @author WMXPY
 * @namespace Verify
 * @description Verify
 */

import { createRangeInvalid, createSizeInvalid, createTypeInvalid, createValueInvalid, Invalid, StackElement, VerifyFunction, VerifyOption } from "./declare";
import { AnyPattern, BigIntPattern, BooleanPattern, CustomPattern, DatePattern, ExactListPattern, ListPattern, MapPattern, NumberPattern, OrPattern, Pattern, RecordPattern, StringPattern } from "./pattern";
import { attemptParseDate } from "./util";

export const getVerifyFunction = (pattern: Pattern): VerifyFunction => {

    switch (pattern.type) {

        case 'string': return verifyStringPattern;
        case 'number': return verifyNumberPattern;
        case 'bigint': return verifyBigIntPattern;
        case 'boolean': return verifyBooleanPattern;
        case 'date': return verifyDatePattern;
        case 'list': return verifyListPattern;
        case 'exact-list': return verifyExactList;
        case 'map': return verifyMapPattern;
        case 'record': return verifyRecordPattern;
        case 'custom': return verifyCustomPattern;
        case 'or': return verifyOrPattern;
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

    const text: string = target as string;

    if (typeof pattern.maximumLength === 'number' && pattern.maximumLength < text.length) {
        return [createRangeInvalid(pattern.maximumLength, text.length, 'length <', stack)];
    }
    if (typeof pattern.minimumLength === 'number' && pattern.minimumLength > text.length) {
        return [createRangeInvalid(pattern.minimumLength, text.length, 'length >', stack)];
    }

    if (pattern.regexp) {

        const regexpValidateResult: boolean = pattern.regexp.test(text);
        if (!regexpValidateResult) {
            return [createValueInvalid(pattern.regexp, text, stack)];
        }
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

    if (typeOfTarget !== 'number') {
        return [createTypeInvalid('number', typeOfTarget, stack)];
    }

    const numeric: number = target as number;

    if (Boolean(pattern.integer) && !Number.isInteger(numeric)) {
        return [createTypeInvalid('integer', 'float', stack)];
    }

    if (typeof pattern.maximum === 'number' && pattern.maximum < numeric) {
        return [createRangeInvalid(pattern.maximum, numeric, '<', stack)];
    }
    if (typeof pattern.minimum === 'number' && pattern.minimum > numeric) {
        return [createRangeInvalid(pattern.minimum, numeric, '>', stack)];
    }

    return [];
};

export const verifyBigIntPattern: VerifyFunction<BigIntPattern> = (
    pattern: BigIntPattern,
    target: any,
    option: VerifyOption,
    stack: StackElement[],
): Invalid[] => {

    const typeOfTarget = typeof target;

    if (typeOfTarget !== 'bigint') {
        return [createTypeInvalid('bigint', typeOfTarget, stack)];
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

    if (typeOfTarget !== 'boolean') {
        return [createTypeInvalid('boolean', typeOfTarget, stack)];
    }

    return [];
};

export const verifyDatePattern: VerifyFunction<DatePattern> = (
    pattern: DatePattern,
    target: any,
    option: VerifyOption,
    stack: StackElement[],
): Invalid[] => {

    const date: Date | null = attemptParseDate(target, Boolean(pattern.allowString));

    const typeOfTarget = typeof target;
    if (!date) {
        return [createTypeInvalid('date', typeOfTarget, stack)];
    }

    const timeStamp: number = date.getTime();
    if (pattern.before instanceof Date) {
        const beforeTimeStamp: number = pattern.before.getTime();
        if (beforeTimeStamp < timeStamp) {
            return [createRangeInvalid(pattern.before, date, '<', stack)];
        }
    }

    if (pattern.after instanceof Date) {
        const afterTimeStamp: number = pattern.after.getTime();
        if (afterTimeStamp > timeStamp) {
            return [createRangeInvalid(pattern.after, date, '>', stack)];
        }
    }

    return [];
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
        return [createTypeInvalid('map', typeOfTarget, stack)];
    }

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

export const verifyRecordPattern: VerifyFunction<RecordPattern> = (
    pattern: RecordPattern,
    target: any,
    option: VerifyOption,
    stack: StackElement[],
): Invalid[] => {

    const typeOfTarget = typeof target;

    if (typeOfTarget !== 'object') {
        return [createTypeInvalid('record', typeOfTarget, stack)];
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


export const verifyCustomPattern: VerifyFunction<CustomPattern> = (
    pattern: CustomPattern,
    target: any,
    option: VerifyOption,
    stack: StackElement[],
): Invalid[] => {

    const validateResult: boolean = pattern.validate(target);

    if (!validateResult) {
        return [createValueInvalid('match validate function', target, stack)];
    }

    return [];
};

export const verifyOrPattern: VerifyFunction = (
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

export const verifyAnyPattern: VerifyFunction = (
    pattern: AnyPattern,
    target: any,
    option: VerifyOption,
    stack: StackElement[],
): Invalid[] => {

    return [];
};

export const verifyNeverPattern: VerifyFunction = (
    pattern: any,
    target: any,
    option: VerifyOption,
    stack: StackElement[],
): Invalid[] => {

    return [createTypeInvalid('never', typeof target, stack)];
};
