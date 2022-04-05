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
    console.log(req.body)

    res.status(200).json({ id: 'ok' })
  } catch (err) {
    next(err)
  }
})

module.exports = router
