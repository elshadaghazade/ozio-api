export const generateBonusCardCode = () => {
    const uniqueNumber = Number((BigInt("0x" + randomBytes(6).toString("hex")) % BigInt(9e10)).toString()) + 1e10;
    return uniqueNumber;
}

import config from "@/config";
import crypto, { randomBytes } from "crypto";

/**
 * Generates a unique random fixed-length integer.
 * @param length Number of digits (max 18 for JavaScript's safe integer)
 * @returns A random integer of the specified length
 */
export function generateRandomFixedLengthInteger(length: number): number {
    
    if (config.env === 'development') {
        return 123456;
    }

    if (length < 1 || length > 18) {
        throw new Error("Length must be between 1 and 18 to stay within Number.MAX_SAFE_INTEGER.");
    }

    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;

    const randomBytes = crypto.randomBytes(6);
    const randomNumber = parseInt(randomBytes.toString("hex"), 16);
    return min + (randomNumber % (max - min + 1));
}
