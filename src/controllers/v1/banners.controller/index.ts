import { ApiResponse } from '@/utils/apiResponse';
import { Request, Response } from 'express';
// import { ApiResponse } from '@/utils/apiResponse';

export const getBannersController = async (_: Request, res: Response) => {

    const data = {
        "banners": [
            {
                "banner_ids": 1,
                "image_url": "https://example.com/banner1.jpg",
                "redirect_url": "https://example.com/campaign1"
            },
        ],
    }

    const response = ApiResponse.success(data);

    res.json(response);
}