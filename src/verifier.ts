/**
 * @author WMXPY
 * @namespace Verify
 * @description Verifier
 */

import { Invalid, MajorVerifyResult, VerifyOptions } from "./declare";
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

        const invalids: Invalid[] = verifyPattern(this._pattern, target, []);

        if (invalids.length === 0) {

            return {
                invalids: [],
                succeed: true,
            };
        }

        return {
            invalids,
            succeed: false,
        };
    }

    private _getOption(): VerifyOptions {

        return {
            detailed: false,
        };
    }
}
