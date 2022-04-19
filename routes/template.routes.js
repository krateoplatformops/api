const express = require('express')
const router = express.Router()

const readController = require('../controllers/template/read.template.controller')
const deleteController = require('../controllers/template/delete.template.controller')

router.use('/', readController)
router.use('/', deleteController)

module.exports = router
