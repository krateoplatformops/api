const express = require('express')
const router = express.Router()

const importController = require('../controllers/register/importFile')

router.use('/', importController)

module.exports = router
