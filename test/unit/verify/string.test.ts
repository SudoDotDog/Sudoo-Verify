/**
 * @author WMXPY
 * @namespace Verify_Verify
 * @description String
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { createRangeInvalid, createTypeInvalid, createValueInvalid, Invalid, StringPattern, verifyStringPattern } from '../../../src';

describe('Given a [Verify-String] Helper Method', (): void => {

    const chance: Chance.Chance = new Chance('verify-verify-string');

    it('should be able to verify string', (): void => {

        const pattern: StringPattern = {
            type: 'string',
        };

        const result: Invalid[] = verifyStringPattern(pattern, chance.string(), {
            hidden: false,
            breaking: false,
        }, []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify number - sad path - type', (): void => {

        const pattern: StringPattern = {
            type: 'string',
        };

        const result: Invalid[] = verifyStringPattern(pattern, chance.integer(), {
            hidden: false,
            breaking: false,
        }, []);

        expect(result).to.be.deep.equal([createTypeInvalid('string', 'number', [])]);
    });

    it('should be able to verify string - sad path - maximum', (): void => {

        const pattern: StringPattern = {
            type: 'string',
            maximumLength: 4,
        };

        const result: Invalid[] = verifyStringPattern(pattern, '12345', {
            hidden: false,
            breaking: false,
        }, []);

        expect(result).to.be.deep.equal([createRangeInvalid(4, 5, 'length <', [])]);
    });

    it('should be able to verify string - sad path - minimum', (): void => {

        const pattern: StringPattern = {
            type: 'string',
            minimumLength: 6,
        };

        const result: Invalid[] = verifyStringPattern(pattern, '12345', {
            hidden: false,
            breaking: false,
        }, []);

        expect(result).to.be.deep.equal([createRangeInvalid(6, 5, 'length >', [])]);
    });

    it('should be able to verify string - regexp', (): void => {

        const pattern: StringPattern = {
            type: 'string',
            regexp: /^[A-Za-z]+$/,
        };

        const result: Invalid[] = verifyStringPattern(pattern, 'String', {
            hidden: false,
            breaking: false,
        }, []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify string - sad path - regexp', (): void => {

        const target: string = '1String';

        const regexp: RegExp = /^[A-Za-z]+$/;
        const pattern: StringPattern = {
            type: 'string',
            regexp,
        };

        const result: Invalid[] = verifyStringPattern(pattern, target, {
            hidden: false,
            breaking: false,
        }, []);

        expect(result).to.be.deep.equal([createValueInvalid(regexp, target, [])]);
    });
});
