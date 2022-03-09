const express = require('express')
const router = express.Router()

const configController = require('../controllers/config/loadConfig')
const configAuthProvidersController = require('../controllers/config/authProviders')

router.use('/', configController)
router.use('/auth-providers', configAuthProvidersController)

module.exports = router
