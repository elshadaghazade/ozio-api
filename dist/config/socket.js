"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocket = initializeSocket;
const socket_io_1 = require("socket.io");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const redis_1 = require("redis");
const _1 = __importDefault(require("."));
async function initializeSocket(server) {
    const io = new socket_io_1.Server(server, {
        perMessageDeflate: true,
        cors: {
            origin: _1.default.socket.corsOrigin,
            methods: _1.default.socket.methods,
            credentials: _1.default.socket.credentials
        },
    });
    const pubClient = (0, redis_1.createClient)({ url: `redis://${_1.default.redis.host}:${_1.default.redis.port}` });
    const subClient = pubClient.duplicate();
    await Promise.all([pubClient.connect(), subClient.connect()]);
    io.adapter((0, redis_adapter_1.createAdapter)(pubClient, subClient));
    return io;
}
