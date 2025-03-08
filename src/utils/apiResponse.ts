export class ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    statusCode: number;

    constructor(success: boolean, message: string, statusCode: number, data?: T) {
        this.success = success;
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }

    static success<T>(message: string, data: T, statusCode = 200): ApiResponse<T> {
        return new ApiResponse<T>(true, message, statusCode, data);
    }

    static error(message: string, statusCode = 400): ApiResponse<null> {
        return new ApiResponse<null>(false, message, statusCode);
    }
}