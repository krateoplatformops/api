const express = require('express')
const router = express.Router()

const githubAuthController = require('../controllers/auth/github')
const microsoftAuthController = require('../controllers/auth/microsoft')
const guestAuthController = require('../controllers/auth/guest')
const logoutAuthController = require('../controllers/auth/logout')

router.use('/guest', guestAuthController)
router.use('/github', githubAuthController)
router.use('/microsoft', microsoftAuthController)
router.use('/logout', logoutAuthController)

module.exports = router
