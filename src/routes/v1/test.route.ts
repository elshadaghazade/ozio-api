import { BadRequestException } from '@/exceptions/BadRequestException';
import { sendSMS } from '@/services/sms.service';
import { ApiResponse } from '@/utils/apiResponse';
import express, { Request, Response, NextFunction} from 'express';

const router = express.Router();


router.get('/send', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { text, msisdn } = req.query;

        if (!text?.length || !msisdn?.length) {
            throw new BadRequestException();
        }

        const result = await sendSMS({
            text: text.toString(),
            msisdn: msisdn.toString()
        });

        res.json(ApiResponse.success(result));
    } catch (err) {
        next(err);
    }
});

export default router;