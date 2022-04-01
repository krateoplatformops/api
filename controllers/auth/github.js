const express = require('express')
const router = express.Router()
const passport = require('passport')

const { cookieConstants, envConstants } = require('../../constants')
const jwtHelpers = require('../../helpers/jwt.helpers')

router.get('/', passport.authenticate('github', { scope: ['user:email'] }))

router.get(
  '/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    failureMessage: true
  }),
  (req, res) => {
    const user = {
      id: req.user.id,
      username: req.user.username,
      provider: 'github',
      email: null
    }
    try {
      user.email = req.user.emails[0].value
    } catch {}

    res.cookie(envConstants.COOKIE_NAME, jwtHelpers.sign(user), cookieConstants)
    res.redirect(`${envConstants.APP_URI}/dashboard` || '/')
  }
)

module.exports = router
