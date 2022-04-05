const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send('Krateo Api')
})

router.get('/ping', (req, res) => {
  res.status(200).send('Krateo Api')
})

module.exports = router
