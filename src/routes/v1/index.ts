import express from 'express';
import bannerRoutes from '@/routes/v1/banner.route';
import authRoutes from '@/routes/v1/auth.route';
import profileRoutes from '@/routes/v1/profile.route';

const routes = express.Router();

routes.use('/banners', bannerRoutes);
routes.use('/auth', authRoutes);
routes.use('/profile', profileRoutes);

export default routes;