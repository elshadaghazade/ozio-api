import courierHandler from "./sockets/courier";
import orderHandler from "./sockets/order";
import supportHandler from "./sockets/support";
import { initializeSocket } from "./config/socket";
import { Server } from "http";

export default async function setupSocket(server: Server) {
    const io = await initializeSocket(server);

    // namespaces
    const courierNamespace = io.of("/courier");
    const orderNamespace = io.of("/order");
    const supportNamespace = io.of("/support");

    courierNamespace.on("connection", (socket) => courierHandler(socket));
    orderNamespace.on("connection", (socket) => orderHandler(socket));
    supportNamespace.on("connection", (socket) => supportHandler(socket));

    return io;
}