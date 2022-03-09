const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    res.clearCookie(process.env.COOKIE_NAME, { maxAge: 0 })
    res.status(200).send()
  } catch (error) {
    next(error)
    return
  }
})

module.exports = router
