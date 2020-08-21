/**
 * @author WMXPY
 * @namespace Verify
 * @description Pattern
 * @override Mock
 */

import { Pattern } from "@sudoo/pattern";

export const createMockStringPattern = (): Pattern => {

    return {
        type: 'string',
    };
};

export const createMockListPattern = (): Pattern => {

    return {
        type: 'list',
        element: {
            type: 'string',
        },
    };
};

export const createMockExactListPattern = (): Pattern => {

    return {
        type: 'tuple',
        list: [{
            type: 'string',
        }, {
            type: 'string',
        }],
    };
};

export const createMockMapPattern = (): Pattern => {

    return {
        type: 'map',
        map: {
            hello: {
                type: 'string',
            },
            world: {
                type: 'string',
            },
        },
    };
};

export const createMockOptionalMapPattern = (): Pattern => {

    return {
        type: 'map',
        map: {
            hello: {
                type: 'string',
            },
            world: {
                type: 'string',
                optional: true,
            },
        },
    };
};

export const createMockCustomPattern = (): Pattern => {

    return {
        type: 'custom',
        validate: (value: any) => typeof value === 'string',
    };
};
