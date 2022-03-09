const express = require('express')
const router = express.Router()
const passport = require('passport')

const { cookieConstants } = require('../../constants')
const jwtHelpers = require('../../helpers/jwt.helpers')

router.get('/', passport.authenticate('microsoft', { scope: ['user.read'] }))

router.get(
  '/callback',
  passport.authenticate('microsoft', {
    failureRedirect: '/login',
    failureMessage: true
  }),
  (req, res) => {
    console.log(req.user)
    // const user = {
    //   id: req.user.id,
    //   username: req.user.username,
    //   provider: 'microsoft',
    //   email: null
    // }
    // try {
    //   user.email = req.user.emails[0].value
    // } catch {}

    // res.cookie(process.env.COOKIE_NAME, jwtHelpers.sign(user), cookieConstants)
    // res.redirect(`${process.env.APP_URI}/dashboard` || '/')
  }
)

module.exports = router
