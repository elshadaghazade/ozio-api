import prisma from "@/config/db"

export const getCountries = async () => {
    return await prisma.countries.findMany({
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