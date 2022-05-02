const express = require('express')
const router = express.Router()

const createController = require('../controllers/endpoint/create.endpoint.controller')
const readController = require('../controllers/endpoint/read.endpoint.controller')
const deleteController = require('../controllers/endpoint/delete.endpoint.controller')

router.use('/', createController)
router.use('/', readController)
router.use('/', deleteController)

module.exports = router
