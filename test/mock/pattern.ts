/**
 * @author WMXPY
 * @namespace Verify
 * @description Pattern
 * @override Mock
 */

import { Pattern } from "../../src";

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
        type: 'exact-list',
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
