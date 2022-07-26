const { logger } = require('../helpers/logger.helpers')

module.exports = (req, res, next) => {
  if (res.locals.allowAnonymous) {
    next()
    return
  }

  logger.debug(res.locals.identity)

  if (!res.locals.identity) {
    const err = new Error('Unauthorized')
    err.statusCode = 401
    next(err)
  } else {
    next()
  }
}
