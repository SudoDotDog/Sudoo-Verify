/**
 * @author WMXPY
 * @namespace Verify_Verify
 * @description List
 * @override Unit
 */

import { ListPattern } from '@sudoo/pattern';
import { expect } from 'chai';
import * as Chance from 'chance';
import { Invalid, verifyListPattern } from '../../../src';
import { createDefaultVerifyOption } from '../../mock/verify';

describe('Given a [Verify-List] Helper Method', (): void => {

    const chance: Chance.Chance = new Chance('verify-verify-list');

    it('should be able to verify list', (): void => {

        const pattern: ListPattern = {
            type: 'list',
            element: {
                type: 'string',
            },
        };

        const result: Invalid[] = verifyListPattern(pattern, [chance.string()], createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });
});
