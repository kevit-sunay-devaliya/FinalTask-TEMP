"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const winston_channel_logger_1 = require("@kevit/winston-channel-logger");
const winston_1 = require("winston");
const winstonChannelLogger = new winston_channel_logger_1.WinstonChannelLogger({
    format: winston_1.format.uncolorize(),
    level: 'warn',
    platforms: [
        {
            webhookUrl: process.env.WEBHOOK_URL,
            token: null,
            platformName: 'ms-teams',
            channelId: null,
        },
    ],
});
const logger = (0, winston_1.createLogger)({
    transports: [
        new winston_1.transports.Console({ level: 'silly' }),
        winstonChannelLogger,
    ],
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.colorize(), winston_1.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
    })),
});
exports.log = logger;
//# sourceMappingURL=winston-logger.js.map