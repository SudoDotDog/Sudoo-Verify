/**
 * @author WMXPY
 * @namespace Verify
 * @description Complex
 * @override Scenario
 */

import { Pattern } from '@sudoo/pattern';
import { expect } from 'chai';
import * as Chance from 'chance';
import { Verifier, VerifyResult } from '../../src';

describe('Given a (Complex) Scenario', (): void => {

    const chance: Chance.Chance = new Chance('scenario-complex');

    it('should be able to verify complex scenario', (): void => {

        const pattern: Pattern = {
            type: 'map',
            map: {
                first: {
                    type: 'number',
                },
                second: {
                    type: 'list',
                    element: {
                        type: 'string',
                    },
                },
            },
        };

        const verifier: Verifier = Verifier.create(pattern);
        const result: VerifyResult = verifier.verify({
            first: chance.string(),
            second: [chance.natural()],
        });

        const expectResult: VerifyResult = {
            succeed: false,
            invalids: [
                {
                    expect: 'number',
                    actual: 'string',
                    slice: 'type',
                    stack: ['first'],
                },
                {
                    expect: 'string',
                    actual: 'number',
                    slice: 'type',
                    stack: ['second', 0],
                },
            ],
        };

        expect(result).to.be.deep.equal(expectResult);
    });
});
