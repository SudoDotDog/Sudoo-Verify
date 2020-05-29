/**
 * @author WMXPY
 * @namespace Verify
 * @description Create
 */

import { ListPattern, MapPattern, Pattern } from "./pattern";

export const createMapPattern = (
    record: Record<string, Pattern>,
    options: Omit<MapPattern, 'map'>,
): MapPattern => {

    return {
        map: record,
        ...options,
    };
};

export const createListPattern = (
    element: Pattern,
    options: Omit<ListPattern, 'element'>,
): ListPattern => {

    return {
        element,
        ...options,
    };
};
