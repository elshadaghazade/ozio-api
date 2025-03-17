import logger from "@/config/logger";
import { pubClient } from "@/config/redis";
import rateLimit, { Options } from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { Request } from "express";
import { BadRequestException } from "@/exceptions/BadRequestException";

export const getGlobalRateLimit = (params?: Partial<Options>) => {

    if (!pubClient.isOpen) {
        pubClient.connect();
    }

    const keyGenerator = (req: Request) => {

        if (!req.ip) {
            throw new BadRequestException();
        }

        return `${req.ip}${req.path}`;
    }

    const limiter = rateLimit({
        ...params,
        keyGenerator: params?.keyGenerator || keyGenerator,
        store: new RedisStore({
            sendCommand: (...args: string[]) => {
                if (!pubClient.isOpen) {
                    logger.warn("⚠️ Redis Client is closed. Reconnecting...");
                    pubClient.connect();
                }
                return pubClient.sendCommand(args);
            },
        }),
        windowMs: params?.windowMs || 500,
        limit: params?.limit || 1,
        standardHeaders: params?.standardHeaders || 'draft-8',
        legacyHeaders: params?.legacyHeaders || false,
        message: params?.message || 'too many requests',
    });

    return limiter;
}