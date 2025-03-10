

export default {
    env: process.env.NODE_ENV || "development",
    port: process.env.NODE_ENV === 'development' ? (process.env.PORT || 3000) : '',
    host: process.env.NODE_ENV === 'development' ? 'localhost' : 'staging.ozio.az',
    jwt: {
        secret: process.env.JWT_SECRET || "your_secret_key",
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    },
    redis: {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: Number(process.env.REDIS_PORT) || 6379,
    },
    socket: {
        corsOrigin: process.env.SOCKET_CORS_ORIGIN || "*",
        methods: ['GET', 'POST'],
        credentials: true
    },
};
