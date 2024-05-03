// ecosystem.config.js
export const apps = [{
    name: 'app',
    script: 'npm',
    args: 'start',
    instances: 'max', // Run as many instances as possible
    exec_mode: 'cluster', // Run in cluster mode
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
        NODE_ENV: 'production'
    },
    scale: {
        up: {
            instances: 2 // Scale up to 2 instances when CPU usage exceeds 80%
        },
        down: {
            instances: 1 // Scale down to 1 instance when CPU usage is below 60%
        },
        policies: [{
            max: 60, // CPU usage threshold for scaling up
            scale_up: 2
        }, {
            min: 20, // CPU usage threshold for scaling down
            scale_down: 1
        }]
    }
}];
  