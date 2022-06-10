const express = require('express')
const router = express.Router()

const readController = require('../controllers/auth/read.auth.controller')
const createController = require('../controllers/auth/create.auth.controller')

router.use('/', readController)
router.use('/', createController)

module.exports = router
