import express from "express";
import { createServer } from "http";
import setupSocket from "@/socket";
import routesV1 from "@/routes/v1";
import logger from "@/config/logger";
import app from '@/app';
import { errorHandler } from "@/middleware/errorHandler";

const server = createServer(app);

app.use(express.json());
app.use("/api/v1", routesV1);

app.use(errorHandler);

setupSocket(server).then(() => {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });
});