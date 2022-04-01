const express = require('express')
const router = express.Router()

const { cookieConstants, envConstants } = require('../../constants')
const jwtHelpers = require('../../helpers/jwt.helpers')

router.get('/', async (req, res, next) => {
  try {
    // Strategy.find(
    //   { type: 'strategy', enabled: true, provider: 'guest' },
    //   '-type -config -enabled'
    // ).exec((error, doc) => {
    //   if (error) {
    //     next(error)
    //   } else {
    //     if (doc.length > 0) {
    if (res.locals.provider.strategy === 'guest') {
      const user = {
        id: 'guest',
        username: 'guest',
        provider: 'guest',
        email: 'guest@krateo.io'
      }
      res.cookie(
        envConstants.COOKIE_NAME,
        jwtHelpers.sign(user),
        cookieConstants
      )
      res.redirect(`${process.env.APP_URI}/dashboard` || '/')
    } else {
      res.status(401).send()
    }
    //   }
    // })
  } catch (err) {
    next(err)
  }
})

module.exports = router
