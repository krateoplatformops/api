const express = require('express')
const router = express.Router()

const getTemplate = require('../controllers/template/getTemplate')

router.use('/', getTemplate)

module.exports = router
