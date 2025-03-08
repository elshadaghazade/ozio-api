import { HttpException } from "@/exceptions/HttpException";

export class ForbiddenException extends HttpException {
    constructor(message = "Forbidden access", details?: any) {
        super(message, 403, details);
    }
}
