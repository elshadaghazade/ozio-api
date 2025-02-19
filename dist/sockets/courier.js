"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = courierHandler;
function courierHandler(socket) {
    console.log(`Courier connected: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`Courier disconnected: ${socket.id}`);
    });
}
