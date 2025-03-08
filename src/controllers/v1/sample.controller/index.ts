import { sampleHomeService } from "@/services/sample.service";
import { ApiResponse } from "@/utils/apiResponse";
import { Request, Response } from 'express';

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
    const result = await sampleHomeService();
 
    const payload = ApiResponse.success('OK', result);

    res.json(payload);
}