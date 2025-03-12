import { getStore, searchStores } from "@/services/store.service";
import { ApiResponse } from "@/utils/apiResponse";
import { Request, Response, NextFunction } from "express"

export const searchStoreController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            keyword,
            limit,
            offset
        } = req.query as {
            keyword?: string;
            limit?: string;
            offset?: string;
            locale: string;
        };

        const { stores, count: total } = await searchStores({
            keyword,
            limit: limit?.length ? Number(limit) : undefined,
            offset: offset?.length ? Number(offset) : undefined
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

export const getStoreController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const store_id = req.params.store_id;

        const {
            locale
        } = req.query;

        const store = await getStore({
            store_id: Number(store_id),
            locale: locale?.toString() || 'en'
        });

        res.json(ApiResponse.success(store));
    } catch (err) {
        next(err);
    }
}