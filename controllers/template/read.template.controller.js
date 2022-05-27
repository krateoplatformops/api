const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const axiosInstance = require('../../axios-conf')
const uriHelpers = require('../../helpers/uri.helpers')

router.get('/', async (req, res, next) => {
  try {
    const templates = await axiosInstance.get(envConstants.TEMPLATE_URI)

    res.status(200).json(templates.data)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/refresh', async (req, res, next) => {
  try {
    const templates = await axiosInstance.get(
      uriHelpers.concatUrl([
        envConstants.TEMPLATE_URI,
        req.params.id,
        'refresh'
      ])
    )

    res.status(200).json(templates.data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
