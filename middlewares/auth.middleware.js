const { authConstants, envConstants } = require('../constants')

module.exports = async (req, res, next) => {
  authConstants.unsecurePaths.forEach((r) => {
    const base = `/${req.originalUrl.split('/')[1]}/*`
    if (r === req.originalUrl || r === base) {
      res.locals.allowAnonymous = true
    }
  })

  if (res.locals.allowAnonymous === true) {
    next()
    return
  }

  if (!req.signedCookies[envConstants.COOKIE_NAME]) {
    const err = new Error('Unauthorized')
    err.statusCode = 401
    next(err)
  } else {
    next()
  }
}
