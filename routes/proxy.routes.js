const express = require('express')
const router = express.Router()

const readController = require('../controllers/proxy/read.proxy.controller')

router.use('/', readController)

module.exports = router
