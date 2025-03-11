import prisma from "@/config/db";
import { NotFoundException } from "@/exceptions/NotFoundException";
import { Prisma } from "@prisma/client";

interface SearchStoresParamsType {
    keyword?: string;
    locale: string;
    limit?: number;
    offset?: number;
}

interface GetStoreParamsType {
    store_id: number;
    locale: string;
}

const storeSelect = () => {
    const select: Prisma.storesSelect = {
        id: true,
        name: true,
        store_code: true,
        phone: true,
        email: true,
        lat: true,
        lng: true,
        rating: true,
        have_not_vegan: true,
        have_vegan: true,
        has_packet: true,
        open_time: true,
        close_time: true,
        store_detail_contents: {
            select: {
                display_name: true,
                type: true,
                category_more_btn: true,
            }
        },
        currencies: {
            select: {
                id: true,
                code: true
            }
        },
        modules: {
            select: {
                id: true,
                name: true,
            }
        },
        cities: {
            select: {
                id: true,
                name: true,
                countries: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        },
        zones: {
            select: {
                id: true,
                name: true,
            }
        },
        store_branches: {
            select: {
                id: true,
                name: true
            }
        }
    }

    return select;
}

export const searchStores = async (params: SearchStoresParamsType) => {
    const where: Prisma.storesWhereInput = {
        status: 'active',
        deleted_at: null
    };

    const limit = params.limit && params.limit > 50 ? 50 : (params.limit && params.limit > 0 ? params.limit : 50);
    const offset = params.offset && params.offset > 0 ? params.offset : 0;

    if (params.keyword?.trim()) {
        where.name = {
            contains: params.keyword,
            mode: 'insensitive'
        }
    }

    const stores = await prisma.stores.findMany({
        where,
        select: storeSelect(),
        take: limit,
        skip: offset
    });

    const count = await prisma.stores.count({
        where
    });

    return {
        stores,
        count
    };
}

export const getStore = async (params: GetStoreParamsType) => {
    try {
        
        const store = await prisma.stores.findUniqueOrThrow({
            where: {
                id: params.store_id,
                deleted_at: null,
                status: 'active'
            },
            select: {
                ...storeSelect(),
                store_category_id: true
            }
        });

        const storeCategoryTranslation = await prisma.store_category_translations.findFirstOrThrow({
            where: {
                store_category_id: store.store_category_id!,
                locale: {
                    equals: params.locale,
                    mode: 'insensitive'
                }
            },
            select: {
                name: true,
                locale: true
            }
        });

        return {
            store,
            category: storeCategoryTranslation
        }

    } catch {
        throw new NotFoundException('store');
    }
}