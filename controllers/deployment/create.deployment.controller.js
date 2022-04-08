const express = require('express')
const router = express.Router()
const yaml = require('js-yaml')
const axios = require('axios')
const path = require('path')
const uriHelpers = require('../../helpers/uri.helpers')
const gitHubHelpers = require('../../helpers/github.helpers')
const stringHelpers = require('../../helpers/string.helpers')
const { envConstants } = require('../../constants')
const nunjucks = require('nunjucks')

router.post('/', async (req, res, next) => {
  try {
    const url = uriHelpers.concatUrl([
      envConstants.DATASTORE_URI,
      '/template',
      req.body.templateId
    ])
    const template = (await axios.get(url)).data

    const parsed = uriHelpers.parse(template.url)
    let claim = null
    let package = null

    switch (parsed.domain) {
      case 'github.com':
        claim = await gitHubHelpers.downloadFile(parsed, 'claim.yaml')
        package = await gitHubHelpers.downloadFile(parsed, 'package.yaml')
        break
      default:
        throw new Error('Unsupported domain')
    }

    // TODO: transactionId
    let merged = claim.concat(
      `  transactionId: ${'transactionId'}`,
      '---\n',
      package
    )

    // placeholders
    nunjucks.configure({
      noCache: true,
      autoescape: true,
      tags: { variableStart: '${{' }
    })
    merged = nunjucks.renderString(merged, req.body.payload)

    // TODO:

    const save = await axios.post(
      uriHelpers.concatUrl([envConstants.DATASTORE_URI, 'deployment']),
      {
        payload: req.body.payload,
        yaml: stringHelpers.to64(merged),
        owner: res.locals.identity.username,
        templateId: req.body.templateId
      }
    )

    if (save.status === 200) {
      res.status(200).json({ id: save.data._id })
    } else {
      res.status(500).json({ message: res.data.message })
    }
    // TODO: calls the kube bridge
  } catch (err) {
    next(err)
  }
})

module.exports = router
