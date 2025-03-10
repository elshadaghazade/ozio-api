import prisma from "@/config/db";
import { NotFoundException } from "@/exceptions/NotFoundException";
import jwt from "jsonwebtoken";



const JWT_SECRET = process.env.JWT_SECRET || "abc";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "abc";
const ACCESS_TOKEN_EXPIRATION_TIME = process.env.ACCESS_TOKEN_EXPIRATION_TIME || "15m";
const REFRESH_TOKEN_EXPIRATION_TIME = process.env.REFRESH_TOKEN_EXPIRATION_TIME
    ? parseInt(process.env.REFRESH_TOKEN_EXPIRATION_TIME)
    : 3600;


export const getJwtToken = async (userId: number) => {
    try {
        const user = await prisma.users.findUniqueOrThrow({
            where: {
                id: Number(userId)
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
        expiresIn: Math.round(Date.now() / 1000) + REFRESH_TOKEN_EXPIRATION_TIME,
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
    return jwt.verify(token, JWT_SECRET);
}