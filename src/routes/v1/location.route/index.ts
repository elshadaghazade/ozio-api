import { getCitiesController, getCountriesController, getZonesController } from '@/controllers/v1/location.controller';
import express from 'express';

const routes = express.Router();

/**
 * @swagger
 * /api/v1/location/countries:
 *   get:
 *     summary: Get all countries
 *     description: Retrieves a list of all available countries.
 *     tags: [Location]
 *     responses:
 *       200:
 *         description: Successfully retrieved countries
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
 *                         example: "United States"
 *                       code:
 *                         type: string
 *                         example: "US"
 *                       phone_code:
 *                         type: string
 *                         example: "+1"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
routes.get('/countries', getCountriesController);


/**
 * @swagger
 * /api/v1/location/cities:
 *   get:
 *     summary: Get cities by country
 *     description: Retrieves a list of cities belonging to a specified country.
 *     tags: [Location]
 *     parameters:
 *       - in: query
 *         name: country_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the country whose cities should be retrieved.
 *     responses:
 *       200:
 *         description: Successfully retrieved cities
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
 *                         example: "New York"
 *       400:
 *         description: Invalid or missing country_id parameter
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
routes.get('/cities', getCitiesController);

/**
 * @swagger
 * /api/v1/location/zones:
 *   get:
 *     summary: Get zones by city
 *     description: Retrieves a list of active zones for a specified city.
 *     tags: [Location]
 *     parameters:
 *       - in: query
 *         name: city_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the city whose zones should be retrieved.
 *     responses:
 *       200:
 *         description: Successfully retrieved zones
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
 *                         example: "Jamie Stehr"
 *                       type:
 *                         type: string
 *                         enum: ["price", "service"]
 *                         example: "price"
 *                       cities:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 33
 *                           name:
 *                             type: string
 *                             example: "Hacıqabul"
 *                           countries:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 17
 *                               name:
 *                                 type: string
 *                                 example: "Azerbaijan"
 *       400:
 *         description: Invalid or missing city_id parameter
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

routes.get('/zones', getZonesController);


export default routes;