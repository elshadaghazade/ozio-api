import { BadRequestException } from '@/exceptions/BadRequestException';
import { getCategories } from '@/services/category.service';
import { ApiResponse } from '@/utils/apiResponse';
import { Request, Response, NextFunction } from 'express';

export const getCategoriesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { locale } = req.query;

        if (!locale) {
            throw new BadRequestException();
        }

        const categories = await getCategories({
            locale: locale.toString()
        });

        res.json(ApiResponse.success(categories));

    } catch (err) {
        next(err);
    }
}