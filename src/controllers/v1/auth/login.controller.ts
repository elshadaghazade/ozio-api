import { login, otpVerify } from '@/services/auth.service';
import { ApiResponse } from '@/utils/apiResponse';
import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { getJwtToken } from '@/services/auth.service';
import { sendSMS } from '@/services/sms.service';

export const loginController = async (req: Request<{}, null, Partial<Prisma.usersCreateInput>>, res: Response, next: NextFunction) => {
    const body = req.body;

    try {
        
        const { payload, otp_code } = await login(body);

        await sendSMS({
            text: `OTP kod: ${otp_code}`,
            msisdn: payload.phone
        });

        res.json(ApiResponse.success({
            success: 'OTP code was sent to your phone number',
            payload
        }));
    } catch (err) {
        next(err);
    }
}

export const otpController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { user_id } = await otpVerify(req.body);

        const jwtTokens = await getJwtToken(Number(user_id));

        res.json(ApiResponse.success(jwtTokens));
        
    } catch (err) {
        next(err);
    }
}