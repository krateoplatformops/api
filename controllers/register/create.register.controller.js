const express = require('express')
const router = express.Router()
const yaml = require('js-yaml')
const axios = require('axios')
const path = require('path')
const uriHelpers = require('../../helpers/uri.helpers')
const gitHubHelpers = require('../../helpers/github.helpers')
const { envConstants } = require('../../constants')

router.post('/', async (req, res, next) => {
  try {
    let url = req.body.url
    let doc = null
    let content = null

    // remove anchor from url
    if (url.indexOf('#') > -1) {
      url = url.split('#')[0]
    }
    const parsed = uriHelpers.parse(url)

    // get host settings
    const hostUrl = uriHelpers.concatUrl([
      envConstants.HOST_URI,
      '/domain/',
      parsed.domain
    ])
    const host = (await axios.get(hostUrl)).data

    if (!host) {
      throw new Error('Unsupported domain')
    }

    switch (parsed.domain) {
      case 'github.com':
        content = await gitHubHelpers.downloadFile(host, parsed)
        break
      default:
        throw new Error('Unsupported domain')
    }

    const ext = path.extname(url).replace(/(\.[a-z0-9]+).*/i, '$1')

    if (ext === '.yml' || ext === '.yaml') {
      doc = await yaml.load(content)
    } else {
      doc = JSON.parse(content)
    }

    // prepare payload
    const post = {
      ...doc,
      url
    }

    let save = null
    switch (doc.kind) {
      case 'Template':
        save = await axios.post(envConstants.TEMPLATE_URI, post)
        break
      default:
        throw new Error(`Unsupported kind ${doc.kind}`)
    }

    if (save) {
      res.status(200).json({ ...save.data, kind: doc.kind.toLowerCase() })
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
