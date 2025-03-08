import express from 'express';
import sampleRoutes from '@/routes/v1/sample.route';
import bannerRoutes from '@/routes/v1/banner.route';

const routes = express.Router();

routes.use('/sample', sampleRoutes);

routes.use('/banners', bannerRoutes);

export default routes;