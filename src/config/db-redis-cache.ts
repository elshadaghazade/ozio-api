import { Prisma } from "@prisma/client";
import { createPrismaRedisCache } from "prisma-redis-middleware";
import logger from "./logger";
import { redis } from "./redis";

const dbRedisCacheMiddleware: Prisma.Middleware = createPrismaRedisCache({
    models: [
      { model: "countries", cacheTime: 3600, cacheKey: "countries" },
      { model: "cities", cacheTime: 3600, cacheKey: "cities" },
    ],
    storage: {
      type: "redis",
      options: {
        client: redis,
        invalidation: { referencesTTL: 30 },
        log: process.env.NODE_ENV === 'development' ? logger : undefined,
      },
    },
    cacheTime: 30,
    excludeMethods: ["count", "groupBy"],
    excludeModels: [],
    onHit: (key: any) => {
        logger.info("hit: " + key);
    },
    onMiss: (key: any) => {
        logger.warn("miss: " + key);
    },
    onError: (key: any) => {
        logger.error("error:" + key);
    },
  });

export default dbRedisCacheMiddleware;