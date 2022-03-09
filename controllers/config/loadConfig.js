const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Strategy = mongoose.model('Strategy')
const Logo = mongoose.model('Logo')

router.get('/', async (req, res, next) => {
  try {
    const config = {}

    /* strategies */
    const strategies = await Strategy.find(
      { type: 'strategy', enabled: true },
      '-type -config -enabled'
    ).exec()
    config.strategies = strategies

    /* logos */
    const logos = await Logo.find(
      { type: 'logo', enabled: true },
      '-type'
    ).exec()
    config.logos = logos

    res.status(200).json(config)
  } catch (error) {
    next(error)
  }
})
module.exports = router
