const express = require('express')
const router = express.Router()

const createController = require('../controllers/package/create.package.controller')
const readController = require('../controllers/package/read.package.controller')
const deleteController = require('../controllers/package/delete.package.controller')

router.use('/', createController)
router.use('/', readController)
router.use('/', deleteController)

module.exports = router
