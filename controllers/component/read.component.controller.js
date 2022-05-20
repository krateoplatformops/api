const express = require('express')
const router = express.Router()
const axiosInstance = require('../../axios-conf')
const uriHelpers = require('../../helpers/uri.helpers')
const packageJson = require('../../package.json')
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
          .get(uriHelpers.concatUrl([process.env[v], 'healthz']))
          .then((result) => {
            if (result.data.name) {
              payload.name = result.data.name
              payload.version = result.data.version
            }
            payload.status = result.status
            payload.statusText = result.statusText
            return payload
          })
          .catch((err) => {
            payload.status = err.response.status
            payload.statusText = err.response.statusText
            return payload
          })
      })
    )

    content.push({
      name: packageJson.name,
      version: packageJson.version,
      status: 200,
      statusText: 'OK'
    })

    res.status(200).json(content)
  } catch (error) {
    next(error)
  }
})

module.exports = router
