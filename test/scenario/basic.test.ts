/**
 * @author WMXPY
 * @namespace Verify
 * @description Basic
 * @override Scenario
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { createVerifyResult, Verifier, VerifyResult } from '../../src';
import { createMockStringPattern } from '../mock/pattern';

describe('Given a (Basic) Scenario', (): void => {

    const chance: Chance.Chance = new Chance('scenario-basic');

    it('should be able to verify string', (): void => {

        const verifier: Verifier = Verifier.create(createMockStringPattern());

        const result: VerifyResult = verifier.verify(chance.string());

        expect(result).to.be.deep.equal(createVerifyResult(true));
    });
});
