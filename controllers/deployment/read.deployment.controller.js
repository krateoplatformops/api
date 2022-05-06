const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const axiosInstance = require('../../axios-conf')
const uriHelpers = require('../../helpers/uri.helpers')
const { logger } = require('../../helpers/logger.helpers')

router.get('/', async (req, res, next) => {
  try {
    const deployments = await axiosInstance.get(envConstants.DEPLOYMENT_URI)

    res.status(200).json(deployments.data)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const deployments = await axiosInstance.get(
      uriHelpers.concatUrl([envConstants.DEPLOYMENT_URI, req.params.id])
    )

    res.status(200).json(deployments.data)
  } catch (error) {
    next(error)
  }
})

router.get('/:id/plugins/:plugin/:name', async (req, res, next) => {
  try {
    const url = new URL(
      uriHelpers.concatUrl([
        envConstants.DEPLOYMENT_URI,
        req.params.id,
        'plugins',
        req.params.plugin,
        req.params.name
      ])
    )
    Object.keys(req.query).forEach((key) =>
      url.searchParams.append(key, req.query[key])
    )
    logger.debug(`GET ${url.toString()}`)

    const deployment = await axiosInstance.get(url.toString())
    res.status(200).json(deployment.data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
