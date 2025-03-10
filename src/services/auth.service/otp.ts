import prisma from "@/config/db";
import { BadRequestException } from "@/exceptions/BadRequestException";
import { UnauthorizedException } from "@/exceptions/UnauthorizedException";

interface OtpVerifyParamsType {
    otp?: string | number;
    phone?: string;
}

export const otpVerify = async ({
    otp,
    phone
}: OtpVerifyParamsType) => {
    const code = Number(otp);

    if (!code || isNaN(code)) {
        throw new BadRequestException('OTP code absent');
    }

    try {
        return await prisma.otps.findFirstOrThrow({
            where: {
                code,
                users: {
                    phone
                }
            },
            select: {
                id: true,
                user_id: true
            }
        });

    } catch {
        throw new UnauthorizedException('otp code is not correct');
    }
}