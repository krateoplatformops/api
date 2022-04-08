const express = require('express')
const router = express.Router()

const readController = require('../controllers/deployment/read.deployment.controller')
const createController = require('../controllers/deployment/create.deployment.controller')

router.use('/', readController)
router.use('/', createController)

module.exports = router
