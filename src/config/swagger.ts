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
    },
    apis: [
        "src/controllers/**/swaggerdoc.ts",
        "src/controllers/**/*.ts"
    ],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`📄 Swagger docs available at http://localhost:${config.port}/api-docs`);
}
