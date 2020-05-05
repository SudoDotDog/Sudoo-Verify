/**
 * @author WMXPY
 * @namespace Verify_Verify
 * @description Empty
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { createTypeInvalid, EmptyPattern, Invalid, verifyEmptyPattern } from '../../../src';
import { createDefaultVerifyOption } from '../../mock/verify';

describe('Given a [Verify-Empty] Helper Method', (): void => {

    const chance: Chance.Chance = new Chance('verify-verify-empty');

    it('should be able to verify empty - undefined', (): void => {

        const pattern: EmptyPattern = {
            type: 'empty',
            allowUndefined: true,
        };

        const result: Invalid[] = verifyEmptyPattern(pattern, undefined, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify empty - undefined - null sad path', (): void => {

        const pattern: EmptyPattern = {
            type: 'empty',
            allowUndefined: true,
        };

        const result: Invalid[] = verifyEmptyPattern(pattern, null, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createTypeInvalid('empty', 'null', [])]);
    });

    it('should be able to verify empty - null', (): void => {

        const pattern: EmptyPattern = {
            type: 'empty',
            allowNull: true,
        };

        const result: Invalid[] = verifyEmptyPattern(pattern, null, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify empty - null - undefined sad path', (): void => {

        const pattern: EmptyPattern = {
            type: 'empty',
            allowNull: true,
        };

        const result: Invalid[] = verifyEmptyPattern(pattern, undefined, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createTypeInvalid('empty', 'undefined', [])]);
    });

    it('should be able to verify empty - sad path', (): void => {

        const pattern: EmptyPattern = {
            type: 'empty',
            allowNull: true,
            allowUndefined: true,
        };

        const result: Invalid[] = verifyEmptyPattern(pattern, chance.string(), createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createTypeInvalid('empty', 'string', [])]);
    });

    it('should be able to verify empty - undefined - sad path', (): void => {

        const pattern: EmptyPattern = {
            type: 'empty',
        };

        const result: Invalid[] = verifyEmptyPattern(pattern, undefined, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createTypeInvalid('empty', 'undefined', [])]);
    });

    it('should be able to verify empty - null - sad path', (): void => {

        const pattern: EmptyPattern = {
            type: 'empty',
        };

        const result: Invalid[] = verifyEmptyPattern(pattern, null, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createTypeInvalid('empty', 'null', [])]);
    });
});
