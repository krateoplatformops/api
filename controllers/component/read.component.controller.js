const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const axiosInstance = require('../../axios-conf')
const uriHelpers = require('../../helpers/uri.helpers')

router.get('/', async (req, res, next) => {
  try {
    const components = Object.keys(process.env).filter(
      (x) => x.endsWith('_URI') && x !== 'API_URI' && x !== 'APP_URI'
    )

    content = await Promise.all(
      components.map(async (v) => {
        const payload = {
          name: v.replace('_URI', '')
        }
        return axiosInstance
          .get(uriHelpers.concatUrl([process.env[v], 'ping']))
          .then((result) => {
            payload.status = result.status
            if (result.data.name) {
              payload.name = result.data.name
              payload.version = result.data.version
            }
            return payload
          })
          .catch((err) => {
            payload.status = err.status
            return payload
          })
      })
    )

    res.status(200).json(content)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = router
