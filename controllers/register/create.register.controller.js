const express = require('express')
const router = express.Router()
const path = require('path')
const uriHelpers = require('../../helpers/uri.helpers')

const { envConstants } = require('../../constants')
const axiosInstance = require('../../axios-conf')
const { logger } = require('../../helpers/logger.helpers')

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

    logger.debug(JSON.stringify(save.data))

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
