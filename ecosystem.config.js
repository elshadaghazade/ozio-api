module.exports = {
    apps: [
        {
            name: "online-market-backend",
            script: "dist/server.js",
            instances: "3",
            exec_mode: "cluster",
            watch: false,
            max_memory_restart: "500M",
            log_date_format: "",
            error_file: "./logs/error.log",
            out_file: "./logs/output.log",
            combine_logs: true,
            max_size: "100M",
            autorestart: true,
        },
    ],
};