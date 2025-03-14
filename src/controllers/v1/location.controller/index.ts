import { BadRequestException } from '@/exceptions/BadRequestException';
import { getCities } from '@/services/location.service/cities';
import { getCountries } from '@/services/location.service/countries';
import { getZones } from '@/services/location.service/zones';
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


export const getZonesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { city_id } = req.query;

        const cid = Number(city_id);

        if (!city_id || !cid || isNaN(cid)) {
            throw new BadRequestException();
        }

        const zones = await getZones(Number(city_id));

        res.json(ApiResponse.success(zones));

    } catch (err) {
        next(err);
    }
}