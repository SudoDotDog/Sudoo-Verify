/**
 * @author WMXPY
 * @namespace Verify
 * @description Verifier
 */

import { createVerifyResult, Invalid, VerifyOption, VerifyResult } from "./declare";
import { Pattern } from "./pattern";
import { verifyPattern } from "./verify";

export class Verifier {

    public static create(pattern: Pattern): Verifier {

        return new Verifier(pattern);
    }

    private readonly _pattern: Pattern;

    private _detailed: boolean = false;
    private _breaking: boolean = false;

    private constructor(pattern: Pattern) {

        this._pattern = pattern;
    }

    public detailed(): this {

        this._detailed = true;
        return this;
    }

    public breaking(): this {

        this._breaking = true;
        return this;
    }

    public verify(target: any): VerifyResult {

        const invalids: Invalid[] = verifyPattern(this._pattern, target, this._getOption(), []);

        if (invalids.length === 0) {

            return createVerifyResult(true);
        }

        return createVerifyResult(false, invalids);
    }

    private _getOption(): VerifyOption {

        return {
            detailed: this._detailed,
            breaking: this._breaking,
        };
    }
}
