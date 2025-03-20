import logger from '@/config/logger';
import { redis } from '@/config/redis';
import { Request, Response, NextFunction } from 'express';


type methods = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface RouteCacheMiddlewareParamsType {
    prefix: string;
    methods?: methods | methods[];
    ttl?: number;
}

export const routeCacheMiddleware =
    (params: RouteCacheMiddlewareParamsType) =>
        async (req: Request, res: Response, next: NextFunction) => {
            const {
                prefix,
                methods = 'GET',
                ttl = 10
            } = params;

            const cacheKey = `${prefix}:${methods instanceof Array ? methods.join(',') : methods}:${req.originalUrl}`;

            try {
                if (!methods.length || (methods instanceof Array && !methods.includes(req.method as methods)) || req.method !== methods) {
                    next();
                    return;
                }

                const cachedResponse = await redis.get(cacheKey);
                if (cachedResponse) {
                    logger.info(`Serving from cache: ${cacheKey}`);
                    res.json(JSON.parse(cachedResponse));
                    return;
                }

                const originalJson = res.json.bind(res);
                res.json = (body: any) => {
                    if (res.statusCode === 200) {
                        redis.set(cacheKey, JSON.stringify(body), "EX", ttl);
                        logger.info(`Cached response: ${cacheKey}`);
                    }
                    return originalJson(body);
                };

                next();
            } catch (err: any) {
                logger.error("Redis caching error:" + err);
                next();
            }
        }