const { logger } = require('../helpers/logger.helpers')

const jwtHelpers = require('../helpers/jwt.helpers')

module.exports = (req, res, next) => {
  if (res.locals.allowAnonymous) {
    next()
    return
  }

  try {
    const cookieValue = req.signedCookies[process.env.COOKIE_NAME]
    const identity = jwtHelpers.verify(cookieValue)

    res.locals.identity = identity
    logger.debug('Identity from cookie')
  } catch {}

  next()
}
