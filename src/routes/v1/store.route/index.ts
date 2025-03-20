import { getStoreController, searchStoreController } from '@/controllers/v1/store.controller/search.controller';
import { jwtAuthMiddlewareNoException } from '@/middleware/authHandler';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/v1/stores/search:
 *   get:
 *     summary: Search for stores
 *     description: Retrieves a list of active stores based on a search keyword, locale, and sorting preferences.
 *     tags: [Stores & Products]
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
 *           example: "en"
 *         description: Language code like "en", "tr", "ru", etc.
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
 *         name: product_limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 3
 *           maximum: 10
 *           default: 3
 *         description: quantity of related products to retrieve for each store, minimum is 3 & maximum is 10
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
 *                       example: 5
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
 *                             example: 9
 *                           name:
 *                             type: string
 *                             example: "Schuster-Grant"
 *                           store_code:
 *                             type: string
 *                             example: "5485262800103"
 *                           phone:
 *                             type: string
 *                             example: "+1-305-250-1631"
 *                           email:
 *                             type: string
 *                             example: "genevieve07@example.net"
 *                           lat:
 *                             type: string
 *                             example: "58.755154"
 *                           lng:
 *                             type: string
 *                             example: "52.31615"
 *                           rating:
 *                             type: string
 *                             example: "2.15"
 *                           have_not_vegan:
 *                             type: boolean
 *                             example: true
 *                           have_vegan:
 *                             type: boolean
 *                             example: false
 *                           has_packet:
 *                             type: boolean
 *                             example: false
 *                           open_time:
 *                             type: string
 *                             format: date-time
 *                             example: "1970-01-01T04:18:24.000Z"
 *                           preparation_time:
 *                              type: integer
 *                              example: 30
 *                           close_time:
 *                             type: string
 *                             format: date-time
 *                             example: "1970-01-01T06:59:43.000Z"
 *                           store_product_variant_assignments:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: integer
 *                                   example: 2
 *                                 price:
 *                                   type: string
 *                                   example: "879.93"
 *                                 stock:
 *                                   type: string
 *                                   example: "43.81"
 *                                 mrp:
 *                                   type: string
 *                                   example: "831.24"
 *                                 min_order_quantity:
 *                                   type: string
 *                                   example: "4.46"
 *                                 max_order_quantity:
 *                                   type: string
 *                                   nullable: true
 *                                   example: null
 *                                 store_product_variants:
 *                                   type: object
 *                                   properties:
 *                                     id:
 *                                       type: integer
 *                                       example: 6
 *                                     material_code:
 *                                       type: string
 *                                       example: "337444"
 *                                     is_recommended:
 *                                       type: boolean
 *                                       example: false
 *                                     is_organic:
 *                                       type: boolean
 *                                       example: true
 *                                     is_halal:
 *                                       type: boolean
 *                                       example: false
 *                                     is_vegan:
 *                                       type: boolean
 *                                       example: false
 *                                     is_popular_item:
 *                                       type: boolean
 *                                       example: true
 *                                     width:
 *                                       type: integer
 *                                       example: 17
 *                                     height:
 *                                       type: integer
 *                                       example: 68
 *                                     length:
 *                                       type: integer
 *                                       example: 9
 *                                     weight:
 *                                       type: integer
 *                                       example: 73
 *                                     volume:
 *                                       type: integer
 *                                       example: 35
 *                                     store_product_variant_uploads:
 *                                       type: array
 *                                       items:
 *                                         type: object
 *                                         properties:
 *                                           id:
 *                                             type: integer
 *                                             example: 1
 *                                           object_key:
 *                                             type: string
 *                                             example: "uploads/store_variant_1.jpg"
 *                                           size:
 *                                             type: number
 *                                             example: 2048
 *                                           mime_type:
 *                                             type: string
 *                                             example: "image/jpeg"
 *                                           extension:
 *                                             type: string
 *                                             example: "jpg"
 *                                           type:
 *                                             type: string
 *                                             example: "thumbnail"
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
 *     description: Retrieves detailed information about a specific store, including its category, bonus percentages, detailed divisions, holidays, and favorite status for the user.
 *     tags: [Stores & Products]
 *     security:
 *       - {}  # Allows anonymous access
 *       - BearerAuth: []  # Allows authenticated access if token is provided
 *     parameters:
 *       - in: path
 *         name: store_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique identifier of the store.
 *       - in: query
 *         name: locale
 *         required: false
 *         schema:
 *           type: string
 *           default: "en"
 *         description: The locale for store category translations (e.g., "en", "fr", "es").
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
 *                         store_code:
 *                           type: string
 *                           example: "SM123"
 *                         phone:
 *                           type: string
 *                           example: "+123456789"
 *                         email:
 *                           type: string
 *                           example: "info@supermart.com"
 *                         lat:
 *                           type: string
 *                           example: "40.7128"
 *                         lng:
 *                           type: string
 *                           example: "-74.0060"
 *                         rating:
 *                           type: number
 *                           format: float
 *                           example: 4.8
 *                         status:
 *                           type: string
 *                           example: "active"
 *                         open_time:
 *                           type: string
 *                           example: "08:00:00"
 *                         close_time:
 *                           type: string
 *                           example: "22:00:00"
 *                     category:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Grocery"
 *                         locale:
 *                           type: string
 *                           example: "en"
 *                     storeBonusPercentage:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 5
 *                           percentage:
 *                             type: number
 *                             example: 10.5
 *                           start_date:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-03-18T00:00:00Z"
 *                     storeDetailDivisionsAndContent:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 12
 *                           store_detail_divisions:
 *                             type: object
 *                             properties:
 *                               display_name:
 *                                 type: string
 *                                 example: "Featured Items"
 *                               type:
 *                                 type: string
 *                                 example: "promotions"
 *                           store_detail_contents:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 45
 *                               display_name:
 *                                 type: string
 *                                 example: "Best Sellers"
 *                               type:
 *                                 type: string
 *                                 example: "list"
 *                     storeHolidays:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 7
 *                           name:
 *                             type: string
 *                             example: "Christmas Holiday"
 *                           start_date:
 *                             type: string
 *                             format: date
 *                             example: "2025-12-24"
 *                           end_date:
 *                             type: string
 *                             format: date
 *                             example: "2025-12-25"
 *                           close_time:
 *                             type: string
 *                             example: "20:00:00"
 *                           open_time:
 *                             type: string
 *                             example: "10:00:00"
 *                     is_user_favorite_store:
 *                       type: boolean
 *                       example: true
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
router.get('/:store_id', jwtAuthMiddlewareNoException, getStoreController);

export default router;