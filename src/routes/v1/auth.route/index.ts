import { loginController, otpController } from '@/controllers/v1/auth/login.controller';
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
router.post('/login', getGlobalRateLimit({
    windowMs: 60000,
    limit: 1,
    keyGenerator: req => {
        const { phone } = req.body;
        return phone;
    }
}), loginController);

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
 *   post:
 *     summary: Complete user registration
 *     description: Completes the registration process by updating the user's full name and email.
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
router.post('/complete_registration', jwtAuthMiddleware, registrationComplete);

export default router;