/**
 * @author WMXPY
 * @namespace Verify
 * @description Verify
 * @override Mock
 */

import { VerifyOption } from "../../src";

export const createDefaultVerifyOption = (): VerifyOption => {

    return {

        hidden: false,
        breaking: false,
    };
};
