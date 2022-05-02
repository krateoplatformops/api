const express = require('express')
const router = express.Router()
const yaml = require('js-yaml')
const axios = require('axios')
const path = require('path')
const uriHelpers = require('../../helpers/uri.helpers')
const gitHubHelpers = require('../../helpers/github.helpers')
const { envConstants } = require('../../constants')
const axiosInstance = require('../../axios-conf')

router.post('/', async (req, res, next) => {
  try {
    let url = req.body.url
    let kind = null
    let save = null

    const fileName = path.basename(url)

    if (fileName === 'claim.yaml') {
      kind = 'deployment'
      save = await axiosInstance.post(
        uriHelpers.concatUrl([envConstants.DEPLOYMENT_URI, 'import']),
        { url }
      )
    } else if (fileName === 'template.yaml') {
      kind = 'template'
      save = await axiosInstance.post(envConstants.TEMPLATE_URI, { url })
    } else {
      throw new Error(`Unsupported file name ${fileName}`)
    }

    if (save) {
      res.status(200).json({ ...save.data, kind })
    } else {
      res.status(500).json({
        message: save.data.message
      })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
