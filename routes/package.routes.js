const express = require('express')
const router = express.Router()

const readController = require('../controllers/package/read.package.controller')

router.use('/', readController)

module.exports = router
