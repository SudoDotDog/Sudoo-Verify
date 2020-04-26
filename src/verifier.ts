/**
 * @author WMXPY
 * @namespace Verify
 * @description Verifier
 */

import { Pattern } from "./pattern";

export class Verifier {

    public static create(pattern: Pattern): Verifier {

        return new Verifier(pattern);
    }

    private readonly _pattern: Pattern;

    private constructor(pattern: Pattern) {

        this._pattern = pattern;
    }
}
