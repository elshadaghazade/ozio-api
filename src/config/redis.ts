import { createClient } from "redis";
import Redis from 'prisma-redis-middleware/node_modules/ioredis';
import config from '@/config';
import logger from "./logger";

export const pubClient = createClient({
    socket: { 
        host: config.redis.host,
        port: config.redis.port 
    }
});

export const subClient = pubClient.duplicate();

export const redis = new Redis({
    host: config.redis.host,
    port: config.redis.port,
});

pubClient.on("error", (err) => {
    logger.error("Redis Client Error: " + err);
});