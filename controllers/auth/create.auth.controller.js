const express = require('express')
const router = express.Router()
const passport = require('passport')

const { cookieConstants, envConstants } = require('../../constants')
const { logger } = require('../../helpers/logger.helpers')
const jwtHelpers = require('../../helpers/jwt.helpers')

router.post(
  '/ldap',
  passport.authenticate('ldapauth', { session: false }),
  (req, res) => {
    const user = {
      id: res.req.user.uid,
      username: res.req.user.displayName,
      provider: 'ldap',
      email: res.req.user.displayName
    }
    try {
      user.email = Array.isArray(res.req.user.mail)
        ? res.req.user.mail[0]
        : res.req.user.mail
    } catch {}

    logger.info(JSON.stringify(user, null, 2))

    res.cookie(envConstants.COOKIE_NAME, jwtHelpers.sign(user), cookieConstants)
    res.status(200).send(user)
  }
)

module.exports = router
