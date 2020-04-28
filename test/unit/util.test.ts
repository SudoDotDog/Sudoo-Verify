/**
 * @author WMXPY
 * @namespace Verify
 * @description Util
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { createInternalInvalid, createTypeInvalid, fillVerifyResult, VerifyResult } from '../../src';

describe('Given a [Util] helper functions Class', (): void => {

    const chance: Chance.Chance = new Chance('verify-util');

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
