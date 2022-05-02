const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const axiosInstance = require('../../axios-conf')

router.get('/', async (req, res, next) => {
  try {
    const endpoints = await axiosInstance.get(envConstants.ENDPOINT_URI)

    res.status(200).json(endpoints.data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
