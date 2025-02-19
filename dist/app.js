"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const v1_1 = __importDefault(require("./routes/v1"));
const logger_1 = __importDefault(require("./config/logger"));
const swagger_1 = require("./config/swagger");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("combined", { stream: { write: (message) => logger_1.default.info(message.trim()) } }));
app.use("/api/v1", v1_1.default);
app.get("/", (_, res) => {
    res.json({ message: "API is running!" });
});
app.use((err, _, res, next) => {
    logger_1.default.error(err.stack);
    if (err.headersSent) {
        return next(err);
    }
    res.status(500).json({ message: "Internal Server Error" });
});
(0, swagger_1.setupSwagger)(app);
exports.default = app;
