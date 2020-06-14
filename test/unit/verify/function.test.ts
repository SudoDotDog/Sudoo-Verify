/**
 * @author WMXPY
 * @namespace Verify_Verify
 * @description Function
 * @override Unit
 */

import { FunctionPattern } from '@sudoo/pattern';
import { expect } from 'chai';
import * as Chance from 'chance';
import { createTypeInvalid, Invalid, verifyFunctionPattern } from '../../../src';
import { createDefaultVerifyOption } from '../../mock/verify';

describe('Given a [Verify-Function] Helper Method', (): void => {

    const chance: Chance.Chance = new Chance('verify-verify-function');

    it('should be able to verify function', (): void => {

        const pattern: FunctionPattern = {
            type: 'function',
        };

        const result: Invalid[] = verifyFunctionPattern(pattern, () => void 0, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify function - sad path', (): void => {

        const pattern: FunctionPattern = {
            type: 'function',
        };

        const result: Invalid[] = verifyFunctionPattern(pattern, chance.string(), createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createTypeInvalid('function', 'string', [])]);
    });
});
