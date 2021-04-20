module.exports = {
  apps : [{
    name: 'friend_computer_twitter',
    script: 'index.js',
    cwd: '/path/to/friend_computer_twitter/dist',

    // Options reference: https://doc.pm2.io/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    max_restarts: 3,
    min_uptime: "1m",
    watch: false,
    max_memory_restart: '1G',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    exec_mode: 'fork'
  }],
};
