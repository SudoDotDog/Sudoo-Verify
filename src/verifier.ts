/**
 * @author WMXPY
 * @namespace Verify
 * @description Verifier
 */

import { createVerifyResult, Invalid, VerifyOption, VerifyResult } from "./declare";
import { Pattern } from "./pattern";
import { hideInvalidDetail } from "./util";
import { verifyPattern } from "./verify";

export class Verifier {

    public static create(pattern: Pattern): Verifier {

        return new Verifier(pattern);
    }

    private readonly _pattern: Pattern;

    private _hidden: boolean = false;
    private _breaking: boolean = false;

    private constructor(pattern: Pattern) {

        this._pattern = pattern;
    }

    public hidden(): this {

        this._hidden = true;
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

        if (this._hidden) {

            const newInvalids: Invalid[] = invalids.map((each: Invalid) => hideInvalidDetail(each));
            return createVerifyResult(false, newInvalids);
        }
        return createVerifyResult(false, invalids);
    }

    private _getOption(): VerifyOption {

        return {
            hidden: this._hidden,
            breaking: this._breaking,
        };
    }
}
