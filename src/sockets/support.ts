import { Socket } from "socket.io";

export default function supportHandler(socket: Socket) {
    console.log(`Support chat connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`Support chat disconnected: ${socket.id}`);
    });
}