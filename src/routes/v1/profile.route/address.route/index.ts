import { 
    createAddressController, 
    deleteAddressController, 
    getAddressController, 
    getAddressesController, 
    setAsDefaultAddressController, 
    updateAddressController 
} from '@/controllers/v1/profile/address.controller';
import { jwtAuthMiddleware } from '@/middleware/authHandler';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/v1/profile/address:
 *   get:
 *     summary: Get user addresses
 *     description: Retrieves a list of addresses associated with the authenticated user.
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []  # Requires JWT Authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved user addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   street:
 *                     type: string
 *                     example: "123 Main St"
 *                   city:
 *                     type: string
 *                     example: "New York"
 *                   state:
 *                     type: string
 *                     example: "NY"
 *                   zipCode:
 *                     type: string
 *                     example: "10001"
 *       401:
 *         description: Unauthorized (User is not authenticated)
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
router.get('/', jwtAuthMiddleware, getAddressesController);

/**
 * @swagger
 * /api/v1/profile/address/{addressId}:
 *   get:
 *     summary: Get a specific user address
 *     description: Retrieves details of a specific address associated with the authenticated user.
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []  # Requires JWT Authentication
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the address to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 type:
 *                   type: string
 *                   example: "Home"
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *                 lng:
 *                   type: number
 *                   example: -73.935242
 *                 lat:
 *                   type: number
 *                   example: 40.730610
 *                 person_name:
 *                   type: string
 *                   example: "John Doe"
 *                 floor:
 *                   type: string
 *                   example: "3rd Floor"
 *                 road:
 *                   type: string
 *                   example: "5th Avenue"
 *                 house:
 *                   type: string
 *                   example: "10B"
 *                 is_selected:
 *                   type: boolean
 *                   example: true
 *                 zones:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       name:
 *                         type: string
 *                         example: "Downtown Zone"
 *                       type:
 *                         type: string
 *                         example: "Residential"
 *                       status:
 *                         type: string
 *                         example: "Active"
 *       401:
 *         description: Unauthorized (User is not authenticated)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Address not found
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
router.get('/:addressId', jwtAuthMiddleware, getAddressController);

/**
 * @swagger
 * /api/v1/profile/address:
 *   post:
 *     summary: Create a new address
 *     description: Creates a new address and associates it with the authenticated user.
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []  # Requires JWT Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - phone
 *               - lng
 *               - lat
 *               - person_name
 *             properties:
 *               type:
 *                 type: string
 *                 example: "Home"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               lng:
 *                 type: number
 *                 example: -73.935242
 *               lat:
 *                 type: number
 *                 example: 40.730610
 *               person_name:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       201:
 *         description: Address created successfully
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
 *                   example: "Address created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 10
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized (User is not authenticated)
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
router.post('/', jwtAuthMiddleware, createAddressController);

/**
 * @swagger
 * /api/v1/profile/address/set_as_default:
 *   put:
 *     summary: Set an address as the default
 *     description: Updates the specified address to be the default for the authenticated user.
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []  # Requires JWT Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - addressId
 *             properties:
 *               addressId:
 *                 type: integer
 *                 example: 10
 *                 description: The ID of the address to set as default
 *     responses:
 *       200:
 *         description: Address set as default successfully
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
 *                   example: "Address set as default successfully"
 *       400:
 *         description: Invalid request (missing addressId)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized (User is not authenticated)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Address not found
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
router.put('/set_as_default', jwtAuthMiddleware, setAsDefaultAddressController);

/**
 * @swagger
 * /api/v1/profile/address/{addressId}:
 *   put:
 *     summary: Update an existing address
 *     description: Updates an address associated with the authenticated user.
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []  # Requires JWT Authentication
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the address to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - phone
 *               - lng
 *               - lat
 *               - person_name
 *             properties:
 *               type:
 *                 type: string
 *                 example: "Home"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               lng:
 *                 type: number
 *                 example: -73.935242
 *               lat:
 *                 type: number
 *                 example: 40.730610
 *               person_name:
 *                 type: string
 *                 example: "John Doe"
 *               floor:
 *                 type: string
 *                 example: "3rd Floor"
 *               road:
 *                 type: string
 *                 example: "5th Avenue"
 *               house:
 *                 type: string
 *                 example: "10B"
 *               is_selected:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Address updated successfully
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
 *                   example: "Address updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 10
 *                     type:
 *                       type: string
 *                       example: "Home"
 *                     phone:
 *                       type: string
 *                       example: "+1234567890"
 *                     lng:
 *                       type: number
 *                       example: -73.935242
 *                     lat:
 *                       type: number
 *                       example: 40.730610
 *                     person_name:
 *                       type: string
 *                       example: "John Doe"
 *                     floor:
 *                       type: string
 *                       example: "3rd Floor"
 *                     road:
 *                       type: string
 *                       example: "5th Avenue"
 *                     house:
 *                       type: string
 *                       example: "10B"
 *                     is_selected:
 *                       type: boolean
 *                       example: true
 *                     zones:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 2
 *                           name:
 *                             type: string
 *                             example: "Downtown Zone"
 *                           type:
 *                             type: string
 *                             example: "Residential"
 *                           status:
 *                             type: string
 *                             example: "Active"
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized (User is not authenticated)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Address not found
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

router.put('/:addressId', jwtAuthMiddleware, updateAddressController);

/**
 * @swagger
 * /api/v1/profile/address/{addressId}:
 *   delete:
 *     summary: Delete a user address
 *     description: Deletes an address associated with the authenticated user.
 *     tags: [Profile]
 *     security:
 *       - BearerAuth: []  # Requires JWT Authentication
 *     parameters:
 *       - in: path
 *         name: addressId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the address to delete
 *     responses:
 *       200:
 *         description: Address deleted successfully
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
 *                   example: "Address deleted successfully"
 *       401:
 *         description: Unauthorized (User is not authenticated)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Address not found
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
router.delete('/:addressId', jwtAuthMiddleware, deleteAddressController);

export default router;