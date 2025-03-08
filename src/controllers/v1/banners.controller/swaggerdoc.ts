/**
 * @swagger
 * tags:
 *   - name: "v1"
 *     description: "Endpoints for managing products in API v1"
 */

/**
 * @swagger
 * /api/v1/banners:
 *   get:
 *     summary: Bannerlər
 *     description: Bannerləri verilən parametrlərə görə qaytarır
 *     tags: [v1]
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