const Config = {
	mongodb: {
		url: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/ERP',
	},
	server: {
		port: process.env.PORT || 8000,
		logLevel: process.env.LOG_LEVEL || 'all',
		alertLogLevel: process.env.ALERT_LOG_LEVEL || 'error',
		webhookUrl: process.env.WEBHOOK_URL,
		env: process.env.NODE_ENV,
		private: process.env.PRIVATE || 'thisissecret'
	},
};
export default Config;
