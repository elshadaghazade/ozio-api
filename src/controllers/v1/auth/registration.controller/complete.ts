import { UnauthorizedException } from "@/exceptions/UnauthorizedException";
import { completeRegistration, CompleteRegistrationParamsType } from "@/services/auth.service/register";
import { ApiResponse } from "@/utils/apiResponse";
import { NextFunction, Request, Response } from "express";

export const registrationComplete = async (req: Request<{}, null, CompleteRegistrationParamsType>, res: Response, next: NextFunction) => {
    
    try {
        const {
            fullName,
            email,
            gender,
            birth_date,
            city_id,
            ref_code
        } = req.body;

        const user: any = (req as any).user;

        if (!user) {
            throw new UnauthorizedException();
        }

        await completeRegistration({
            user_id: user.id,
            fullName,
            email,
            gender,
            birth_date: typeof birth_date === 'string' ? new Date(birth_date) : birth_date,
            city_id,
            ref_code
        });

        res.json(ApiResponse.success('Done'));
    } catch (err) {
        next(err);
    }
}