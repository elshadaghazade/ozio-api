import prisma from "@/config/db";
import { BadRequestException } from "@/exceptions/BadRequestException";

export interface CompleteRegistrationParamsType {
    user_id: number;
    fullName: string;
    email: string;
    gender?: 'male' | 'female';
    birth_date?: Date | string;
    city_id?: number;
    ref_code?: string | null;
}

export const completeRegistration = async (params: CompleteRegistrationParamsType) => {

    if (!params.fullName?.trim() || !/^[\w\d\.#_]+@[\w\d\.#_]+$/gi.test(params.email)) {
        throw new BadRequestException();
    }

    await prisma.users.update({
        where: {
            id: params.user_id,
            deleted_at: null,
            block_type: 'not_blocked'
        },
        data: {
            name: params.fullName,
            gender: params.gender,
            birth_date: params.birth_date,
            city_id: params.city_id,
            ref_code: params.ref_code
        },
        select: {
            id: true
        }
    });
}