import express from 'express';
import { getGlobalRateLimit } from '@/middleware/rateLimitHandler';

import bannerRoutes from '@/routes/v1/banner.route';
import authRoutes from '@/routes/v1/auth.route';
import profileRoutes from '@/routes/v1/profile.route';
import categoryRoutes from '@/routes/v1/category.route';
import storeRoutes from '@/routes/v1/store.route';
import locationRoutes from '@/routes/v1/location.route';

const routes = express.Router();

routes.use('/banners', getGlobalRateLimit(), bannerRoutes);
routes.use('/auth', authRoutes);
routes.use('/profile', getGlobalRateLimit(), profileRoutes);
routes.use('/categories', getGlobalRateLimit(), categoryRoutes);
routes.use('/stores', getGlobalRateLimit(), storeRoutes);
routes.use('/location', getGlobalRateLimit(), locationRoutes);

export default routes;