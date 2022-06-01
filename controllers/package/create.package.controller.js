const axios = require('axios')
const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')

router.post('/', async (req, res, next) => {
  try {
    const pkgs = await axios.post(envConstants.PROVIDER_URI, { ...req.body })

    res.status(200).json(pkgs.data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
