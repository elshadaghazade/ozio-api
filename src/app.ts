import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "@/routes/v1";
import logger from "@/config/logger";
import { setupSwagger } from "@/config/swagger";
import { getGlobalRateLimit } from "@/middleware/rateLimitHandler";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));

app.use("/api/v1", getGlobalRateLimit({
    limit: 1,
    windowMs: 500
}), routes);


app.get("/", (_, res) => {
    res.json({ message: "API is running!" });
});

setupSwagger(app);

export default app;