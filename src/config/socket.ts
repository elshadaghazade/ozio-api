import { Server as SocketServer } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import config from ".";
import { pubClient, subClient } from "./redis";

export async function initializeSocket(server: any) {
    const io = new SocketServer(server, {
        perMessageDeflate: true,
        cors: { 
            origin: config.socket.corsOrigin,
            methods: config.socket.methods,
            credentials: config.socket.credentials
        },
    });

    await Promise.all([pubClient.connect(), subClient.connect()]);

    io.adapter(createAdapter(pubClient, subClient));

    return io;
}
