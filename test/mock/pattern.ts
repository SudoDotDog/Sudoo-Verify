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
