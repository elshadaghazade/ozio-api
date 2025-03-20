import { getStore, getStoreProducts, searchStores, SearchStoresParamsType } from "@/services/store.service";
import { RequestWithUser } from "@/types/Http";
import { ApiResponse } from "@/utils/apiResponse";
import { Request, Response, NextFunction } from "express";

export const searchStoreController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            keyword,
            limit,
            offset,
            orderBy,
            locale
        }: SearchStoresParamsType = req.query;

        const { stores, count: total } = await searchStores({
            keyword,
            limit,
            offset,
            orderBy,
            locale
        });

        res.json(ApiResponse.success({
            total,
            stores,
            limit,
            offset
        }));

    } catch (err) {
        next(err);
    }
}

export const getStoreController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const store_id = req.params.store_id;

        const {
            locale
        } = req.query;

        const store = await getStore({
            store_id: Number(store_id),
            locale: locale?.toString() || 'en',
            user_id: req.user?.id
        });

        res.json(ApiResponse.success(store));
    } catch (err) {
        next(err);
    }
}

export const getStoreProductsController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const store_id = req.params.store_id;

        const {
            locale,
            is_recommended,
            is_organic,
            is_halal,
            is_vegan,
            is_popular_item,
            limit,
            offset
        } = req.query;

        const result = await getStoreProducts({
            store_id: Number(store_id),
            locale: locale?.toString() || 'en',
            user_id: req.user?.id,
            is_recommended: is_recommended ? is_recommended === '1' : undefined,
            is_organic: is_organic ? is_organic === '1' : undefined,
            is_halal: is_halal ? is_halal === '1' : undefined,
            is_vegan: is_vegan ? is_vegan === '1' : undefined,
            is_popular_item: is_popular_item ? is_popular_item === '1' : undefined,
            limit: Number(limit),
            offset: Number(offset)
        });

        res.json(ApiResponse.success(result));
    } catch (err) {
        next(err);
    }
}