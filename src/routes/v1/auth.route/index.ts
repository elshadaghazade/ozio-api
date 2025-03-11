import { loginController, otpController } from '@/controllers/v1/auth/login.controller';
import { refreshTokenController } from '@/controllers/v1/auth/refresh.controller';
import { registrationComplete } from '@/controllers/v1/auth/registration.controller/complete';
import { jwtAuthMiddleware } from '@/middleware/authHandler';
import { getGlobalRateLimit } from '@/middleware/rateLimitHandler';
import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login with phone number
 *     description: Sends an OTP code to the user's phone number. Temporarily returns OTP code and other information, but in production they won't exist on the response payload
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: OTP code was sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: Internal server error
 */
router.post('/login',
    getGlobalRateLimit({
        windowMs: 60000,
        limit: 1,
        keyGenerator: req => {
            const { phone } = req.body;
            return phone;
        }
    }),
    loginController);

/**
 * @swagger
 * /api/v1/auth/otp_verify:
 *   post:
 *     summary: Verify OTP and get JWT tokens
 *     description: Validates the OTP code and returns JWT tokens.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OtpVerifyRequest'
 *     responses:
 *       200:
 *         description: Successfully verified OTP, returns JWT tokens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/JwtTokensResponse'
 *       400:
 *         description: Invalid OTP or request parameters
 *       500:
 *         description: Internal server error
 */
router.post('/otp_verify', otpController);

/**
 * @swagger
 * /api/v1/auth/complete_registration:
 *   put:
 *     summary: Complete user registration
 *     description: Completes the registration process by updating the user's full name, email, and optional details.
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []  # Requires JWT Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               gender:
 *                 type: string
 *                 enum: ["male", "female"]
 *                 example: "male"
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 example: "1990-05-15"
 *               city_id:
 *                 type: integer
 *                 example: 1
 *               ref_code:
 *                 type: string
 *                 nullable: truee
 *                 example: null
 *     responses:
 *       200:
 *         description: Registration completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Invalid input (e.g., missing full name or incorrect email format)
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
router.put('/complete_registration', jwtAuthMiddleware, registrationComplete);

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Refresh JWT tokens
 *     description: Generates a new access token and refresh token using a valid refresh token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 description: The refresh token used to generate new tokens.
 *     responses:
 *       200:
 *         description: Successfully generated new tokens
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     refreshToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     user_id:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Invalid or missing refresh token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized (Invalid refresh token)
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
router.post('/refresh', refreshTokenController);

export default router;