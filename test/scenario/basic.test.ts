/**
 * @author WMXPY
 * @namespace Verify
 * @description Basic
 * @override Scenario
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { createSizeInvalid, createTypeInvalid, createValueInvalid, createVerifyResult, Verifier, VerifyResult } from '../../src';
import { createMockCustomPattern, createMockExactListPattern, createMockListPattern, createMockMapPattern, createMockOptionalMapPattern, createMockStringPattern } from '../mock/pattern';

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

    it('should be able to verify list - sad nested', (): void => {

        const verifier: Verifier = Verifier.create(createMockListPattern());

        const result: VerifyResult = verifier.verify([chance.integer(), chance.integer()]);

        expect(result).to.be.deep.equal(createVerifyResult(false, [
            createTypeInvalid('string', 'number', [0]),
            createTypeInvalid('string', 'number', [1]),
        ]));
    });

    it('should be able to verify list - sad path', (): void => {

        const verifier: Verifier = Verifier.create(createMockListPattern());

        const result: VerifyResult = verifier.verify(chance.string());

        expect(result).to.be.deep.equal(createVerifyResult(false, [createTypeInvalid('list', 'string', [])]));
    });

    it('should be able to verify exact list', (): void => {

        const verifier: Verifier = Verifier.create(createMockExactListPattern());

        const result: VerifyResult = verifier.verify([chance.string(), chance.string()]);

        expect(result).to.be.deep.equal(createVerifyResult(true));
    });

    it('should be able to verify list - sad nested', (): void => {

        const verifier: Verifier = Verifier.create(createMockExactListPattern());

        const result: VerifyResult = verifier.verify([chance.integer(), chance.integer()]);

        expect(result).to.be.deep.equal(createVerifyResult(false, [
            createTypeInvalid('string', 'number', [0]),
            createTypeInvalid('string', 'number', [1]),
        ]));
    });

    it('should be able to verify list - sad nested - overflow', (): void => {

        const verifier: Verifier = Verifier.create(createMockExactListPattern());

        const result: VerifyResult = verifier.verify([chance.string(), chance.string(), chance.string()]);

        expect(result).to.be.deep.equal(createVerifyResult(false, [
            createSizeInvalid(2, 3, []),
        ]));
    });

    it('should be able to verify list - sad nested - shortage', (): void => {

        const verifier: Verifier = Verifier.create(createMockExactListPattern());

        const result: VerifyResult = verifier.verify([chance.string()]);

        expect(result).to.be.deep.equal(createVerifyResult(false, [
            createSizeInvalid(2, 1, []),
        ]));
    });

    it('should be able to verify list - sad path', (): void => {

        const verifier: Verifier = Verifier.create(createMockExactListPattern());

        const result: VerifyResult = verifier.verify(chance.string());

        expect(result).to.be.deep.equal(createVerifyResult(false, [createTypeInvalid('list', 'string', [])]));
    });

    it('should be able to verify map', (): void => {

        const verifier: Verifier = Verifier.create(createMockMapPattern());

        const result: VerifyResult = verifier.verify({
            hello: chance.string(),
            world: chance.string(),
        });

        expect(result).to.be.deep.equal(createVerifyResult(true));
    });

    it('should be able to verify map - optional', (): void => {

        const verifier: Verifier = Verifier.create(createMockOptionalMapPattern());

        const result: VerifyResult = verifier.verify({
            hello: chance.string(),
        });

        expect(result).to.be.deep.equal(createVerifyResult(true));
    });

    it('should be able to verify map - sad nested', (): void => {

        const verifier: Verifier = Verifier.create(createMockMapPattern());

        const result: VerifyResult = verifier.verify({
            hello: chance.integer(),
        });

        expect(result).to.be.deep.equal(createVerifyResult(false, [
            createTypeInvalid('string', 'number', ['hello']),
            createTypeInvalid('string', 'undefined', ['world']),
        ]));
    });

    it('should be able to verify list - sad path', (): void => {

        const verifier: Verifier = Verifier.create(createMockMapPattern());

        const result: VerifyResult = verifier.verify(chance.string());

        expect(result).to.be.deep.equal(createVerifyResult(false, [createTypeInvalid('object', 'string', [])]));
    });

    it('should be able to verify custom', (): void => {

        const verifier: Verifier = Verifier.create(createMockCustomPattern());

        const result: VerifyResult = verifier.verify(chance.string());

        expect(result).to.be.deep.equal(createVerifyResult(true));
    });

    it('should be able to verify custom - sad path', (): void => {

        const integer: number = chance.integer();

        const verifier: Verifier = Verifier.create(createMockCustomPattern());

        const result: VerifyResult = verifier.verify(integer);

        expect(result).to.be.deep.equal(createVerifyResult(false, [createValueInvalid('match validate function', integer, [])]));
    });
});
