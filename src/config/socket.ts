import { Server as SocketServer } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import config from ".";

export async function initializeSocket(server: any) {
    const io = new SocketServer(server, {
        perMessageDeflate: true,
        cors: { 
            origin: config.socket.corsOrigin,
            methods: config.socket.methods,
            credentials: config.socket.credentials
        },
    });

    const pubClient = createClient({ url: `redis://${config.redis.host}:${config.redis.port}` });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);

    io.adapter(createAdapter(pubClient, subClient));

    return io;
}
