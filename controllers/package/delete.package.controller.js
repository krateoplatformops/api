const axios = require('axios')
const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')

router.delete('/', async (req, res, next) => {
  try {
    axios
      .delete(envConstants.PROVIDER_URI, {
        data: req.body
      })
      .then((result) => {
        res.status(200).json(result.data)
      })
      .catch((err) => {
        res.status(500).json({ message: err.message })
      })
  } catch (error) {
    next(error)
  }
})

module.exports = router
