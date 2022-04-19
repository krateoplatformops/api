module.exports = {
  PORT: process.env.PORT || 8080,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'krateo-platformops',
  COOKIE_NAME: process.env.COOKIE_NAME || 'krateo-platformops',
  NATS_URI: process.env.NATS_URI,
  APP_URI: process.env.APP_URI,
  DATASTORE_URI: process.env.DATASTORE_URI,
  DEPLOYMENT_URI: process.env.DEPLOYMENT_URI,
  TEMPLATE_URI: process.env.TEMPLATE_URI,
  HOST_URI: process.env.HOST_URI
}
