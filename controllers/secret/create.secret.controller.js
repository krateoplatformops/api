const express = require('express')
const router = express.Router()

const { envConstants } = require('../../constants')
const axiosInstance = require('../../axios-conf')

router.post('/', async (req, res, next) => {
  try {
    const secret = await axiosInstance.post(envConstants.SECRET_URI, req.body)

    res.status(200).json(secret.data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
