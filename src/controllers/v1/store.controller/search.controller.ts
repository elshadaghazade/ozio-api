import { getStore, searchStores, SearchStoresParamsType } from "@/services/store.service";
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