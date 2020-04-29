/**
 * @author WMXPY
 * @namespace Verify_Util
 * @description Stringify Stack
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { StackElement, stringifyStack } from '../../../src';

describe('Given a [Util-StringifyStack] helper functions Class', (): void => {

    const chance: Chance.Chance = new Chance('verify-util-stringify-stack');

    it('should be able to parse root', (): void => {

        const stack: StackElement[] = [];

        const result: string = stringifyStack(stack);

        expect(result).to.be.equal('(ROOT)');
    });

    it('should be able to parse string | number stack', (): void => {

        const stack: StackElement[] = ["hello", 2, "world"];

        const result: string = stringifyStack(stack);

        expect(result).to.be.equal('hello -> 2 -> world');
    });
});
