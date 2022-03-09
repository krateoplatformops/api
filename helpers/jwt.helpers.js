var jwt = require('jsonwebtoken')

const sign = (obj) => {
  return jwt.sign(obj, process.env.COOKIE_SECRET)
}

const verify = (token) => {
  return jwt.verify(token, process.env.COOKIE_SECRET)
}

module.exports = {
  sign,
  verify
}
