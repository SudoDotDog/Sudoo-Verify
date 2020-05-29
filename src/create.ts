/**
 * @author WMXPY
 * @namespace Verify
 * @description Create
 */

import { ListPattern, MapPattern, Pattern } from "./pattern";

export const createMapPattern = (
    record: Record<string, Pattern>,
    options: Omit<MapPattern, 'type' | 'map'>,
): MapPattern => {

    return {
        type: 'map',
        map: record,
        ...options,
    };
};

export const createListPattern = (
    element: Pattern,
    options: Omit<ListPattern, 'type' | 'element'>,
): ListPattern => {

    return {
        type: 'list',
        element,
        ...options,
    };
};
