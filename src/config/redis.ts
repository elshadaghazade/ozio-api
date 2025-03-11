import { createClient } from "redis";
import config from '@/config';
import logger from "./logger";

export const pubClient = createClient({
    socket: { 
        host: config.redis.host,
        port: config.redis.port 
    }
});

export const subClient = pubClient.duplicate();

pubClient.on("error", (err) => {
    logger.error("Redis Client Error: " + err);
});