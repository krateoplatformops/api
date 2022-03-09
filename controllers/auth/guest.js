const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Strategy = mongoose.model('Strategy')

const { cookieConstants } = require('../../constants')
const jwtHelpers = require('../../helpers/jwt.helpers')

router.get('/', async (req, res, next) => {
  try {
    Strategy.find(
      { type: 'strategy', enabled: true, provider: 'guest' },
      '-type -config -enabled'
    ).exec((error, doc) => {
      if (error) {
        next(error)
      } else {
        if (doc.length > 0) {
          const user = {
            id: 'guest',
            username: 'guest',
            provider: 'guest',
            email: null
          }

          res.cookie(
            process.env.COOKIE_NAME,
            jwtHelpers.sign(user),
            cookieConstants
          )
          res.redirect(`${process.env.APP_URI}/dashboard` || '/')
        } else {
          res.status(401).send()
        }
      }
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
