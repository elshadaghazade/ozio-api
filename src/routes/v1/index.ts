import express from 'express';
import { getGlobalRateLimit } from '@/middleware/rateLimitHandler';

import bannerRoutes from '@/routes/v1/banner.route';
import authRoutes from '@/routes/v1/auth.route';
import profileRoutes from '@/routes/v1/profile.route';
import categoryRoutes from '@/routes/v1/category.route';
import storeRoutes from '@/routes/v1/store.route';
import locationRoutes from '@/routes/v1/location.route';
import { routeCacheMiddleware } from '@/middleware/routeCacheHandler';

const routes = express.Router();

const routeCacheMiddlewareInstance = routeCacheMiddleware({ prefix: 'routecachemiddleware', ttl: 30, methods: 'GET' });
const globalRateLimitInstance = getGlobalRateLimit();

routes.use('/banners', globalRateLimitInstance, routeCacheMiddlewareInstance, bannerRoutes);
routes.use('/auth', authRoutes);
routes.use('/profile', globalRateLimitInstance, routeCacheMiddlewareInstance, profileRoutes);
routes.use('/categories', globalRateLimitInstance, routeCacheMiddlewareInstance, categoryRoutes);
routes.use('/stores', globalRateLimitInstance, routeCacheMiddlewareInstance, storeRoutes);
routes.use('/location', globalRateLimitInstance, routeCacheMiddlewareInstance, locationRoutes);


export default routes;