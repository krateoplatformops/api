const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const axiosInstance = require('../../axios-conf')

router.get('/', async (req, res, next) => {
  try {
    const secrets = await axiosInstance.get(envConstants.SECRET_URI)

    res.status(200).json(secrets.data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
