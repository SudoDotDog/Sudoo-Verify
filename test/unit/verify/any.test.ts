/**
 * @author WMXPY
 * @namespace Verify_Verify
 * @description Any
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { AnyPattern, Invalid, verifyAnyPattern } from '../../../src';

describe('Given a [Verify-Any] Helper Method', (): void => {

    const chance: Chance.Chance = new Chance('verify-verify-any');

    it('should be able to verify any', (): void => {

        const pattern: AnyPattern = {
            type: 'any',
        };

        const result: Invalid[] = verifyAnyPattern(pattern, chance.floating(), {
            detailed: false,
            breaking: false,
        }, []);

        expect(result).to.be.deep.equal([]);
    });
});
