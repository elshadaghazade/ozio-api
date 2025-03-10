export const generateBonusCardCode = (user_id: number | bigint) => {
    const now = new Date();
    return `${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${user_id}`;
}

import crypto from "crypto";

/**
 * Generates a unique random fixed-length integer.
 * @param length Number of digits (max 18 for JavaScript's safe integer)
 * @returns A random integer of the specified length
 */
export function generateRandomFixedLengthInteger(length: number): number {
    if (length < 1 || length > 18) {
        throw new Error("Length must be between 1 and 18 to stay within Number.MAX_SAFE_INTEGER.");
    }

    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;

    const randomBytes = crypto.randomBytes(6);
    const randomNumber = parseInt(randomBytes.toString("hex"), 16);
    return min + (randomNumber % (max - min + 1));
}
