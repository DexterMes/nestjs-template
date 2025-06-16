import { createLogger, format, transports } from "winston"

const { combine, timestamp, printf } = format

const logFormat = printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level}]: ${message}`
})

// Create a logger instance
const logger = createLogger({
  level: "info", // Set the log level
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new transports.File({
      filename: "error.log", // Name of the log file
      level: "error",
      dirname: "/logs/error.log", // Directory where log files will be stored
      maxsize: 5242880, // Max file size (5MB in bytes)
      maxFiles: 5 // Max number of log files to keep
    })
  ]
})

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(format.colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat)
    })
  )
}

export { logger }
