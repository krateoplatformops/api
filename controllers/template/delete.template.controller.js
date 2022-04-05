const axios = require('axios')
const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const uriHelpers = require('../../helpers/uri.helpers')

router.delete('/:id', async (req, res, next) => {
  try {
    const url = uriHelpers.concatUrl([
      envConstants.DATASTORE_URI,
      '/template',
      req.params.id
    ])

    const templates = await axios.delete(url)
    res.status(200).json(templates.data)
  } catch (error) {
    next(error)
  }
})
module.exports = router