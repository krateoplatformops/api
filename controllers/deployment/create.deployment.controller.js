const express = require('express')
const router = express.Router()

const { envConstants } = require('../../constants')
const axiosInstance = require('../../axios-conf')
const deploymentHelper = require('../../helpers/deployment.helpers')

router.post('/', async (req, res, next) => {
  try {
    const deployment = await axiosInstance.post(
      envConstants.DEPLOYMENT_URI,
      req.body
    )

    res.status(200).json(deployment.data)
  } catch (error) {
    next(error)
  }
})

router.post('/:id/plugins/:plugin/:name', async (req, res, next) => {
  deploymentHelper.pluginReader(req, res, next)
})

module.exports = router
