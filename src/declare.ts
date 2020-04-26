/**
 * @author WMXPY
 * @namespace Verify
 * @description Declare
 */

export type Pattern = {

    readonly type: 'string';
} | {

    readonly type: 'number';
} | {

    readonly type: 'boolean';
} | {

    readonly type: 'map';
    readonly map: Record<string, Pattern>;
} | {

    readonly type: 'list';
    readonly element: Pattern;
} | {

    readonly type: 'exact-list';
    readonly list: Pattern[];
};
