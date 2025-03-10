import { UnauthorizedException } from '@/exceptions/UnauthorizedException';
import { createAddress, deleteAddress, getAddress, getAddresses, setAsDefaultAddress, updateAddress } from '@/services/profile.service/address';
import { RequestWithUser } from '@/types/Http';
import { ApiResponse } from '@/utils/apiResponse';
import { Response, NextFunction } from 'express';

export const getAddressesController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) {
            throw new UnauthorizedException();
        }

        const addresses = await getAddresses({
            user_id: user.id
        });

        res.json(ApiResponse.success(addresses));
    } catch (err) {
        next(err);
    }
}

export const getAddressController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const { addressId } = req.params;

        const user = req.user;
        if (!user || !addressId) {
            throw new UnauthorizedException();
        }
            
        const address = await getAddress({
            addressId,
            user_id: user.id
        });

        res.json(ApiResponse.success(address));
    } catch (err) {
        next(err);
    }
}

export const createAddressController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        if (!user) {
            throw new UnauthorizedException();
        }

        const result = await createAddress({
            ...req.body,
            user_id: user.id
        });

        res.json(ApiResponse.success(result));
    } catch (err) {
        next(err);
    }
}

export const updateAddressController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const { addressId } = req.params;

        const user = req.user;
        if (!user || !addressId) {
            throw new UnauthorizedException();
        }

        const result = await updateAddress({
            ...req.body,
            user_id: user.id,
            addressId
        });

        res.json(ApiResponse.success(result));
    } catch (err) {
        next(err);
    }
}

export const deleteAddressController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const { addressId } = req.params;

        const user = req.user;
        if (!user || !addressId) {
            throw new UnauthorizedException();
        }

        await deleteAddress({
            user_id: user.id,
            addressId
        });

        res.json(ApiResponse.success(undefined));
    } catch (err) {
        next(err);
    }
}

export const setAsDefaultAddressController = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {

        const user = req.user;
        const addressId: number = req.body.addressId;

        if (!user || !addressId) {
            throw new UnauthorizedException();
        }

        await setAsDefaultAddress({
            user_id: user.id,
            addressId
        });

        res.json(ApiResponse.success(undefined));
    } catch (err) {
        next(err);
    }
}