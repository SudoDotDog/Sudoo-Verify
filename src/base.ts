/**
 * @author WMXPY
 * @namespace Verify
 * @description Base
 */

import { createRangeInvalid, createTypeInvalid, createValueInvalid, Invalid, StackElement, VerifyFunction, VerifyOption } from "./declare";
import { AnyPattern, BigIntPattern, BooleanPattern, CustomPattern, DatePattern, ExactPattern, NumberPattern, StringPattern } from "./pattern";
import { attemptParseDate } from "./util";

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

    if (Array.isArray(pattern.enum)) {
        const included: boolean = pattern.enum.includes(text);
        if (!included) {
            return [createValueInvalid(`in-enum`, text, stack)];
        }
    }

    if (pattern.regexp) {
        const regexpValidateResult: boolean = pattern.regexp.test(text);
        if (!regexpValidateResult) {
            return [createValueInvalid(pattern.regexp, text, stack)];
        }
    }

    if (typeof pattern.maximumLength === 'number' && pattern.maximumLength < text.length) {
        return [createRangeInvalid(pattern.maximumLength, text.length, 'length <', stack)];
    }
    if (typeof pattern.minimumLength === 'number' && pattern.minimumLength > text.length) {
        return [createRangeInvalid(pattern.minimumLength, text.length, 'length >', stack)];
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

    if (!Boolean(pattern.allowNaN)) {
        if (Number.isNaN(numeric)) {
            return [createValueInvalid('not NaN', numeric, stack)];
        }
    }

    if (!Boolean(pattern.allowInfinity)) {
        if (!Number.isFinite(numeric) && !Number.isNaN(numeric)) {
            return [createValueInvalid('finite', numeric, stack)];
        }
    }

    if (Boolean(pattern.integer) && !Number.isInteger(numeric)) {
        return [createTypeInvalid('integer', 'float', stack)];
    }

    if (Boolean(pattern.float) && Number.isInteger(numeric)) {
        return [createTypeInvalid('float', 'integer', stack)];
    }

    if (Array.isArray(pattern.enum)) {
        const included: boolean = pattern.enum.includes(numeric);
        if (!included) {
            return [createValueInvalid(`in-enum`, numeric, stack)];
        }
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

    const numeric: bigint = target as bigint;

    if (Array.isArray(pattern.enum)) {
        const included: boolean = pattern.enum.includes(numeric);
        if (!included) {
            return [createValueInvalid(`in-enum`, numeric.toString(), stack)];
        }
    }

    if (typeof pattern.maximum === 'bigint' && pattern.maximum < numeric) {
        return [createRangeInvalid(pattern.maximum.toString(), numeric.toString(), '<', stack)];
    }
    if (typeof pattern.minimum === 'bigint' && pattern.minimum > numeric) {
        return [createRangeInvalid(pattern.minimum.toString(), numeric.toString(), '>', stack)];
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

    if (typeof pattern.ensureTrue === 'boolean' && pattern.ensureTrue) {
        if (!Boolean(target)) {
            return [createValueInvalid('true', target, stack)];
        }
    }

    if (typeof pattern.ensureFalse === 'boolean' && pattern.ensureFalse) {
        if (Boolean(target)) {
            return [createValueInvalid('false', target, stack)];
        }
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

export const verifyExactPattern: VerifyFunction = (
    pattern: ExactPattern,
    target: any,
    option: VerifyOption,
    stack: StackElement[],
): Invalid[] => {

    if (target !== pattern.value) {
        return [createValueInvalid(pattern.value, target, stack)];
    }

    return [];
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
