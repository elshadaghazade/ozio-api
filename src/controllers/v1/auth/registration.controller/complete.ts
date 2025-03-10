import { UnauthorizedException } from "@/exceptions/UnauthorizedException";
import { completeRegistration } from "@/services/auth.service/register";
import { ApiResponse } from "@/utils/apiResponse";
import { NextFunction, Request, Response } from "express";

interface RegistrationCompleteBodyType {
    fullName: string;
    email: string;
}

export const registrationComplete = async (req: Request<{}, null, RegistrationCompleteBodyType>, res: Response, next: NextFunction) => {
    
    try {
        const {
            fullName,
            email
        } = req.body;

        const user: any = (req as any).user;

        if (!user) {
            throw new UnauthorizedException();
        }

        await completeRegistration({
            user_id: user.id,
            fullName,
            email
        });

        res.json(ApiResponse.success('Done'));
    } catch (err) {
        next(err);
    }
}