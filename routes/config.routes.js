const express = require('express')
const router = express.Router()

const readController = require('../controllers/config/read.config.controller')

router.use('/', readController)

module.exports = router
