/**
 * @author WMXPY
 * @namespace Verify
 * @description Util
 */

export const attemptParseDate = (value: any, allowString: boolean): Date | null => {

    if (value instanceof Date) {

        const timeStamp: number = value.getTime();
        if (isNaN(timeStamp)) {
            return null;
        }
        return value;
    }

    if (allowString) {
        const timeStamp: number = Date.parse(value);
        if (isNaN(timeStamp)) {
            return null;
        }

        return new Date(timeStamp);
    }

    return null;
};
