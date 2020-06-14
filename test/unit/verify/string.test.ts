/**
 * @author WMXPY
 * @namespace Verify_Verify
 * @description String
 * @override Unit
 */

import { StringPattern } from '@sudoo/pattern';
import { expect } from 'chai';
import * as Chance from 'chance';
import { createRangeInvalid, createTypeInvalid, createValueInvalid, Invalid, verifyStringPattern } from '../../../src';
import { createDefaultVerifyOption } from '../../mock/verify';

describe('Given a [Verify-String] Helper Method', (): void => {

    const chance: Chance.Chance = new Chance('verify-verify-string');

    it('should be able to verify string', (): void => {

        const pattern: StringPattern = {
            type: 'string',
        };

        const result: Invalid[] = verifyStringPattern(pattern, chance.string(), createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify number - sad path - type', (): void => {

        const pattern: StringPattern = {
            type: 'string',
        };

        const result: Invalid[] = verifyStringPattern(pattern, chance.integer(), createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createTypeInvalid('string', 'number', [])]);
    });

    it('should be able to verify string - sad path - maximum', (): void => {

        const pattern: StringPattern = {
            type: 'string',
            maximumLength: 4,
        };

        const result: Invalid[] = verifyStringPattern(pattern, '12345', createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createRangeInvalid(4, 5, 'length <', [])]);
    });

    it('should be able to verify string - sad path - minimum', (): void => {

        const pattern: StringPattern = {
            type: 'string',
            minimumLength: 6,
        };

        const result: Invalid[] = verifyStringPattern(pattern, '12345', createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createRangeInvalid(6, 5, 'length >', [])]);
    });

    it('should be able to verify string - regexp', (): void => {

        const pattern: StringPattern = {
            type: 'string',
            regexp: /^[A-Za-z]+$/,
        };

        const result: Invalid[] = verifyStringPattern(pattern, 'String', createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify string - sad path - regexp', (): void => {

        const target: string = '1String';

        const regexp: RegExp = /^[A-Za-z]+$/;
        const pattern: StringPattern = {
            type: 'string',
            regexp,
        };

        const result: Invalid[] = verifyStringPattern(pattern, target, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createValueInvalid(regexp, target, [])]);
    });

    it('should be able to verify string - enum', (): void => {

        const pattern: StringPattern = {
            type: 'string',
            enum: ['first', 'second'],
        };

        const result: Invalid[] = verifyStringPattern(pattern, 'second', createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify string - enum - sad path', (): void => {

        const pattern: StringPattern = {
            type: 'string',
            enum: ['first', 'second'],
        };

        const result: Invalid[] = verifyStringPattern(pattern, 'third', createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createValueInvalid('in-enum', 'third', [])]);
    });
});
