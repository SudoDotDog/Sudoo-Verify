/**
 * @author WMXPY
 * @namespace Verify_Verify
 * @description Map
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Invalid, MapPattern, verifyMapPattern } from '../../../src';

describe('Given a [Verify-Map] Helper Method', (): void => {

    const chance: Chance.Chance = new Chance('verify-verify-map');

    it('should be able to verify map', (): void => {

        const pattern: MapPattern = {
            type: 'map',
            map: {
                hello: {
                    type: 'string',
                },
            },
        };

        const result: Invalid[] = verifyMapPattern(pattern, {
            hello: chance.string(),
        }, {
            hidden: false,
            breaking: false,
        }, []);

        expect(result).to.be.deep.equal([]);
    });
});
