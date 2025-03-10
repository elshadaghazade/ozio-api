export class ApiResponse<T> {
    success: boolean;
    message: string | string[];
    data?: T;
    statusCode: number;

    constructor(success: boolean, message: string | string[], statusCode: number, data?: T) {
        this.success = success;
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }

    static success<T>(data: T, statusCode?: number, message?: string): ApiResponse<T> {
        return new ApiResponse<T>(true, message || 'OK', statusCode || 200, data);
    }

    static error(message: string | string[], statusCode = 400): ApiResponse<null> {
        return new ApiResponse<null>(false, message, statusCode);
    }
}