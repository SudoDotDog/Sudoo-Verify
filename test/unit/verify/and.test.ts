/**
 * @author WMXPY
 * @namespace Verify_Verify
 * @description And
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { AndPattern, createTypeInvalid, createValueInvalid, Invalid, verifyAndPattern } from '../../../src';
import { createDefaultVerifyOption } from '../../mock/verify';

describe('Given a [Verify-And] Helper Method', (): void => {

    const chance: Chance.Chance = new Chance('verify-verify-and');

    it('should be able to verify and', (): void => {

        const pattern: AndPattern = {
            type: 'and',
            requirements: [{
                type: 'string',
            }, {
                type: 'custom',
                validate: (value: any) => typeof value === 'string',
            }],
        };

        const result: Invalid[] = verifyAndPattern(pattern, chance.string(), createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify and - sad path', (): void => {

        const pattern: AndPattern = {
            type: 'and',
            requirements: [{
                type: 'string',
            }, {
                type: 'custom',
                validate: (value: any) => typeof value === 'string',
            }],
        };

        const result: Invalid[] = verifyAndPattern(pattern, chance.integer(), createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createTypeInvalid('string', 'number', [])]);
    });


    it('should be able to verify and - partial - sad path', (): void => {

        const value: number = chance.integer();
        const pattern: AndPattern = {
            type: 'and',
            requirements: [{
                type: 'number',
            }, {
                type: 'custom',
                validate: (target: any) => typeof target === 'string',
            }],
        };

        const result: Invalid[] = verifyAndPattern(pattern, value, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createValueInvalid('match validate function', value, [])]);
    });
});
