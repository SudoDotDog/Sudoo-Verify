/**
 * @author WMXPY
 * @namespace Verify
 * @description Declare
 */

export type VerifyStructure =
    VerifyObjectStructure
    | VerifyArrayStructure
    | VerifyEndStructure;

export type VerifyArrayStructure = VerifyStructure[];

export type VerifyObjectStructure = {

    readonly [key: string]: VerifyStructure;
};

export type VerifyEndStructure =
    'string'
    | 'number'
    | 'boolean';
