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

type CreateAddressParamsType = Partial<Omit<Prisma.user_addressesCreateInput, 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'orders' | 'users' | 'zones' | 'is_selected'>> & {
    user_id: number;
    zone_id: number;
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
    const select: Prisma.user_addressesSelect = {
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
                cities: {
                    select: {
                        id: true,
                        name: true,
                        countries: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                },
                zone_pricing: {
                    select: {
                        id: true,
                        price_for_100m: true,
                        currencies: {
                            select: {
                                id: true,
                                code: true,
                                name: true,
                                tips: {
                                    select: {
                                        id: true,
                                        value: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    return select;
}

export const getAddresses = async ({
    user_id
}: GetAddressesParamsType) => {
    const addresses = await prisma.user_addresses.findMany({
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
        const address = await prisma.user_addresses.findUniqueOrThrow({
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
    const createData: Prisma.user_addressesCreateInput = {
        type: params.type || "",
        phone: params.phone || "",
        lng: params.lng?.toString() || "",
        lat: params.lat?.toString() || "",
        person_name: params.person_name || "",
        floor: params.floor,
        road: params.road,
        house: params.house,
        zones: {
            connect: {
                id: params.zone_id
            }
        },
        users: {
            connect: {
                id: params.user_id
            }
        }
    };
    
    await prisma.user_addresses.create({
        data: createData,
        select: {
            id: true
        }
    });
}

export const updateAddress = async (params: UpdateAddressParamsType) => {
    const data: Prisma.user_addressesUpdateInput = {};

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

    if (params.zone_id) {
        data.zones = {
            connect: {
                id: params.zone_id
            }
        }
    }
    
    try {
        const address = await prisma.user_addresses.update({
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
                        cities: {
                            select: {
                                id: true,
                                name: true,
                                countries: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                }
                            }
                        },
                        zone_pricing: {
                            select: {
                                id: true,
                                price_for_100m: true,
                                currencies: {
                                    select: {
                                        id: true,
                                        code: true,
                                        name: true,
                                        tips: {
                                            select: {
                                                id: true,
                                                value: true,
                                            }
                                        }
                                    }
                                }
                            }
                        }
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
        await prisma.user_addresses.update({
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
            await prisma.user_addresses.updateMany({
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
    
            await prisma.user_addresses.update({
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