const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const { logger } = require('../../helpers/logger.helpers')
const axiosInstance = require('../../axios-conf')

router.get('/', async (req, res, next) => {
  try {
    const proxy = await axiosInstance.get(envConstants.PROXY_URI)

    res.status(200).json(proxy.data)
  } catch (error) {
    next(error)
  }
})

router.get('/:base/*', async (req, res, next) => {
  try {
    let url = new URL(`${envConstants.PROXY_URI}${req.path}`)
    Object.keys(req.query).forEach((key) =>
      url.searchParams.append(key, req.query[key])
    )

    logger.debug(`Proxy GET ${url.toString()}`)

    const proxy = await axiosInstance.get(url.toString())

    res.status(200).json(proxy.data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
