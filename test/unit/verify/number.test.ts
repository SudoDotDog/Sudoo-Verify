/**
 * @author WMXPY
 * @namespace Verify_Verify
 * @description Number
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { createRangeInvalid, createTypeInvalid, Invalid, NumberPattern, verifyNumberPattern } from '../../../src';

describe('Given a [Verify-Number] Helper Method', (): void => {

    const chance: Chance.Chance = new Chance('verify-verify-number');

    it('should be able to verify number', (): void => {

        const pattern: NumberPattern = {
            type: 'number',
        };

        const result: Invalid[] = verifyNumberPattern(pattern, chance.floating(), {
            detailed: false,
            breaking: false,
        }, []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify number - sad path - type', (): void => {

        const pattern: NumberPattern = {
            type: 'number',
        };

        const result: Invalid[] = verifyNumberPattern(pattern, chance.string(), {
            detailed: false,
            breaking: false,
        }, []);

        expect(result).to.be.deep.equal([createTypeInvalid('number', 'string', [])]);
    });

    it('should be able to verify number - sad path - maximum', (): void => {

        const pattern: NumberPattern = {
            type: 'number',
            maximum: 4,
        };

        const result: Invalid[] = verifyNumberPattern(pattern, 5, {
            detailed: false,
            breaking: false,
        }, []);

        expect(result).to.be.deep.equal([createRangeInvalid(4, 5, '<', [])]);
    });

    it('should be able to verify number - sad path - minimum', (): void => {

        const pattern: NumberPattern = {
            type: 'number',
            minimum: 6,
        };

        const result: Invalid[] = verifyNumberPattern(pattern, 5, {
            detailed: false,
            breaking: false,
        }, []);

        expect(result).to.be.deep.equal([createRangeInvalid(6, 5, '>', [])]);
    });

    it('should be able to verify number - sad path - integer', (): void => {

        const pattern: NumberPattern = {
            type: 'number',
            integer: true,
        };

        const result: Invalid[] = verifyNumberPattern(pattern, chance.floating(), {
            detailed: false,
            breaking: false,
        }, []);

        expect(result).to.be.deep.equal([createTypeInvalid('integer', 'float', [])]);
    });
});