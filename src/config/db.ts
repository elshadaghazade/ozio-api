import { PrismaClient } from "@prisma/client";
import dbRedisCacheMiddleware from "./db-redis-cache";

const prisma = new PrismaClient();

prisma.$use(dbRedisCacheMiddleware);

export default prisma;