/**
 * @author WMXPY
 * @namespace Verify_Verify
 * @description Number
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { createRangeInvalid, createTypeInvalid, createValueInvalid, Invalid, NumberPattern, verifyNumberPattern } from '../../../src';
import { createDefaultVerifyOption } from '../../mock/verify';

describe('Given a [Verify-Number] Helper Method', (): void => {

    const chance: Chance.Chance = new Chance('verify-verify-number');

    it('should be able to verify number', (): void => {

        const pattern: NumberPattern = {
            type: 'number',
        };

        const result: Invalid[] = verifyNumberPattern(pattern, chance.floating(), createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify number - sad path - type', (): void => {

        const pattern: NumberPattern = {
            type: 'number',
        };

        const result: Invalid[] = verifyNumberPattern(pattern, chance.string(), createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createTypeInvalid('number', 'string', [])]);
    });

    it('should be able to verify number - sad path - NaN', (): void => {

        const pattern: NumberPattern = {
            type: 'number',
        };

        const result: Invalid[] = verifyNumberPattern(pattern, NaN, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createValueInvalid('not NaN', NaN, [])]);
    });

    it('should be able to verify number - allow NaN', (): void => {

        const pattern: NumberPattern = {
            type: 'number',
            allowNaN: true,
        };

        const result: Invalid[] = verifyNumberPattern(pattern, NaN, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify number - sad path - maximum', (): void => {

        const pattern: NumberPattern = {
            type: 'number',
            maximum: 4,
        };

        const result: Invalid[] = verifyNumberPattern(pattern, 5, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createRangeInvalid(4, 5, '<', [])]);
    });

    it('should be able to verify number - sad path - minimum', (): void => {

        const pattern: NumberPattern = {
            type: 'number',
            minimum: 6,
        };

        const result: Invalid[] = verifyNumberPattern(pattern, 5, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createRangeInvalid(6, 5, '>', [])]);
    });

    it('should be able to verify number - sad path - integer', (): void => {

        const pattern: NumberPattern = {
            type: 'number',
            integer: true,
        };

        const result: Invalid[] = verifyNumberPattern(pattern, chance.floating(), createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createTypeInvalid('integer', 'float', [])]);
    });

    it('should be able to verify number - enum', (): void => {

        const pattern: NumberPattern = {
            type: 'number',
            enum: [0, 1],
        };

        const result: Invalid[] = verifyNumberPattern(pattern, 0, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify number - enum - sad path', (): void => {

        const pattern: NumberPattern = {
            type: 'number',
            enum: [0, 1],
        };

        const result: Invalid[] = verifyNumberPattern(pattern, 2, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createValueInvalid('in-enum', 2, [])]);
    });
});
