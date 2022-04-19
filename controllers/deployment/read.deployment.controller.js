const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const axiosInstance = require('../../axios-conf')

router.get('/', async (req, res, next) => {
  try {
    const deployments = await axiosInstance.get(envConstants.DEPLOYMENT_URI)

    res.status(200).json(deployments.data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
