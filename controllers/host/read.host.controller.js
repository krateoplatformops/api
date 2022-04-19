const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const axiosInstance = require('../../axios-conf')

router.get('/', async (req, res, next) => {
  try {
    const hosts = await axiosInstance.get(envConstants.HOST_URI)

    res.status(200).json(hosts.data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
