/**
 * @author WMXPY
 * @namespace Verify
 * @description Declare
 */

export type StringPattern = {

    readonly type: 'string';
};

export type NumberPattern = {

    readonly type: 'number';
};

export type BooleanPattern = {

    readonly type: 'boolean';
};

export type MapPattern = {

    readonly type: 'map';
    readonly map: Record<string, Pattern>;
};

export type ListPattern = {

    readonly type: 'list';
    readonly element: Pattern;
};

export type ExactListPattern = {

    readonly type: 'exact-list';
    readonly list: Pattern[];
};

export type Pattern =
    StringPattern
    | NumberPattern
    | BooleanPattern
    | MapPattern
    | ListPattern
    | ExactListPattern;
