const express = require('express')
const router = express.Router()

const createController = require('../controllers/host/create.host.controller')
const readController = require('../controllers/host/read.host.controller')
const deleteController = require('../controllers/host/delete.host.controller')

router.use('/', readController)
router.use('/', createController)
router.use('/', deleteController)

module.exports = router
