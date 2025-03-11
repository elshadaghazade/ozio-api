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

const getStoreSelect = () => {
    const select: Prisma.storesSelect = {
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
        countries: {
            select: {
                id: true,
                name: true
            }
        },
        cities: {
            select: {
                id: true,
                name: true
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
    };

    const limit = params.limit || 10;
    const offset = params.offset || 0;

    if (params.keyword?.trim()) {
        where.name = {
            contains: params.keyword,
            mode: 'insensitive'
        }
    }

    const stores = await prisma.stores.findMany({
        where,
        select: getStoreSelect(),
        take: limit,
        skip: offset
    });

    return stores;
}

export const getStore = async (params: GetStoreParamsType) => {
    try {
        
        const store = await prisma.stores.findUniqueOrThrow({
            where: {
                id: params.store_id
            },
            select: {
                ...getStoreSelect(),
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

        console.log(storeCategoryTranslation);

        
    } catch {
        throw new NotFoundException('store');
    }
}