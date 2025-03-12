import { getCitiesController, getCountriesController } from '@/controllers/v1/location.controller';
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


export default routes;