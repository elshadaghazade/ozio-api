"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = supportHandler;
function supportHandler(socket) {
    console.log(`Support chat connected: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`Support chat disconnected: ${socket.id}`);
    });
}
