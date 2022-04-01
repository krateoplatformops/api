const express = require('express')
const envConstants = require('../../constants/env.constants')
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    res.clearCookie(envConstants.COOKIE_NAME, { maxAge: 0 })
    res.status(200).send()
  } catch (error) {
    next(error)
    return
  }
})

module.exports = router
