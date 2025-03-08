import { HttpException } from "@/exceptions/HttpException";

export class UnauthorizedException extends HttpException {
    constructor(message = "Unauthorized access", details?: any) {
        super(message, 401, details);
    }
}
