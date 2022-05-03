const express = require('express')
const router = express.Router()

const readController = require('../controllers/log/read.log.controller')

router.use('/', readController)

module.exports = router
