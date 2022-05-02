module.exports = {
  PORT: process.env.PORT || 8080,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'krateo-platformops',
  COOKIE_NAME: process.env.COOKIE_NAME || 'krateo-platformops',
  APP_URI: process.env.APP_URI,
  DATASTORE_URI: process.env.DATASTORE_URI,
  DEPLOYMENT_URI: process.env.DEPLOYMENT_URI,
  TEMPLATE_URI: process.env.TEMPLATE_URI,
  ENDPOINT_URI: process.env.ENDPOINT_URI
}
