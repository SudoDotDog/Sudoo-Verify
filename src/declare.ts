/**
 * @author WMXPY
 * @namespace Verify
 * @description Declare
 */

export type VerifyStructure =
    VerifyObjectStructure
    | VerifyArrayStructure;

export type VerifyArrayStructure = VerifyStructure[];

export type VerifyObjectStructure = {

    readonly [key: string]: VerifyStructure;
};
