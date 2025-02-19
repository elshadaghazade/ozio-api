import { Socket } from "socket.io";

export default function orderHandler(socket: Socket) {
    console.log(`Order connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`Order disconnected: ${socket.id}`);
    });
}