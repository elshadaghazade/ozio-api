import config from "@/config";
import prisma from "@/config/db";
import { BadRequestException } from "@/exceptions/BadRequestException";
import { InternalServerException } from "@/exceptions/InternalServerException";
import { 
    generateBonusCardCode, 
    generateRandomFixedLengthInteger 
} from "@/utils/codeGenerators";
import { Prisma } from "@prisma/client";

export const login = async ({
    phone,
}: Partial<Prisma.usersCreateInput>) => {
    const pattern = /^\+994\d+$/g;
    if (!phone || !pattern.test(phone)) {
        throw new BadRequestException('Phone number is wrong');
    }

    let registerRequired = false;

    let user = await prisma.users.findFirst({
        where: {
            phone,
        },
        select: {
            id: true,
            card_number: true,
            name: true,
        }
    });

    // əgər istifadəçi tapılmadısa onda onu qeydiyyat edirik
    if (!user) {
        user = await prisma.users.create({
            data: {
                name: '',
                city_id: 1,
                birth_date: new Date(),
                gender: 'male',
                card_number: '',
                phone,
                created_at: new Date(),
            },
            select: {
                id: true,
                card_number: true,
                name: true,
            }
        });
    }

    if (!user) {
        throw new InternalServerException('User could not be created');
    }

    if (!user.name.trim()) {
        registerRequired = true;
    }

    user = await prisma.users.update({
        data: {
            card_number: generateBonusCardCode(user.id),
            updated_at: new Date()
        },
        where: {
            id: user.id
        },
        select: {
            id: true,
            card_number: true,
            name: true
        }
    });

    const otp = await prisma.otps.create({
        data: {
            code: generateRandomFixedLengthInteger(6),
            user_id: user.id,
            created_at: new Date()
        },
        select: {
            id: true,
            code: true
        }
    });

    let payload: any = {
        registerRequired,
        user_id: Number(user.id),
        card_number: user.card_number,
    }

    if (config.env === 'development') {
        payload = {
            ...payload,
            otp_code: otp.code
        }
    }

    return payload;
}