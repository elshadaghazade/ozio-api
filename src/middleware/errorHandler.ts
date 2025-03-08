import { Request, Response, NextFunction } from "express";
import { HttpException } from "@/exceptions/HttpException";
import { ApiResponse } from "@/utils/apiResponse";
import logger from "@/config/logger";

// Explicitly typing the function as an Express error handler
export function errorHandler(
    err: any,
    _: Request,
    res: Response,
    next: NextFunction
) {

    logger.error(err.stack);
    if (err.headersSent) {
        next(err);
    } else if (err instanceof HttpException) {
        res.status(err.statusCode).json(ApiResponse.error(err.message, err.statusCode));
    } else {
        res.status(500).json(ApiResponse.error("Internal Server Error", 500));
    }
}