import prisma from "@/config/db"

export const getCountries = async () => {
    return await prisma.countries.findMany({
        where: {
            deleted_at: null
        },
        select: {
            id: true,
            name: true,
            code: true,
            phone_code: true
        },
        orderBy: [
            {
                name: 'asc'
            }
        ]
    });
}