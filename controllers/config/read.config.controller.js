const axios = require('axios')
const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const uriHelpers = require('../../helpers/uri.helpers')

router.get('/', async (req, res, next) => {
  try {
    const url = uriHelpers.concatUrl([
      envConstants.AUTH_URI,
      '/provider?enabled=true'
    ])

    const providers = await axios.get(url)
    res.status(200).json({ providers: providers.data })
  } catch (error) {
    next(error)
  }
})

module.exports = router
