import { WinstonChannelLogger } from '@kevit/winston-channel-logger';
import { createLogger, transports, format } from 'winston';

const winstonChannelLogger = new WinstonChannelLogger({
	format: format.uncolorize(),
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

const logger = createLogger({
	transports: [
		new transports.Console({ level: 'silly' }),
		winstonChannelLogger,
	],
	format: format.combine(
		format.timestamp(),
		format.colorize(),
		format.printf(({ timestamp, level, message }) => {
			return `[${timestamp}] ${level}: ${message}`;
		}),
	),
});

export const log = logger;
