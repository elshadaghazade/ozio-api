import { verify } from "@/services/auth.service/jwt";
import { ApiResponse } from "@/utils/apiResponse";
import { Request, Response, NextFunction } from "express";

export const jwtAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json(ApiResponse.error('Unauthorized: Invalid token'));
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        (req as any).user = verify(token);
        next();
    } catch (err) {
        res.status(401).json(ApiResponse.error('Unauthorized: Invalid token'));
    }
};

export const jwtAuthMiddlewareNoException = (req: Request, _: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers.authorization;
    
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            const user = verify(token);
            (req as any).user = user;
        }
    } finally {
        next();
    }
};