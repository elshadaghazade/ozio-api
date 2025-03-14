import prisma from "@/config/db"

export const getZones = async (city_id: number) => {
    return await prisma.zones.findMany({
        where: {
            city_id,
            deleted_at: null,
            status: 'active'
        },
        select: {
            id: true,
            name: true,
            type: true,
            cities: {
                select: {
                    id: true,
                    name: true,
                    countries: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            }
        },
        orderBy: [
            {
                cities: {
                    name: 'asc'
                }
            },
            {
                name: 'asc'
            }
        ]
    });
}