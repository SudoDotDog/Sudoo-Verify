/**
 * @author WMXPY
 * @namespace Verify_Verify
 * @description Any
 * @override Unit
 */

import { AnyPattern } from '@sudoo/pattern';
import { expect } from 'chai';
import * as Chance from 'chance';
import { createTypeInvalid, Invalid, verifyAnyPattern } from '../../../src';
import { createDefaultVerifyOption } from '../../mock/verify';

describe('Given a [Verify-Any] Helper Method', (): void => {

    const chance: Chance.Chance = new Chance('verify-verify-any');

    it('should be able to verify any', (): void => {

        const pattern: AnyPattern = {
            type: 'any',
        };

        const result: Invalid[] = verifyAnyPattern(pattern, chance.floating(), createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to allow undefined or null', (): void => {

        const pattern: AnyPattern = {
            type: 'any',
        };

        const undefinedResult: Invalid[] = verifyAnyPattern(pattern, undefined, createDefaultVerifyOption(), []);
        const nullResult: Invalid[] = verifyAnyPattern(pattern, null, createDefaultVerifyOption(), []);

        expect(undefinedResult).to.be.deep.equal([]);
        expect(nullResult).to.be.deep.equal([]);
    });

    it('should be able to fail undefined when banished', (): void => {

        const pattern: AnyPattern = {
            type: 'any',
            banishUndefined: true,
        };

        const undefinedResult: Invalid[] = verifyAnyPattern(pattern, undefined, createDefaultVerifyOption(), []);
        const nullResult: Invalid[] = verifyAnyPattern(pattern, null, createDefaultVerifyOption(), []);

        expect(undefinedResult).to.be.deep.equal([createTypeInvalid('any', 'undefined', [])]);
        expect(nullResult).to.be.deep.equal([]);
    });

    it('should be able to fail null when banished', (): void => {

        const pattern: AnyPattern = {
            type: 'any',
            banishNull: true,
        };

        const undefinedResult: Invalid[] = verifyAnyPattern(pattern, undefined, createDefaultVerifyOption(), []);
        const nullResult: Invalid[] = verifyAnyPattern(pattern, null, createDefaultVerifyOption(), []);

        expect(undefinedResult).to.be.deep.equal([]);
        expect(nullResult).to.be.deep.equal([createTypeInvalid('any', 'null', [])]);
    });
});
