import { UnauthorizedException } from "@/exceptions/UnauthorizedException";
import { getMe } from "@/services/profile.service/me";
import { RequestWithUser } from "@/types/Http";
import { ApiResponse } from "@/utils/apiResponse";
import { NextFunction, Response } from "express";

export const meController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
            throw new UnauthorizedException();
        }

        const result = await getMe({
            user_id: user.id
        });
        
        res.json(ApiResponse.success(result));
    } catch (err) {
        next(err);
    }
}