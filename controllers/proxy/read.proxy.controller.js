const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const { logger } = require('../../helpers/logger.helpers')
const axiosInstance = require('../../axios-conf')
const uriHelpers = require('../../helpers/uri.helpers')
const axios = require('axios')

router.get('/', async (req, res, next) => {
  try {
    // const proxy = await axiosInstance.get(envConstants.PROXY_URI)

    // res.status(200).json(proxy.data)
    res.status(500).json({ message: 'not implemented' })
  } catch (error) {
    next(error)
  }
})

router.get('/:name/*', async (req, res, next) => {
  try {
    const endpointUrl = uriHelpers.concatUrl([
      envConstants.ENDPOINT_URI,
      req.params.name
    ])
    const endpoint = (await axiosInstance.get(endpointUrl)).data

    const params = req.path.replace(`/${req.params.name}`, '')
    let url = new URL(uriHelpers.concatUrl([endpoint.target, params]))
    Object.keys(req.query).forEach((key) =>
      url.searchParams.append(key, req.query[key])
    )

    logger.debug(`Proxy GET ${url.toString()}`)

    axios
      .get(url.toString(), {
        headers: {
          // FIXME: get headers dynamically from endpoint
        }
      })
      .then((response) => {
        res.status(response.status).json(response.data)
      })
      .catch((error) => {
        logger.error(`Proxy GET ${url.toString()} - ${error.message}`)
        res.status(error.response.status).json({
          status: 'error',
          message: error.message
        })
      })
  } catch (error) {
    next(error)
  }
})

module.exports = router
