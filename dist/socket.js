"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setupSocket;
const courier_1 = __importDefault(require("./sockets/courier"));
const order_1 = __importDefault(require("./sockets/order"));
const support_1 = __importDefault(require("./sockets/support"));
const socket_1 = require("./config/socket");
async function setupSocket(server) {
    const io = await (0, socket_1.initializeSocket)(server);
    const courierNamespace = io.of("/courier");
    const orderNamespace = io.of("/order");
    const supportNamespace = io.of("/support");
    courierNamespace.on("connection", (socket) => (0, courier_1.default)(socket));
    orderNamespace.on("connection", (socket) => (0, order_1.default)(socket));
    supportNamespace.on("connection", (socket) => (0, support_1.default)(socket));
    return io;
}
