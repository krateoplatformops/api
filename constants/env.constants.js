module.exports = {
  PORT: process.env.PORT || 8080,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'krateo-platformops',
  COOKIE_NAME: process.env.COOKIE_NAME || 'krateo-platformops',
  APP_URI: process.env.APP_URI,
  AUTH_URI: process.env.AUTH_URI,
  DEPLOYMENT_URI: process.env.DEPLOYMENT_URI,
  TEMPLATE_URI: process.env.TEMPLATE_URI,
  ENDPOINT_URI: process.env.ENDPOINT_URI,
  LOG_URI: process.env.LOG_URI
}
