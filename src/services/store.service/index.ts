import prisma from "@/config/db";
import { NotFoundException } from "@/exceptions/NotFoundException";
import { Prisma } from "@prisma/client";

export type orderByTuple = 'name_asc' | 'name_desc' | 'country_name_asc' | 'country_name_desc' | 'city_name_asc' | 'city_name_desc' | 'rating_asc' | 'rating_desc';

const orderByVariants: Record<orderByTuple, Prisma.storesOrderByWithRelationInput> = {
    name_asc: {name: 'asc'},
    name_desc: {name: 'desc'},
    country_name_asc: {
        cities: {
            countries: {
                name: 'asc'
            }
        }
    },
    country_name_desc: {
        cities: {
            countries: {
                name: 'desc'
            }
        }
    },
    city_name_asc: {
        cities: {
            name: 'asc'
        }
    },
    city_name_desc: {
        cities: {
            name: 'desc'
        }
    },
    rating_asc: { rating: 'asc' },
    rating_desc: { rating: 'desc' }
}

interface SearchStoresParamsType {
    keyword?: string;
    limit?: number;
    offset?: number;
    orderBy?: orderByTuple | orderByTuple[]
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

export const searchStores = async ({
    keyword,
    limit=50,
    offset=0,
    orderBy=['rating_desc', 'name_asc']
}: SearchStoresParamsType) => {
    const where: Prisma.storesWhereInput = {
        status: 'active',
        deleted_at: null,
        
    };

    limit = limit && limit > 50 ? 50 : (limit && limit > 0 ? limit : 50);
    offset = offset && offset > 0 ? offset : 0;

    if (keyword?.trim()) {
        where.name = {
            contains: keyword,
            mode: 'insensitive'
        }
    }

    const storesOrderBy: Prisma.storesOrderByWithRelationInput[] = [];
    if (typeof orderBy === 'string') {
        if (orderByVariants[orderBy]) {
            storesOrderBy.push(orderByVariants[orderBy]);
        }
    } else if (orderBy instanceof Array) {
        for(let ord of orderBy) {
            if (!orderByVariants[ord]) {
                continue;
            }

            storesOrderBy.push(orderByVariants[ord]);
        }
    }

    const stores = await prisma.stores.findMany({
        where,
        select: storeSelect(),
        take: limit,
        skip: offset,
        orderBy: storesOrderBy
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