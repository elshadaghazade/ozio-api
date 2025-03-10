import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import config from ".";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Online Market API",
            version: "1.0.0",
            description: "REST API documentation for Online Market",
        },
        servers: [{ url: `http://localhost:${config.port}` }],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                LoginRequest: {
                    type: "object",
                    required: ["phone"],
                    properties: {
                        phone: { type: "string", example: "+9941234567890" },
                    }
                },
                OtpVerifyRequest: {
                    type: "object",
                    required: ["otp", "phone"],
                    properties: {
                        otp: { type: "string", example: "123456" },
                        phone: { type: "string", example: "+9941234567890" },
                    }
                },
                JwtTokensResponse: {
                    type: "object",
                    properties: {
                        success: { type : "boolean", example: true },
                        message: { type: "string", example: "OK"},
                        statusCode: { type: "integer", example: 200 },
                        data: {
                            type: "object",
                            properties: {
                                accessToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5c..." },
                                refreshToken: { type: "string", example: "dGhpcyBpcyBhbiBleGFtcGxlIHJlZnJlc2g..." },
                                registerRequired: { type: "string", example: true }
                            }
                        }
                    }
                },
                SuccessResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "OTP code was sent to your phone number" },
                        data: { type: "object", nullable: true }
                    }
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", example: "Error message here" },
                        errorCode: { type: "string", example: "AUTH_FAILED" }
                    }
                }
            }
        }
    },
    apis: [
        "src/controllers/**/swaggerdoc.ts",
        "src/controllers/**/*.ts",
        "src/routes/**/*.ts"
    ],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
    app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`📄 Swagger docs available at http://localhost:${config.port}/v1/api-docs`);
}
