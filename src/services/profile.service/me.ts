import prisma from "@/config/db";
import { NotFoundException } from "@/exceptions/NotFoundException";

interface GetMeParamsType {
    user_id: number;
}

export const getMe = async ({
    user_id
}: GetMeParamsType) => {
    try {
        const user = await prisma.users.findUniqueOrThrow({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                card_number: true,
                birth_date: true,
                ref_code: true,
                gender: true,
                phone: true,
                user_addresses: {
                    select: {
                        id: true,
                        floor: true,
                        house: true,
                        is_selected: true,
                        lat: true,
                        lng: true,
                        person_name: true,
                        phone: true,
                        road: true,
                        type: true,
                        zones: true
                    },
                    where: {
                        deleted_at: null
                    },
                    orderBy: [
                        {
                            is_selected: 'desc'
                        },
                        {
                            created_at: 'desc'
                        }
                    ]
                },
                assigned_coupons: {
                    select: {
                        id: true,
                        assignable_id: true,
                        assignable_type: true,
                        used_at: true,
                        is_for_all: true,
                        used_coupons: true,
                        coupons: true
                    }
                },
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
                    },
                }
            }
        });

        return user;
    } catch {
        throw new NotFoundException('user');
    }
}