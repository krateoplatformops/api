const express = require('express')
const router = express.Router()

// const { cookieConstants } = require('../../constants')
// const jwtHelpers = require('../../helpers/jwt.helpers')

router.get('/', async (req, res, next) => {
  try {
    res.status(200).send({
      ...res.locals.identity
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
