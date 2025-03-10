import prisma from "@/config/db";
import { BadRequestException } from "@/exceptions/BadRequestException";

interface CompleteRegistrationParamsType {
    user_id: number;
    fullName: string;
    email: string;
}

export const completeRegistration = async (params: CompleteRegistrationParamsType) => {

    if (!params.fullName?.trim() || !/^[\w\d\.#_]+@[\w\d\.#_]+$/gi.test(params.email)) {
        throw new BadRequestException();
    }

    await prisma.users.update({
        where: {
            id: params.user_id,
            deleted_at: null
        },
        data: {
            name: params.fullName,
        }
    });
}