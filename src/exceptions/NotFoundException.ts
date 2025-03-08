import { HttpException } from "@/exceptions/HttpException";

export class NotFoundException extends HttpException {
    constructor(resource: string, details?: any) {
        super(`${resource} not found`, 404, details);
    }
}
