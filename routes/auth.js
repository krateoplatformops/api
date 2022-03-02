const express = require('express')
const router = express.Router()

const gitHubAuthController = require('../controllers/auth/github')

router.use('/github', gitHubAuthController)

module.exports = router
