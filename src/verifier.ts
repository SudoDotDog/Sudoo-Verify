/**
 * @author WMXPY
 * @namespace Verify
 * @description Verifier
 */

import { MajorVerifyResult } from "./declare";
import { Pattern } from "./pattern";
import { verifyPattern } from "./verify";

export class Verifier {

    public static create(pattern: Pattern): Verifier {

        return new Verifier(pattern);
    }

    private readonly _pattern: Pattern;

    private constructor(pattern: Pattern) {

        this._pattern = pattern;
    }

    public verify(target: any): MajorVerifyResult {

        return verifyPattern(this._pattern, target);
    }
}
