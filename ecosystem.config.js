module.exports = {
    apps: [
        {
            name: "ozio-backend",
            script: "dist/server.js",
            instances: "max",
            exec_mode: "cluster",
            watch: false,
            max_memory_restart: "500M",
            log_date_format: "YYYY-MM-DD HH:mm:ss",
            error_file: "./logs/error.log",
            out_file: "./logs/output.log",
            combine_logs: true,
            max_size: "100M",
            autorestart: true,
            env: {
                NODE_ENV: "production",
                DOTENV_CONFIG_PATH: ".env"
            }
        },
    ],
};