const express = require('express')
const router = express.Router()

const readTemplate = require('../controllers/template/read.template.controller')
const deleteTemplate = require('../controllers/template/delete.template.controller')

router.use('/', readTemplate)
router.use('/', deleteTemplate)

module.exports = router
