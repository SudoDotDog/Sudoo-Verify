/**
 * @author WMXPY
 * @namespace Verify
 * @description Declare
 */

export type VerifyStructure = {

    readonly type: VerifyObjectStructure
    | VerifyArrayStructure
    | VerifyEndStructure;
};

export type VerifyArrayStructure = VerifyStructure[];

export type VerifyObjectStructure = {

    readonly [key: string]: VerifyStructure;
};

export type VerifyEndStructure =
    'string'
    | 'number'
    | 'boolean';
