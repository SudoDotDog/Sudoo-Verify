/**
 * @author WMXPY
 * @namespace Verify
 * @description Verifier
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Verifier } from '../../src';
import { createMockStringPattern } from '../mock/pattern';

describe('Given a {Verifier} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('verify-verifier');

    it('should be able to create', (): void => {

        const verifier: Verifier = Verifier.create(createMockStringPattern());

        expect(verifier).to.be.instanceOf(Verifier);
    });
});
