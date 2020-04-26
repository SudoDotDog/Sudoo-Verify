/**
 * @author WMXPY
 * @namespace Verify
 * @description Verify
 */

import { Invalid } from "./declare";
import { MapPattern, Pattern, StringPattern } from "./pattern";

export const verifyPattern = (pattern: Pattern, target: any): Invalid[] => {

    const invalids: Invalid[] = [];

    switch (pattern.type) {

        case 'string': {

            const result: Invalid[] = verifyStringPattern(pattern, target);
        }
    }

    return invalids;
};

export const verifyStringPattern = (pattern: StringPattern, target: any): Invalid[] => {

    return [];
};

export const verifyMapPattern = (pattern: MapPattern, target: any): Invalid[] => {

    const keys: string[] = Object.keys(pattern.map);
    for (const key of keys) {

        const childPattern: Pattern = pattern.map[key];
        const invalids: Invalid[] = verifyPattern(childPattern, target[key]);
    }

    return [];
};
