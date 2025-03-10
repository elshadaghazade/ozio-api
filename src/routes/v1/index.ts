import express from 'express';
import bannerRoutes from '@/routes/v1/banner.route';
import authRoutes from '@/routes/v1/auth.route';

const routes = express.Router();

routes.use('/banners', bannerRoutes);
routes.use('/auth', authRoutes);

export default routes;