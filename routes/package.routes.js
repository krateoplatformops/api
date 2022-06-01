const express = require('express')
const router = express.Router()

const readController = require('../controllers/package/read.package.controller')
const createController = require('../controllers/package/create.package.controller')

router.use('/', readController)
router.use('/', createController)

module.exports = router
