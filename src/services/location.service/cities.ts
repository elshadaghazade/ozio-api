import prisma from "@/config/db"

export const getCities = async (country_id: number) => {
    return await prisma.cities.findMany({
        where: {
            country_id
        },
        select: {
            id: true,
            name: true
        },
        orderBy: [
            {
                name: 'asc'
            }
        ]
    });
}