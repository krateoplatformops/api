const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const axiosInstance = require('../../axios-conf')
const uriHelpers = require('../../helpers/uri.helpers')

router.delete('/:id', async (req, res, next) => {
  try {
    const url = uriHelpers.concatUrl([envConstants.PROXY_URI, req.params.id])

    const proxy = await axiosInstance.delete(url)

    res.status(200).json(proxy.data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
