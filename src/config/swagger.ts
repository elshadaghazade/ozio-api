import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Online Market API",
            version: "1.0.0",
            description: "REST API documentation for Online Market",
        },
        servers: [{ url: "http://localhost:3000" }],
    },
    apis: ["src/controllers/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("📄 Swagger docs available at http://localhost:3000/api-docs");
}
