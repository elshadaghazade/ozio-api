import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/v1";
import logger from "./config/logger";
import { setupSwagger } from "./config/swagger";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));


app.use("/api/v1", routes);


app.get("/", (_, res) => {
    res.json({ message: "API is running!" });
});

app.use((err: any, _: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack);
    if (err.headersSent) {
        return next(err);
    }

    res.status(500).json({ message: "Internal Server Error" });
});

setupSwagger(app);

export default app;