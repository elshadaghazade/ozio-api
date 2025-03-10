import { getBannersController } from '@/controllers/v1/banners.controller';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/v1/banners:
 *   get:
 *     summary: Bannerlər
 *     description: Bannerləri verilən parametrlərə görə qaytarır
 *     tags: [Banners]
 *     responses:
 *       200:
 *         description: Successfully retrieved banner.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     admins:
 *                       type: array
 *                       items:
 *                         type: string
 */
router.get('/', getBannersController);

export default router;