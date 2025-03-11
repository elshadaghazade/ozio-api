import { createClient } from "redis";
import config from '@/config';

export const pubClient = createClient({ url: `redis://${config.redis.host}:${config.redis.port}` });
export const subClient = pubClient.duplicate();