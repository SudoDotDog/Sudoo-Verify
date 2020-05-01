/**
 * @author WMXPY
 * @namespace Verify_Verify
 * @description Boolean
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { BooleanPattern, createTypeInvalid, Invalid, verifyBooleanPattern } from '../../../src';
import { createDefaultVerifyOption } from '../../mock/verify';

describe('Given a [Verify-Boolean] Helper Method', (): void => {

    const chance: Chance.Chance = new Chance('verify-verify-boolean');

    it('should be able to verify boolean', (): void => {

        const pattern: BooleanPattern = {
            type: 'boolean',
        };

        const result: Invalid[] = verifyBooleanPattern(pattern, chance.bool(), createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify boolean - sad path', (): void => {

        const pattern: BooleanPattern = {
            type: 'boolean',
        };

        const result: Invalid[] = verifyBooleanPattern(pattern, chance.string(), createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createTypeInvalid('boolean', 'string', [])]);
    });

    it('should be able to verify boolean - ensure true', (): void => {

        const pattern: BooleanPattern = {
            type: 'boolean',
            ensureTrue: true,
        };

        const result: Invalid[] = verifyBooleanPattern(pattern, true, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify boolean - ensure false', (): void => {

        const pattern: BooleanPattern = {
            type: 'boolean',
            ensureFalse: true,
        };

        const result: Invalid[] = verifyBooleanPattern(pattern, false, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });
});
