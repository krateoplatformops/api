const express = require('express')
const router = express.Router()

const createController = require('../controllers/proxy/create.proxy.controller')
const readController = require('../controllers/proxy/read.proxy.controller')
const deleteController = require('../controllers/proxy/delete.proxy.controller')

router.use('/', createController)
router.use('/', readController)
router.use('/', deleteController)

module.exports = router
