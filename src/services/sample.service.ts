import prisma from "@/config/db"

export const sampleHomeService = async () => {
    return await prisma.admins.findMany({
        select: {
            name: true,
            email: true,
            created_at: true,
        }
    });
}