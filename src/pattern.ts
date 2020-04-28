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
} & CommonPattern;

export type NumberPattern = {

    readonly type: 'number';
    readonly integer?: boolean;
    readonly minimum?: number;
    readonly maximum?: number;
} & CommonPattern;

export type BooleanPattern = {

    readonly type: 'boolean';
} & CommonPattern;

export type MapPattern = {

    readonly type: 'map';
    readonly map: Record<string, Pattern>;
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
    | BooleanPattern
    | MapPattern
    | ListPattern
    | ExactListPattern
    | CustomPattern
    | OrPattern
    | AnyPattern;
