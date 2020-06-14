/**
 * @author WMXPY
 * @namespace Verify_Verify
 * @description Map
 * @override Unit
 */

import { MapPattern } from '@sudoo/pattern';
import { expect } from 'chai';
import * as Chance from 'chance';
import { createRangeInvalid, createTypeInvalid, Invalid, verifyMapPattern } from '../../../src';
import { createDefaultVerifyOption } from '../../mock/verify';

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
        }, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify map - loose', (): void => {

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
            world: chance.string(),
        }, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify map - sad path', (): void => {

        const pattern: MapPattern = {
            type: 'map',
            map: {
                hello: {
                    type: 'string',
                },
            },
        };

        const result: Invalid[] = verifyMapPattern(pattern, {
            world: chance.string(),
        }, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createTypeInvalid('string', 'undefined', ['hello'])]);
    });

    it('should be able to verify map - strict', (): void => {

        const pattern: MapPattern = {
            type: 'map',
            map: {
                hello: {
                    type: 'string',
                },
            },
            strict: true,
        };

        const result: Invalid[] = verifyMapPattern(pattern, {
            hello: chance.string(),
        }, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([]);
    });

    it('should be able to verify map - strict - sad path', (): void => {

        const pattern: MapPattern = {
            type: 'map',
            map: {
                hello: {
                    type: 'string',
                },
            },
            strict: true,
        };

        const result: Invalid[] = verifyMapPattern(pattern, {
            hello: chance.string(),
            world: chance.string(),
        }, createDefaultVerifyOption(), []);

        expect(result).to.be.deep.equal([createRangeInvalid('hello', 'world', 'not included', [])]);
    });
});
