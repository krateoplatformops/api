const express = require('express')
const router = express.Router()

const { envConstants } = require('../../constants')
const axiosInstance = require('../../axios-conf')

router.post('/', async (req, res, next) => {
  try {
    const host = await axiosInstance.post(envConstants.HOST_URI, req.body)

    res.status(200).json(host.data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
