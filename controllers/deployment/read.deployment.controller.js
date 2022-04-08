const axios = require('axios')
const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const uriHelpers = require('../../helpers/uri.helpers')

router.get('/', async (req, res, next) => {
  try {
    const url = uriHelpers.concatUrl([
      envConstants.DATASTORE_URI,
      '/deployment'
    ])

    const deployments = await axios.get(url)
    res.status(200).json(deployments.data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
