/**
 * @author WMXPY
 * @namespace Verify
 * @description Declare
 */

export type VerifyStructure = {

    readonly type: 'string';
} | {

    readonly type: 'number';
} | {

    readonly type: 'boolean';
} | {

    readonly type: 'map';
    readonly map: VerifyMapStructure;
} | {

    readonly type: 'list';
    readonly element: VerifyStructure;
} | {

    readonly type: 'exact-list';
    readonly list: VerifyStructure[];
};

export type VerifyMapStructure = {

    readonly [key: string]: VerifyStructure;
};
