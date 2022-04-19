const axios = require('axios')
const express = require('express')
const router = express.Router()
const { envConstants } = require('../../constants')
const { logger } = require('../../helpers/logger.helpers')
const uriHelpers = require('../../helpers/uri.helpers')

router.get('/:service/*', async (req, res, next) => {
  try {
    const params = req.path.replace(`/${req.params.service}`, '')

    switch (req.params.service) {
      case 'resources':
        let url = new URL(
          `https://argocd.krateo.io/api/v1/applications${params}`
        )
        Object.keys(req.query).forEach((key) =>
          url.searchParams.append(key, req.query[key])
        )

        logger.debug(`Proxy GET ${url.toString()}`)

        const resource = await axios.get(url.toString(), {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyZWJkMzQ3YS01MmVlLTRmOTQtYmI3NC03MDYwN2E4MjdkNWEiLCJpYXQiOjE2NDk2NjE1MDAsImlzcyI6ImFyZ29jZCIsIm5iZiI6MTY0OTY2MTUwMCwic3ViIjoia2VyYmVydXMtZGFzaGJvYXJkOmFwaUtleSJ9.PQGESm_WWmWlKke97mNt5hTk5ZjhxgPisKXyMdWh5PQ'
          }
        })
        res.status(200).json(resource.data)
        break
      default:
        res.status(404).json({ message: `${req.params.service} not found` })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
