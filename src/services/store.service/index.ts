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
}

const storeSelect = (params: {
    product_limit?: number;
    locale: string;
    include_products?: boolean;
}) => {
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
        store_product_variant_assignments: {
            select: {
                store_product_variants: {
                    select: {
                        store_products: {
                            select: {
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
                            }
                        }
                    }
                }
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
        select.store_product_variant_assignments = {
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

    if (keyword?.trim()) {
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

        return {
            store,
            category: storeCategoryTranslation
        }

    } catch {
        throw new NotFoundException('store');
    }
}

export const getStoreProducts = async (params: {
    store_id: number;
    locale: string
}) => {
    try {
        await prisma.store_product_variant_assignments.findMany({
            where: {
                store_id: params.store_id,
                visibility: 'visible',
                store_product_variants: {
                    status: 'active',
                    deleted_at: null
                }
            },
            select: {
                id: true,
                stock: true,
                price: true,
                mrp: true,
                min_order_quantity: true,
                max_order_quantity: true,
                store_product_variants: {
                    select: {
                        id: true,
                        material_code: true,
                        order_count: true,
                        rating: true,
                        is_recommended: true,
                        is_organic: true,
                        is_halal: true,
                        is_popular_item: true,
                        is_vegan: true,
                        width: true,
                        height: true,
                        length: true,
                        weight: true,
                        volume: true,
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
                    },
                }
            }
        })
    } catch {
        throw new NotFoundException('store products');
    }
}