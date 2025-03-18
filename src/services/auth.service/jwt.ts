import config from "@/config";
import prisma from "@/config/db";
import { NotFoundException } from "@/exceptions/NotFoundException";
import { UnauthorizedException } from "@/exceptions/UnauthorizedException";
import jwt from "jsonwebtoken";

const JWT_SECRET = config.jwt.accessSecret;
const REFRESH_TOKEN_SECRET = config.jwt.refreshSecret;
const ACCESS_TOKEN_EXPIRATION_TIME = config.jwt.accessTokenExpiresIn;
const REFRESH_TOKEN_EXPIRATION_TIME = config.jwt.refreshTokenExpiresIn;

export const getJwtToken = async (userId: number) => {
    try {
        const user = await prisma.users.findUniqueOrThrow({
            where: {
                id: Number(userId),
                deleted_at: null,
                block_type: 'not_blocked'
            },
            select: {
                id: true,
                name: true
            }
        });

        return {
            ...generateTokens(userId),
            registerRequired: !user.name.trim()
        }

    } catch {
        throw new NotFoundException('user');
    }
}

export const generateAccessToken = (id: number) => {

    const accessToken = jwt.sign({
        id
    }, JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRATION_TIME as any
    });

    return accessToken;
}

export const generateRefreshToken = (id: number) => {
    const refreshToken = jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRATION_TIME as any,
    });

    return refreshToken;
}

export const generateTokens = (id: number) => {
    const accessToken = generateAccessToken(id);
    const refreshToken = generateRefreshToken(id);

    return {
        accessToken,
        refreshToken
    }
}

export const verify = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        throw new UnauthorizedException();
    }
}

export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch {
        throw new UnauthorizedException();
    }
}