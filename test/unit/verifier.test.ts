/**
 * @author WMXPY
 * @namespace Verify
 * @description Verifier
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Verifier } from '../../src';

describe('Given a {Verifier} Class', (): void => {

    const chance: Chance.Chance = new Chance('verify-verifier');

    it('should be able to create', (): void => {

        const verifier: Verifier = Verifier.create();

        expect(verifier).to.be.instanceOf(Verifier);
    });
});
