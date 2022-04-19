const axiosInstance = require('../axios-conf')

module.exports = (req, res, next) => {
  let payload = {
    Accepted: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0'
  }

  if (res.locals.identity) {
    payload = { ...payload, identity: JSON.stringify(res.locals.identity) }
  }

  axiosInstance.interceptors.request.use(
    (config) => {
      config.headers = payload
      return config
    },
    (error) => Promise.reject(error)
  )
  next()
}
