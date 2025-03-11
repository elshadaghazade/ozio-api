import config from '@/config';
import logger from '@/config/logger';
import { BadRequestException } from '@/exceptions/BadRequestException';
import { createHash } from 'crypto';

interface SendSMSParamsType {
    msisdn: string;
    text: string;
}

const md5 = (input: string): string => {
    return createHash("md5").update(input).digest("hex");
}

export const sendSMS = async (params: SendSMSParamsType) => {

    const password = config.sms.password;
    const login = config.sms.login;
    const msisdn = params.msisdn.replace(/\D+/gi, '');
    const text = params.text;
    const sender = config.sms.sender;

    const passwordMD5 = md5(password);
    const key = md5(passwordMD5 + login + text + msisdn + sender);

    const url = `https://apps.lsim.az/quicksms/v1/send?login=${login}&msisdn=${msisdn}&text=${text}&sender=${sender}&key=${key}&unicode=false`;

    const result = await (await fetch(url)).json() as any;

    logger.info(`${login}, ${password}, ${msisdn}, ${text}, ${sender}, ${key}`);

    if (result?.errorCode) {
        throw new BadRequestException();
    }

    return result;

}