import express from "express";
import { createServer } from "http";
import setupSocket from "@/socket";
import logger from "@/config/logger";
import app from '@/app';
import { errorHandler } from "@/middleware/errorHandler";

(BigInt.prototype as any).toJSON = function () {
    return Number(this);
};

const server = createServer(app);

app.use(express.json());
app.use(errorHandler);

setupSocket(server).then(() => {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });
});