/**
 * @author WMXPY
 * @namespace Verify_Verify
 * @description Exact
 * @override Unit
 */

import { ExactPattern } from '@sudoo/pattern';
import { expect } from 'chai';
import * as Chance from 'chance';
import { createValueInvalid, Invalid, verifyExactPattern } from '../../../src';
import { createDefaultVerifyOption } from '../../mock/verify';

describe('Given a [Verify-Exact] Helper Method', (): void => {

    const chance: Chance.Chance = new Chance('verify-verify-exact');

    it('should be able to verify exact', (): void => {

        const value: string = chance.string();
        const pattern: ExactPattern = {
            type: 'exact',
            value,
        };

        const result: Invalid[] = verifyExactPattern(pattern, value, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify exact - sad path', (): void => {

        const value: string = chance.string();
        const actualValue: string = chance.string();
        const pattern: ExactPattern = {
            type: 'exact',
            value,
        };

        const result: Invalid[] = verifyExactPattern(pattern, actualValue, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createValueInvalid(value, actualValue, [])]);
    });
});
