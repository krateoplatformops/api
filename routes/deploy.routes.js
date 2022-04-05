const express = require('express')
const router = express.Router()

const createController = require('../controllers/deploy/create.deploy.controller')

router.use('/', createController)

module.exports = router
