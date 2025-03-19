import { getCategoriesController } from '@/controllers/v1/category.controller';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get active parent categories
 *     description: Retrieves a list of active parent categories with translations based on the provided locale, the distinct count of related store products, and an image key.
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: locale
 *         required: true
 *         schema:
 *           type: string
 *         description: The locale for category translations (e.g., "en", "fr", "es").
 *     responses:
 *       200:
 *         description: Successfully retrieved categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "OK"
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       status:
 *                         type: string
 *                         example: "active"
 *                       module_id:
 *                         type: integer
 *                         example: 1
 *                       module_name:
 *                         type: string
 *                         example: "market"
 *                       category_name:
 *                         type: string
 *                         example: "Electronics"
 *                       locale:
 *                         type: string
 *                         example: "en"
 *                       store_products_count:
 *                         type: integer
 *                         example: 2
 *                         description: The distinct count of store products related to the category.
 *                       image_key:
 *                         type: string
 *                         example: "uploads/2025/03/18/9bb9f2d4-9f81-4b5c-8427-9c73720197a3.png"
 *                         description: The URL or path to the category image.
 *       400:
 *         description: Missing or invalid locale parameter
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.get('/', getCategoriesController);

export default router;