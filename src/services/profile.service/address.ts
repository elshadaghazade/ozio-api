import prisma from "@/config/db";
import { NotFoundException } from "@/exceptions/NotFoundException";
import { Prisma } from "@prisma/client";

interface GetAddressesParamsType {
    user_id: number;
}

interface GetAddressParamsType {
    user_id: number;
    addressId: number | string;
}

type CreateAddressParamsType = Partial<Omit<Prisma.user_addressCreateInput, 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'orders' | 'users' | 'zones' | 'is_selected'>> & {
    user_id: number;
};

interface UpdateAddressParamsType extends CreateAddressParamsType {
    addressId: string | number;
}

type DeleteAddressParamstype = {
    user_id: number;
    addressId: number | string;
}

type SetAsDefaultAddressParamsType = {
    user_id: number;
    addressId: string | number;
}

const addressSelect = () => {
    const select: Prisma.user_addressSelect = {
        id: true,
        type: true,
        phone: true,
        lng: true,
        lat: true,
        person_name: true,
        floor: true,
        road: true,
        house: true,
        is_selected: true,
        zones: {
            select: {
                id: true,
                name: true,
                type: true,
                status: true,
            }
        }
    };

    return select;
}

export const getAddresses = async ({
    user_id
}: GetAddressesParamsType) => {
    const addresses = await prisma.user_address.findMany({
        where: {
            user_id,
            deleted_at: null
        },
        select: addressSelect(),
        orderBy: [
            {
                is_selected: 'desc',
            },
            {
                created_at: 'asc'
            }
        ]
    });

    return addresses;
}

export const getAddress = async ({
    user_id,
    addressId
}: GetAddressParamsType) => {
    try {
        const address = await prisma.user_address.findUniqueOrThrow({
            where: {
                id: Number(addressId),
                user_id,
                deleted_at: null
            },
            select: addressSelect()
        });

        return address;
    } catch {
        throw new NotFoundException('address');
    }
}

export const createAddress = async (params: CreateAddressParamsType) => {
    const createData: Prisma.user_addressCreateInput = {
        type: params.type || "",
        phone: params.phone || "",
        lng: params.lng?.toString() || "",
        lat: params.lat?.toString() || "",
        person_name: params.person_name || "",
        floor: params.floor,
        road: params.road,
        house: params.house,
        users: {
            connect: {
                id: params.user_id
            }
        }
    };
    
    await prisma.user_address.create({
        data: createData,
        select: {
            id: true
        }
    });
}

export const updateAddress = async (params: UpdateAddressParamsType) => {
    const data: Prisma.user_addressUpdateInput = {};

    if (params.type) {
        data.type = params.type;
    }

    if (params.floor) {
        data.floor = params.floor;
    }

    if (params.house) {
        data.house = params.house;
    }

    if (params.lat) {
        data.lat = params.lat;
    }

    if (params.lng) {
        data.lng = params.lng;
    }

    if (params.person_name) {
        data.person_name = params.person_name;
    }

    if (params.phone) {
        data.phone = params.phone;
    }

    if (params.road) {
        data.road = params.road;
    }
    
    try {
        const address = await prisma.user_address.update({
            data,
            where: {
                id: Number(params.addressId),
                user_id: params.user_id,
                deleted_at: null
            },
            select: {
                id: true,
                type: true,
                phone: true,
                lng: true,
                lat: true,
                person_name: true,
                floor: true,
                road: true,
                house: true,
                is_selected: true,
                zones: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                        status: true,
                    }
                }
            }
        });

        return address;
    } catch {
        throw new NotFoundException('address');
    }
}

export const deleteAddress = async (params: DeleteAddressParamstype) => {
    try {
        await prisma.user_address.update({
            where: {
                id: Number(params.addressId),
                user_id: params.user_id,
                deleted_at: null
            },
            data: {
                deleted_at: new Date()
            },
            select: {
                id: true,
            }
        });
    } catch {
        throw new NotFoundException('address');
    }
}

export const setAsDefaultAddress = async (params: SetAsDefaultAddressParamsType) => {
    try {
        await prisma.$transaction(async prisma => {
            await prisma.user_address.updateMany({
                where: {
                    id: {
                        not: Number(params.addressId)
                    },
                    user_id: params.user_id,
                    deleted_at: null
                },
                data: {
                    is_selected: false
                }
            });
    
            await prisma.user_address.update({
                where: {
                    id: Number(params.addressId),
                    user_id: params.user_id,
                    deleted_at: null
                },
                data: {
                    is_selected: true
                },
                select: {
                    id: true
                }
            });
        });
    } catch {
        throw new NotFoundException('address');
    }
}