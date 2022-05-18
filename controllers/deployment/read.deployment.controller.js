const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const axiosInstance = require('../../axios-conf')
const uriHelpers = require('../../helpers/uri.helpers')

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

module.exports = router
