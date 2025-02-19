"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = orderHandler;
function orderHandler(socket) {
    console.log(`Order connected: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`Order disconnected: ${socket.id}`);
    });
}
