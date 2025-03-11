import { meController } from '@/controllers/v1/profile/me.controller';
import { jwtAuthMiddleware } from '@/middleware/authHandler';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/v1/profile/me:
 *   get:
 *     summary: Get authenticated user details
 *     description: Retrieves the profile information of the authenticated user.
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []  # Requires JWT Authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 user_address:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       floor:
 *                         type: string
 *                         example: "3rd Floor"
 *                       house:
 *                         type: string
 *                         example: "10B"
 *                       is_selected:
 *                         type: boolean
 *                         example: true
 *                       lat:
 *                         type: number
 *                         example: 40.730610
 *                       lng:
 *                         type: number
 *                         example: -73.935242
 *                       person_name:
 *                         type: string
 *                         example: "John Doe"
 *                       phone:
 *                         type: string
 *                         example: "+1234567890"
 *                       road:
 *                         type: string
 *                         example: "5th Avenue"
 *                       type:
 *                         type: string
 *                         example: "Home"
 *                       zones:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "Downtown Zone"
 *                 assigned_coupons:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       assignable_id:
 *                         type: integer
 *                         example: 10
 *                       assignable_type:
 *                         type: string
 *                         example: "Discount"
 *                       used_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-10T22:46:58.826Z"
 *                       is_for_all:
 *                         type: boolean
 *                         example: true
 *                       used_coupons:
 *                         type: integer
 *                         example: 2
 *                       coupons:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: "SAVE10"
 *                 cities:
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
 *                       countries:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "United States"
 *       401:
 *         description: Unauthorized (User is not authenticated)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
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

router.get('/', jwtAuthMiddleware, meController);

export default router;