
import dotenv from 'dotenv';

if (process.env.DOTENV_CONFIG_PATH) {
    dotenv.config();
}

export default {
    env: process.env.NODE_ENV || "development",
    port: process.env.NODE_ENV === 'development' ? (process.env.PORT || 3000) : '',
    host: process.env.NODE_ENV === 'development' ? 'http://localhost' : 'https://staging.ozio.az',
    jwt: {
        accessSecret: process.env.JWT_SECRET || "abcd",
        refreshSecret: process.env.REFRESH_TOKEN_SECRET || 'efgh',
        accessTokenExpiresIn: process.env.JWT_EXPIRES_IN || "15m",
        refreshTokenExpiresIn: process.env.REFRESH_EXPIRES_IN || '30d'
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
    sms: {
        login: process.env.SMS_LOGIN || '',
        password: process.env.SMS_PASSWORD || '',
        sender: process.env.SMS_SENDER || ''
    }
};
