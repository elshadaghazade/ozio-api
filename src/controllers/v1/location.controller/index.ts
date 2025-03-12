import { BadRequestException } from '@/exceptions/BadRequestException';
import { getCities } from '@/services/location.service/cities';
import { getCountries } from '@/services/location.service/countries';
import { ApiResponse } from '@/utils/apiResponse';
import { Request, Response, NextFunction } from 'express';

export const getCitiesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { country_id } = req.query;

        const cid = Number(country_id);

        if (!country_id || !cid || isNaN(cid)) {
            throw new BadRequestException();
        }

        const cities = await getCities(Number(country_id));

        res.json(ApiResponse.success(cities));

    } catch (err) {
        next(err);
    }
}


export const getCountriesController = async (_: Request, res: Response, next: NextFunction) => {
    try {
        const countries = await getCountries();

        res.json(ApiResponse.success(countries));

    } catch (err) {
        next(err);
    }
}
