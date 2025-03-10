import prisma from "@/config/db";

interface CompleteRegistrationParamsType {
    user_id: number;
    fullName: string;
    email: string;
}

export const completeRegistration = async (params: CompleteRegistrationParamsType) => {
    await prisma.users.update({
        where: {
            id: params.user_id
        },
        data: {
            name: params.fullName,
        }
    });
}