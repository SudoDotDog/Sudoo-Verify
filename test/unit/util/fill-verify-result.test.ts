/**
 * @author WMXPY
 * @namespace Verify_Util
 * @description Fill Verify Result
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { createInternalInvalid, createTypeInvalid, fillVerifyResult, VerifyResult } from '../../../src';

describe('Given a [Util-FillVerifyResult] helper functions Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('verify-util-fill-verify-result');

    it('should be able to fill verify result', (): void => {

        const result: VerifyResult = {
            succeed: true,
            invalids: [],
        };

        const filled: VerifyResult = fillVerifyResult(result);

        expect(filled).to.be.deep.equal(result);
    });

    it('should be able to fill verify result - un-succeed', (): void => {

        const result: VerifyResult = {
            succeed: false,
            invalids: [createTypeInvalid('string', 'number', [])],
        };

        const filled: VerifyResult = fillVerifyResult(result);

        expect(filled).to.be.deep.equal(result);
    });

    it('should be able to fill verify result - undefined', (): void => {

        const result: any = undefined;

        const filled: VerifyResult = fillVerifyResult(result);

        expect(filled).to.be.deep.equal({
            succeed: false,
            invalids: [createInternalInvalid('exist', 'undefined', [])],
        });
    });

    it('should be able to fill verify result - null', (): void => {

        const result: any = null;

        const filled: VerifyResult = fillVerifyResult(result);

        expect(filled).to.be.deep.equal({
            succeed: false,
            invalids: [createInternalInvalid('exist', 'null', [])],
        });
    });
});
