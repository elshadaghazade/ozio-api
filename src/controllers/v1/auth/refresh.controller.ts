import { generateTokens, verifyRefreshToken } from '@/services/auth.service/jwt';
import { ApiResponse } from '@/utils/apiResponse';
import {NextFunction, Request, Response} from 'express';

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const {
            token
        } = req.body as {
            token: string;
        };

        const { id } = verifyRefreshToken(token) as { id: number };

        const {
            accessToken,
            refreshToken
        } = generateTokens(id);

        res.json(ApiResponse.success({
            accessToken,
            refreshToken,
            user_id: id
        }));
        
    } catch (err) {
        next(err);
    }
}