import { getStoreController, searchStoreController } from '@/controllers/v1/store.controller/search.controller';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/v1/stores/search:
 *   get:
 *     summary: Search for stores
 *     description: Retrieves a list of active stores based on a search keyword and locale.
 *     tags: [Stores]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: false
 *         schema:
 *           type: string
 *         description: Search keyword for store name.
 *       - in: query
 *         name: locale
 *         required: true
 *         schema:
 *           type: string
 *         description: The locale for store translations (e.g., "en", "fr", "es").
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of stores to retrieve. Max is 50
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of stores to skip (for pagination).
 *     responses:
 *       200:
 *         description: Successfully retrieved store search results
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
 *                       name:
 *                         type: string
 *                         example: "SuperMart"
 *                       status:
 *                         type: string
 *                         example: "active"
 *                       locale:
 *                         type: string
 *                         example: "en"
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
router.get('/search', searchStoreController);

/**
 * @swagger
 * /api/v1/stores/{store_id}:
 *   get:
 *     summary: Get store details
 *     description: Retrieves details of a specific store along with its category translation.
 *     tags: [Stores]
 *     parameters:
 *       - in: path
 *         name: store_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the store to retrieve.
 *       - in: query
 *         name: locale
 *         required: false
 *         schema:
 *           type: string
 *           default: "en"
 *         description: The locale for category translation (e.g., "en", "fr", "es").
 *     responses:
 *       200:
 *         description: Successfully retrieved store details
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
 *                   type: object
 *                   properties:
 *                     store:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "SuperMart"
 *                         status:
 *                           type: string
 *                           example: "active"
 *                         store_category_id:
 *                           type: integer
 *                           example: 5
 *                     categories:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Grocery"
 *                         locale:
 *                           type: string
 *                           example: "en"
 *       400:
 *         description: Invalid input or missing parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Store not found
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
router.get('/:store_id', getStoreController);

export default router;