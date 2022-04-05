const axios = require('axios')
const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const uriHelpers = require('../../helpers/uri.helpers')

router.get('/', async (req, res, next) => {
  try {
    const url = uriHelpers.concatUrl([envConstants.DATASTORE_URI, '/template'])

    const templates = await axios.get(url)
    res.status(200).json(templates.data)
  } catch (error) {
    next(error)
  }
})
module.exports = router
