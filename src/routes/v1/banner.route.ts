import { getBannersController } from '@/controllers/v1/banners.controller';
import express from 'express';

const router = express.Router();

router.get('/', getBannersController);

export default router;