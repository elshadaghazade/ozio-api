import prisma from "@/config/db";

interface GetCategoriesParamsType {
    locale: string;
}

export const getCategories = async (params: GetCategoriesParamsType) => {
    const categories = await prisma.categories.findMany({
        where: {
            is_parent: true,
            deleted_at: null,
            status: 'active'
        },
        select: {
            id: true,
            modules: {
                select: {
                    id: true,
                    name: true
                }
            },
            category_translations: {
                where: {
                    locale: {
                        equals: params.locale,
                        mode: 'insensitive'
                    }
                },
                select: {
                    name: true,
                    locale: true,
                }
            }
        }
    });

    return categories;
}