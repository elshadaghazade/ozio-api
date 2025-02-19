import { Socket } from "socket.io";

export default function courierHandler(socket: Socket) {
    console.log(`Courier connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`Courier disconnected: ${socket.id}`);
    });
}