const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const { logger } = require('../../helpers/logger.helpers')
const axiosInstance = require('../../axios-conf')
const uriHelpers = require('../../helpers/uri.helpers')
const axios = require('axios')

router.get('/', async (req, res, next) => {
  try {
    let url = new URL(envConstants.LOG_URI)
    Object.keys(req.query).forEach((key) =>
      url.searchParams.append(key, req.query[key])
    )

    logger.debug(`Log GET ${url.toString()}`)

    const templates = await axiosInstance.get(url.toString())

    res.status(200).json(templates.data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
