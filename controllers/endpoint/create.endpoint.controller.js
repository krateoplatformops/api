const express = require('express')
const router = express.Router()

const { envConstants } = require('../../constants')
const axiosInstance = require('../../axios-conf')

router.post('/', async (req, res, next) => {
  try {
    const endpoint = await axiosInstance.post(
      envConstants.ENDPOINT_URI,
      req.body
    )

    res.status(200).json(endpoint.data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
