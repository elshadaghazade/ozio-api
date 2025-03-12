import { getStoreController, searchStoreController } from '@/controllers/v1/store.controller/search.controller';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/v1/stores/search:
 *   get:
 *     summary: Search for stores
 *     description: Retrieves a list of active stores based on a search keyword, locale, and sorting preferences.
 *     tags: [Stores]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: false
 *         schema:
 *           type: string
 *         description: Search keyword for store name.
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of stores to retrieve. Max is 50.
 *       - in: query
 *         name: offset
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of stores to skip (for pagination).
 *       - in: query
 *         name: orderBy
 *         required: false
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *             enum: [name_asc, name_desc, country_name_asc, country_name_desc, city_name_asc, city_name_desc, rating_asc, rating_desc]
 *         description: |
 *           Sorting criteria for the stores. You can provide multiple sorting options in an array.
 *           - `name_asc`: Sort by name in ascending order
 *           - `name_desc`: Sort by name in descending order
 *           - `country_name_asc`: Sort by country name in ascending order
 *           - `country_name_desc`: Sort by country name in descending order
 *           - `city_name_asc`: Sort by city name in ascending order
 *           - `city_name_desc`: Sort by city name in descending order
 *           - `rating_asc`: Sort by rating in ascending order
 *           - `rating_desc`: Sort by rating in descending order (default)
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
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 150
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     offset:
 *                       type: integer
 *                       example: 0
 *                     stores:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "SuperMart"
 *                           store_code:
 *                             type: string
 *                             example: "SM123"
 *                           phone:
 *                             type: string
 *                             example: "+1234567890"
 *                           email:
 *                             type: string
 *                             example: "contact@supermart.com"
 *                           lat:
 *                             type: number
 *                             example: 40.73061
 *                           lng:
 *                             type: number
 *                             example: -73.935242
 *                           rating:
 *                             type: number
 *                             example: 4.5
 *                           have_not_vegan:
 *                             type: boolean
 *                             example: true
 *                           have_vegan:
 *                             type: boolean
 *                             example: false
 *                           has_packet:
 *                             type: boolean
 *                             example: true
 *                           open_time:
 *                             type: string
 *                             example: "08:00"
 *                           close_time:
 *                             type: string
 *                             example: "22:00"
 *                           store_detail_contents:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 display_name:
 *                                   type: string
 *                                   example: "Organic Foods"
 *                                 type:
 *                                   type: string
 *                                   example: "Grocery"
 *                                 category_more_btn:
 *                                   type: boolean
 *                                   example: true
 *                           currencies:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               code:
 *                                 type: string
 *                                 example: "USD"
 *                           modules:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 1
 *                               name:
 *                                 type: string
 *                                 example: "Retail"
 *                           cities:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 10
 *                               name:
 *                                 type: string
 *                                 example: "New York"
 *                               countries:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: integer
 *                                     example: 1
 *                                   name:
 *                                     type: string
 *                                     example: "United States"
 *                           zones:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 2
 *                                 name:
 *                                   type: string
 *                                   example: "Downtown Zone"
 *                           store_branches:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 5
 *                                 name:
 *                                   type: string
 *                                   example: "SuperMart - Times Square"
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