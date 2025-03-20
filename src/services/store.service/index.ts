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

export interface SearchStoresParamsType {
    keyword?: string;
    limit?: number | string;
    offset?: number | string;
    orderBy?: orderByTuple | orderByTuple[];
    product_limit?: number;
    locale?: string;
}

interface GetStoreParamsType {
    store_id: number;
    locale: string;
    user_id?: number;
}

interface GetStoreProductsParamsType {
    store_id: number;
    locale: string;
    user_id?: number;
    limit?: number;
    offset?: number;
    is_recommended?: boolean;
    is_organic?: boolean;
    is_halal?: boolean;
    is_vegan?: boolean;
    is_popular_item?: boolean;
}

interface SelectFuncParamsType {
    product_limit?: number;
    locale: string;
    include_products?: boolean;
    user_id?: number;
}

const storeProductVariantAssignmentSelect = (params: SelectFuncParamsType) => {
    const select: Prisma.store_product_variant_assignmentsFindManyArgs = {
        select: {
            id: true,
            price: true,
            stock: true,
            mrp: true,
            min_order_quantity: true,
            max_order_quantity: true,
            store_product_variants: {
                select: {
                    id: true,
                    material_code: true,
                    is_recommended: true,
                    is_organic: true,
                    is_halal: true,
                    is_vegan: true,
                    is_popular_item: true,
                    width: true,
                    height: true,
                    length: true,
                    weight: true,
                    volume: true,
                    _count: {
                        select: {
                            user_favorite_store_product_variants: {
                                where: {
                                    user_id: params.user_id || -1
                                }
                            }
                        }
                    },
                    store_product_variant_uploads: {
                        select: {
                            id: true,
                            object_key: true,
                            size: true,
                            mime_type: true,
                            extension: true,
                            type: true
                        },
                    },
                    units: {
                        select: {
                            id: true,
                            symbol: true,
                            conversion: true,
                            unit_types: {
                                select: {
                                    id: true,
                                    unit_type_translations: {
                                        select: {
                                            name: true,
                                        },
                                        where: {
                                            locale: {
                                                equals: params?.locale,
                                                mode: 'insensitive'
                                            }
                                        }
                                    }
                                },
                            }
                        },
                    },
                    colors: {
                        select: {
                            hex_code: true,
                        }
                    },
                    store_products: {
                        select: {
                            id: true,
                            tax_value: true,
                            tax_type: true,
                            store_products_categories: {
                                select: {
                                    categories: {
                                        select: {
                                            id: true,
                                            category_translations: {
                                                select: {
                                                    name: true,
                                                },
                                                where: {
                                                    locale: {
                                                        equals: params.locale,
                                                        mode: 'insensitive'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    },
                    store_product_variant_translations: {
                        select: {
                            name: true,
                        },
                        where: {
                            locale: params.locale
                        }
                    }
                },
            }
        },
        take: params?.product_limit || 3,
        skip: 0,
        where: {
            stock: {
                gt: 0
            },
            visibility: 'visible',
            deleted_at: null,
            // store_product_variants: {
            //     status: 'active',
            //     units: {
            //         unit_types: {
            //             status: 'active',
            //             deleted_at: null
            //         },
            //         status: 'active',
            //         deleted_at: null
            //     },
            //     store_products: {
            //         deleted_at: null,
            //     }
            // },
        },
        orderBy: [
            {
                store_product_variants: {
                    rating: 'desc'
                }
            }
        ]
    }

    return select;
}

const storeSelect = (params: SelectFuncParamsType) => {
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
        preparation_time: true,
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
        zones: {
            select: {
                id: true,
                name: true,
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
                zone_pricing: {
                    select: {
                        id: true,
                        price_for_100m: true,
                        currencies: {
                            select: {
                                id: true,
                                code: true,
                                name: true,
                                tips: {
                                    select: {
                                        id: true,
                                        value: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        store_branches: {
            select: {
                id: true,
                name: true
            }
        },
    }

    if (params.include_products) {
        select.store_product_variant_assignments = storeProductVariantAssignmentSelect(params);
    }

    return select;
}

export const searchStores = async ({
    keyword,
    limit=50,
    offset=0,
    product_limit=3,
    locale='en',
    orderBy=['rating_desc', 'name_asc']
}: SearchStoresParamsType) => {

    const where: Prisma.storesWhereInput = {
        status: 'active',
        deleted_at: null,
    };

    limit = Number(limit);
    offset = Number(offset);
    product_limit = Number(product_limit);

    limit = !isNaN(limit) && limit <= 50 && limit >= 0 ? limit : 50;
    offset = !isNaN(offset) && offset > 0 ? offset : 0;
    product_limit = !isNaN(product_limit) && product_limit <= 10 && product_limit > 0 ? product_limit : 3;

    keyword = keyword?.trim();

    if (keyword) {
        where.OR = [
            {
                store_product_variant_assignments: {
                    some: {
                        store_product_variants: {
                            store_product_variant_translations: {
                                some: {
                                    name: {
                                        contains: keyword,
                                        mode: 'insensitive'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                name: {
                    contains: keyword,
                    mode: 'insensitive'
                }
            }
        ];
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
        select: storeSelect({
            locale,
            include_products: true
        }),
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
                ...storeSelect({
                    locale: params.locale
                }),
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

        const storeBonusPercentage = await prisma.store_bonus_percentages.findMany({
            where: {
                store_code: store.store_code,
                deleted_at: null,
            },
            select: {
                id: true,
                percentage: true,
                start_date: true,
            }
        });

        const storeDetailDivisionsAndContent = await prisma.store_detail_divisions_and_contents.findMany({
            where: {
                store_detail_contents: {
                    store_id: params.store_id,
                    deleted_at: null,
                },
                store_detail_divisions: {
                    store_id: params.store_id,
                    deleted_at: null,
                    status: 'active'
                }
            },
            select: {
                id: true,
                store_detail_divisions: {
                    select: {
                        display_name: true,
                        type: true,
                    }
                },
                store_detail_contents: {
                    select: {
                        id: true,
                        display_name: true,
                        type: true,
                        category_more_btn: true,
                    }
                }
            },
            orderBy: [
                {
                    store_detail_divisions: {
                        priority: 'asc'
                    }
                }
            ]
        });

        const storeHolidays = await prisma.stores_store_holidays.findMany({
            where: {
                store_id: params.store_id,
                store_holidays: {
                    deleted_at: null
                }
            },
            select: {
                store_holidays: {
                    select: {
                        id: true,
                        name: true,
                        start_date: true,
                        end_date: true,
                        close_time: true,
                        open_time: true,
                        assign_all_stores: true,
                    }
                }
            }
        });

        const is_user_favorite_store = !params.user_id ? false : await prisma.user_favorite_stores.count({
            where: {
                user_id: params.user_id,
                store_id: store.id
            }
        }) > 0;

        return {
            store,
            category: storeCategoryTranslation,
            storeBonusPercentage,
            storeDetailDivisionsAndContent,
            storeHolidays,
            is_user_favorite_store
        }

    } catch {
        throw new NotFoundException('store');
    }
}

export const getStoreProducts = async (params: GetStoreProductsParamsType) => {
    try {
        const productvariantsSelect = storeProductVariantAssignmentSelect({
            locale: params.locale,
            user_id: params.user_id
        });

        const where: Prisma.store_product_variant_assignmentsWhereInput = {
            store_id: params.store_id,
            visibility: 'visible',
            stock: {
                gt: 0
            },
            store_product_variants: {
                status: 'active',
                deleted_at: null
            }
        }

        if (params.is_recommended === true && where.store_product_variants) {
            where.store_product_variants.is_recommended = params.is_recommended;
        } else if(params.is_recommended === true) {
            where.store_product_variants = {
                is_recommended: params.is_recommended
            }
        }

        if (params.is_halal === true && where.store_product_variants) {
            where.store_product_variants.is_halal = params.is_halal;
        } else if(params.is_halal === true) {
            where.store_product_variants = {
                is_halal: params.is_halal
            }
        }

        if (params.is_organic === true && where.store_product_variants) {
            where.store_product_variants.is_organic = params.is_organic;
        } else if(params.is_organic === true) {
            where.store_product_variants = {
                is_organic: params.is_organic
            }
        }

        if (params.is_popular_item === true && where.store_product_variants) {
            where.store_product_variants.is_popular_item = params.is_popular_item;
        } else if(params.is_popular_item === true) {
            where.store_product_variants = {
                is_popular_item: params.is_popular_item
            }
        }

        if (params.is_vegan === true && where.store_product_variants) {
            where.store_product_variants.is_vegan = params.is_vegan;
        } else if(params.is_vegan === true) {
            where.store_product_variants = {
                is_vegan: params.is_vegan
            }
        }

        const {
            limit=50,
            offset=0
        } = params;

        const products = await prisma.store_product_variant_assignments.findMany({
            where,
            select: productvariantsSelect.select,
            skip: isNaN(offset) ? 0 : offset,
            take: isNaN(limit) || limit > 50 || limit < 0 ? 50 : limit
        });

        const total = await prisma.store_product_variant_assignments.count({
            where
        });

        return {
            products: products.map((product: any) => {
                const is_favorite = typeof product.store_product_variants?._count?.user_favorite_store_product_variants === 'number' && product.store_product_variants._count.user_favorite_store_product_variants > 0;

                delete product.store_product_variants._count;
                product.store_product_variants.is_favorite = is_favorite;

                return product;
            }),
            total
        };
    } catch {
        throw new NotFoundException('store products');
    }
}