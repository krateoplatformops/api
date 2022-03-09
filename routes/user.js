const express = require('express')
const router = express.Router()

const profileController = require('../controllers/user/profile')

router.use('/', profileController)

module.exports = router
