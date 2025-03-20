import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routesV1 from "@/routes/v1";
import { routeCacheMiddleware } from "@/middleware/routeCacheHandler";
import logger from "@/config/logger";
import { setupSwagger } from "@/config/swagger";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));


app.use("/api/v1", routeCacheMiddleware({ prefix: 'routecachemiddleware', ttl: 30, methods: 'GET' }), routesV1);


app.get("/", (_, res) => {
    res.json({ message: "API is running!" });
});

setupSwagger(app);

export default app;