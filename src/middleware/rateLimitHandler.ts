import { pubClient } from "@/config/redis";
import rateLimit, { Options } from "express-rate-limit";
import RedisStore from "rate-limit-redis";

export const getGlobalRateLimit = (params: Partial<Options>) => {
    const limiter = rateLimit({
        ...params,
        store: new RedisStore({
            sendCommand: (...args: string[]) => pubClient.sendCommand(args),
        }),
        windowMs: params.windowMs || 1000,
        limit: params.limit || 2,
        standardHeaders: params.standardHeaders || 'draft-8',
        legacyHeaders: params.legacyHeaders || false,
        message: params.message || 'too many requests',
    });

    return limiter;
}