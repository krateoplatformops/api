const express = require('express')
const router = express.Router()

const createController = require('../controllers/deployment/create.deployment.controller')
const readController = require('../controllers/deployment/read.deployment.controller')
const deleteController = require('../controllers/deployment/delete.deployment.controller')

router.use('/', readController)
router.use('/', createController)
router.use('/', deleteController)

module.exports = router
