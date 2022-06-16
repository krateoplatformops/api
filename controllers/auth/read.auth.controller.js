const express = require('express')
const router = express.Router()
const passport = require('passport')

const { cookieConstants, envConstants } = require('../../constants')
const jwtHelpers = require('../../helpers/jwt.helpers')
const uriHelpers = require('../../helpers/uri.helpers')

router.get('/guest', async (req, res, next) => {
  try {
    if (res.locals.provider.strategy === 'guest') {
      const user = {
        id: 'guest',
        username: 'guest',
        provider: 'guest',
        email: 'guest@krateo.io'
      }

      const redirect = uriHelpers.concatUrl([res.locals.redirect, 'dashboard'])

      res.cookie(
        envConstants.COOKIE_NAME,
        jwtHelpers.sign(user),
        cookieConstants
      )
      res.redirect(redirect || '/')
    } else {
      res.status(401).send()
    }
  } catch (err) {
    next(err)
  }
})

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
)

router.get(
  '/github/callback',
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

    const redirect = uriHelpers.concatUrl([res.locals.redirect, 'dashboard'])

    res.cookie(envConstants.COOKIE_NAME, jwtHelpers.sign(user), cookieConstants)
    res.redirect(redirect || '/')
  }
)

router.get(
  '/microsoft',
  passport.authenticate('microsoft', { scope: ['user.read'] })
)

router.get(
  '/microsoft/callback',
  passport.authenticate('microsoft', {
    failureRedirect: '/login',
    failureMessage: true
  }),
  (req, res) => {
    console.log(req.user)
    const user = {
      id: req.user.id,
      username: req.user.username,
      provider: 'microsoft',
      email: null
    }
    try {
      user.email = req.user.emails[0].value
    } catch {}

    const redirect = uriHelpers.concatUrl([res.locals.redirect, 'dashboard'])

    res.cookie(process.env.COOKIE_NAME, jwtHelpers.sign(user), cookieConstants)
    res.redirect(redirect || '/')
  }
)

router.get('/logout', async (req, res, next) => {
  try {
    res.clearCookie(envConstants.COOKIE_NAME, { ...cookieConstants })
    res.status(200).send()
  } catch (error) {
    next(error)
    return
  }
})

module.exports = router
