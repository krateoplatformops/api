const express = require('express')
const router = express.Router()

const readController = require('../controllers/dashboard/read.dashboard.controller')

router.use('/', readController)

module.exports = router
