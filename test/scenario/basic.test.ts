/**
 * @author WMXPY
 * @namespace Verify
 * @description Basic
 * @override Scenario
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { createTypeInvalid, createVerifyResult, Verifier, VerifyResult } from '../../src';
import { createMockListPattern, createMockStringPattern } from '../mock/pattern';

describe('Given a (Basic) Scenario', (): void => {

    const chance: Chance.Chance = new Chance('scenario-basic');

    it('should be able to verify string', (): void => {

        const verifier: Verifier = Verifier.create(createMockStringPattern());

        const result: VerifyResult = verifier.verify(chance.string());

        expect(result).to.be.deep.equal(createVerifyResult(true));
    });

    it('should be able to verify string - sad path', (): void => {

        const verifier: Verifier = Verifier.create(createMockStringPattern());

        const result: VerifyResult = verifier.verify(chance.integer());

        expect(result).to.be.deep.equal(createVerifyResult(false, [createTypeInvalid('string', 'number', [])]));
    });

    it('should be able to verify list', (): void => {

        const verifier: Verifier = Verifier.create(createMockListPattern());

        const result: VerifyResult = verifier.verify([chance.string()]);

        expect(result).to.be.deep.equal(createVerifyResult(true));
    });

    it('should be able to verify list - sad path', (): void => {

        const verifier: Verifier = Verifier.create(createMockListPattern());

        const result: VerifyResult = verifier.verify([chance.integer()]);

        expect(result).to.be.deep.equal(createVerifyResult(false, [createTypeInvalid('string', 'number', [0])]));
    });

    it('should be able to verify list - sad path - child', (): void => {

        const verifier: Verifier = Verifier.create(createMockListPattern());

        const result: VerifyResult = verifier.verify(chance.string());

        expect(result).to.be.deep.equal(createVerifyResult(false, [createTypeInvalid('list', 'string', [])]));
    });
});
