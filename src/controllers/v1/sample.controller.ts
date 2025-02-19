import { Request, Response } from 'express';
import { sampleHomeService } from '../../services/sample.service';

/**
 * @swagger
 * tags:
 *   - name: "v1"
 *     description: "Endpoints for managing products in API v1"
 */

/**
 * @swagger
 * /api/v1/sample:
 *   get:
 *     summary: Sample home route
 *     description: Returns a list of admins.
 *     tags: [v1]
 *     responses:
 *       200:
 *         description: Successfully retrieved admins.
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
export const sampleHomeController = async (_: Request, res: Response) => {

    res.json({
        data: {
            admins: await sampleHomeService()
        }
    });
};