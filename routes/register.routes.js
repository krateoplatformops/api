const express = require('express')
const router = express.Router()

const createController = require('../controllers/register/create.register.controller')

router.use('/', createController)

module.exports = router
