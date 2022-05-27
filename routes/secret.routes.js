const express = require('express')
const router = express.Router()

const createController = require('../controllers/secret/create.secret.controller')
const readController = require('../controllers/secret/read.secret.controller')
const deleteController = require('../controllers/secret/delete.secret.controller')

router.use('/', createController)
router.use('/', readController)
router.use('/', deleteController)

module.exports = router
