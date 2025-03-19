import prisma from "@/config/db";

interface GetCategoriesParamsType {
    locale: string;
}

export const getCategories = async (params: GetCategoriesParamsType) => {
    // const categories = await prisma.categories.findMany({
    //     where: {
    //         is_parent: true,
    //         deleted_at: null,
    //         status: 'active'
    //     },
    //     select: {
    //         id: true,
    //         modules: {
    //             select: {
    //                 id: true,
    //                 name: true
    //             }
    //         },
    //         category_translations: {
    //             where: {
    //                 locale: {
    //                     equals: params.locale,
    //                     mode: 'insensitive'
    //                 }
    //             },
    //             select: {
    //                 name: true,
    //                 locale: true,
    //             }
    //         },
    //         _count: {
    //             select: {
    //                 store_products_categories: {
    //                     where: {},
    //                 }
    //             }
    //         }
    //     }
    // });

    const categories = await prisma.$queryRaw`
        SELECT 
            c.id, 
            c.status, 
            m.id AS module_id, 
            m.name AS module_name,
            ct.name AS category_name,
            ct.locale,
            COUNT(spc.store_product_id) AS store_products_count,
            u.object_key AS image_key
        FROM categories c
        LEFT JOIN modules m ON c.module_id = m.id
        LEFT JOIN category_translations ct ON ct.category_id = c.id AND LOWER(ct.locale) = LOWER(${params.locale})
        LEFT JOIN store_products_categories spc ON spc.category_id = c.id
        LEFT JOIN uploads u ON u.uploadable_type = 'App\\Models\\Category' AND u.uploadable_id = c.id
        LEFT JOIN category_relations cr on cr.child_id = c.id
        WHERE c.is_parent = TRUE AND c.deleted_at IS NULL AND c.status = 'active'
        GROUP BY c.id, m.id, m.name, ct.name, ct.locale, u.object_key, cr.order
        ORDER BY cr.order asc, store_products_count desc, c.id asc
    `;
    return categories;
}