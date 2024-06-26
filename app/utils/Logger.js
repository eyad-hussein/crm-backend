const winston = require("winston");

let alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.label({
    label: "[LOGGER]",
  }),
  winston.format.timestamp({
    format: "YY-MM-DD HH:mm:ss",
  }),
  winston.format.printf((info) => {
    const { timestamp, label, level, message, ...meta } = info;
    const metaString = Object.keys(meta).length
      ? ` ${JSON.stringify(meta, null, 2)}` // Format JSON with indentation
      : "";
    return ` ${label}  ${timestamp}  ${level} : ${message}${metaString}`;
  })
);

const logger = winston.createLogger({
  level: "debug",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        alignColorsAndTime
      ),
    }),
  ],
});

module.exports = logger;
