const axiosInstance = require('../axios-conf')
const { logger } = require('../helpers/logger.helpers')

module.exports = (req, res, next) => {
  let payload = {
    Accepted: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0'
  }

  logger.debug(JSON.stringify(res.locals.identity))

  if (res.locals.identity) {
    payload = { ...payload, identity: JSON.stringify(res.locals.identity) }
  }

  axiosInstance.defaults.headers = payload
  next()
}
