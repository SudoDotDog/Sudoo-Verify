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
} & CommonPattern;

export type NumberPattern = {

    readonly type: 'number';
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
} & CommonPattern;

export type ExactListPattern = {

    readonly type: 'exact-list';
    readonly list: Pattern[];
} & CommonPattern;

export type Pattern =
    StringPattern
    | NumberPattern
    | BooleanPattern
    | MapPattern
    | ListPattern
    | ExactListPattern;
