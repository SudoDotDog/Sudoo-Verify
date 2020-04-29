/**
 * @author WMXPY
 * @namespace Verify_Util
 * @description Fill Stringed Result
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { createInternalInvalid, createTypeInvalid, fillStringedResult, StringedResult, stringifyInvalid } from '../../../src';

describe('Given a [Util-FillStringedResult] helper functions Class', (): void => {

    const chance: Chance.Chance = new Chance('verify-util-fill-stringed-result');

    it('should be able to fill verify result', (): void => {

        const result: StringedResult = {
            succeed: true,
            invalids: [],
        };

        const filled: StringedResult = fillStringedResult(result);

        expect(filled).to.be.deep.equal(result);
    });

    it('should be able to fill verify result - un-succeed', (): void => {

        const result: StringedResult = {
            succeed: false,
            invalids: [stringifyInvalid(createTypeInvalid('string', 'number', []))],
        };

        const filled: StringedResult = fillStringedResult(result);

        expect(filled).to.be.deep.equal(result);
    });

    it('should be able to fill verify result - undefined', (): void => {

        const result: any = undefined;

        const filled: StringedResult = fillStringedResult(result);

        expect(filled).to.be.deep.equal({
            succeed: false,
            invalids: [stringifyInvalid(createInternalInvalid('exist', 'undefined', []))],
        });
    });

    it('should be able to fill verify result - null', (): void => {

        const result: any = null;

        const filled: StringedResult = fillStringedResult(result);

        expect(filled).to.be.deep.equal({
            succeed: false,
            invalids: [stringifyInvalid(createInternalInvalid('exist', 'null', []))],
        });
    });
});
