const axios = require('axios')
const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const uriHelpers = require('../../helpers/uri.helpers')

router.get('/', async (req, res, next) => {
  try {
    const url = uriHelpers.concatUrl([envConstants.KUBERNETES_URI, 'packages'])

    const pkgs = await axios.get(url)
    res.status(200).json(pkgs.data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
