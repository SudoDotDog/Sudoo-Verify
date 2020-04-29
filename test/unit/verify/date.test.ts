/**
 * @author WMXPY
 * @namespace Verify_Verify
 * @description Date
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { createRangeInvalid, createTypeInvalid, DatePattern, Invalid, verifyDatePattern } from '../../../src';
import { createDefaultVerifyOption } from '../../mock/verify';

describe('Given a [Verify-Date] Helper Method', (): void => {

    const chance: Chance.Chance = new Chance('verify-verify-date');

    it('should be able to verify date', (): void => {

        const pattern: DatePattern = {
            type: 'date',
        };

        const result: Invalid[] = verifyDatePattern(pattern, chance.date(), createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify date - allow string', (): void => {

        const pattern: DatePattern = {
            type: 'date',
            allowString: true,
        };

        const result: Invalid[] = verifyDatePattern(pattern, chance.date().toISOString(), createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify date - allow string - undefined / false', (): void => {

        const pattern: DatePattern = {
            type: 'date',
            allowString: false,
        };

        const result: Invalid[] = verifyDatePattern(pattern, chance.date().toISOString(), createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createTypeInvalid('date', 'string', [])]);
    });

    it('should be able to verify date - sad path', (): void => {

        const pattern: DatePattern = {
            type: 'date',
        };

        const result: Invalid[] = verifyDatePattern(pattern, chance.string(), createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createTypeInvalid('date', 'string', [])]);
    });

    it('should be able to verify date - range', (): void => {

        const before: Date = new Date();
        const after: Date = new Date();

        before.setDate(before.getDate() + 1);
        after.setDate(after.getDate() - 1);

        const pattern: DatePattern = {
            type: 'date',
            before,
            after,
        };

        const result: Invalid[] = verifyDatePattern(pattern, new Date(), createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify date - range - sad path before', (): void => {

        const before: Date = new Date();

        before.setDate(before.getDate() + 1);

        const pattern: DatePattern = {
            type: 'date',
            before,
        };

        const current: Date = new Date();

        current.setDate(current.getDate() + 2);

        const result: Invalid[] = verifyDatePattern(pattern, current, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createRangeInvalid(before, current, '<', [])]);
    });

    it('should be able to verify date - range - sad path after', (): void => {

        const after: Date = new Date();

        after.setDate(after.getDate() - 1);

        const pattern: DatePattern = {
            type: 'date',
            after,
        };

        const current: Date = new Date();

        current.setDate(current.getDate() - 2);

        const result: Invalid[] = verifyDatePattern(pattern, current, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createRangeInvalid(after, current, '>', [])]);
    });
});
