import express from 'express';
import bannerRoutes from '@/routes/v1/banner.route';
import authRoutes from '@/routes/v1/auth.route';
import profileRoutes from '@/routes/v1/profile.route';
import categoryRoutes from '@/routes/v1/category.route';
import storeRoutes from '@/routes/v1/store.route';
import { getGlobalRateLimit } from '@/middleware/rateLimitHandler';

const routes = express.Router();

routes.use('/banners', getGlobalRateLimit(), bannerRoutes);
routes.use('/auth', authRoutes);
routes.use('/profile', getGlobalRateLimit(), profileRoutes);
routes.use('/categories', getGlobalRateLimit(), categoryRoutes);
routes.use('/stores', getGlobalRateLimit(), storeRoutes);

export default routes;