const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  try {
    // Strategy.find(
    //   { type: 'strategy', enabled: true },
    //   '-type -config -enabled'
    // ).exec((error, doc) => {
    //   if (error) {
    //     next(error)
    //   } else {
    //     res.status(200).json(doc)
    //   }
    // })
  } catch (error) {
    next(error)
  }
})
module.exports = router
