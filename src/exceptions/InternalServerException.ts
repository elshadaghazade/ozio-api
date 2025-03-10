import { HttpException } from "@/exceptions/HttpException";

export class InternalServerException extends HttpException {
    constructor(details?: any) {
        super(`Interval server error`, 500, details);
    }
}
