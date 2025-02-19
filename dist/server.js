"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_1 = __importDefault(require("./socket"));
const v1_1 = __importDefault(require("./routes/v1"));
const logger_1 = __importDefault(require("./config/logger"));
const app_1 = __importDefault(require("./app"));
const server = (0, http_1.createServer)(app_1.default);
app_1.default.use(express_1.default.json());
app_1.default.use("/api/v1", v1_1.default);
(0, socket_1.default)(server).then(() => {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        logger_1.default.info(`Server running on port ${PORT}`);
    });
});
