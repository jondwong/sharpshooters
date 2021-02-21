const { createLogger, transports ,format} = require('winston');
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.json(),
    format.timestamp()
),
  transports: [
    // - Write all logs error (and below) to `somefile.log`.
    new transports.File({ filename: '/tmp/sharpshooters.log', level: 'error' })
  ]
});

export const logger;