const { logger } = require('../helpers/logger.helpers')

module.exports = (err, req, res, next) => {
  logger.error(`${req.path} - ${err.message}`)

  return res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message
  })
}
