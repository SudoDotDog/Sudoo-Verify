/**
 * @author WMXPY
 * @namespace Verify
 * @description Pattern
 */

export type CommonPattern = {

    readonly optional?: boolean;
};

export type StringPattern = {

    readonly type: 'string';
    readonly regexp?: RegExp;
    readonly minimumLength?: number;
    readonly maximumLength?: number;
    readonly enum?: string[];
} & CommonPattern;

export type NumberPattern = {

    readonly type: 'number';
    readonly integer?: boolean;
    readonly minimum?: number;
    readonly maximum?: number;
    readonly enum?: number[];
} & CommonPattern;

export type BigIntPattern = {

    readonly type: 'bigint';
    readonly enum?: Array<bigint>;
} & CommonPattern;

export type BooleanPattern = {

    readonly type: 'boolean';
} & CommonPattern;

export type DatePattern = {

    readonly type: 'date';
    readonly allowString?: boolean;
    readonly before?: Date;
    readonly after?: Date;
} & CommonPattern;

export type MapPattern = {

    readonly type: 'map';
    readonly map: Record<string, Pattern>;
} & CommonPattern;

export type RecordPattern = {

    readonly type: 'record';
    readonly key: Pattern;
    readonly value: Pattern;
} & CommonPattern;

export type ListPattern = {

    readonly type: 'list';
    readonly element: Pattern;
    readonly minimumSize?: number;
    readonly maximumSize?: number;
} & CommonPattern;

export type ExactListPattern = {

    readonly type: 'exact-list';
    readonly list: Pattern[];
} & CommonPattern;

export type CustomPattern = {

    readonly type: 'custom';
    readonly validate: (value: any) => boolean;
} & CommonPattern;

export type OrPattern = {

    readonly type: 'or';
    readonly options: Pattern[];
} & CommonPattern;

export type AnyPattern = {

    readonly type: 'any';
} & CommonPattern;

export type Pattern =
    StringPattern
    | NumberPattern
    | BigIntPattern
    | BooleanPattern
    | DatePattern
    | MapPattern
    | RecordPattern
    | ListPattern
    | ExactListPattern
    | CustomPattern
    | OrPattern
    | AnyPattern;
