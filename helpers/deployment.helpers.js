const { envConstants } = require('./../constants')
const axiosInstance = require('./../axios-conf')
const uriHelpers = require('./../helpers/uri.helpers')
const { logger } = require('./../helpers/logger.helpers')

const pluginReader = async (req, res, next) => {
  try {
    const url = new URL(
      uriHelpers.concatUrl([
        envConstants.DEPLOYMENT_URI,
        req.params.id,
        'plugins',
        req.params.plugin,
        req.params.name
      ])
    )
    Object.keys(req.query).forEach((key) =>
      url.searchParams.append(key, req.query[key])
    )
    logger.debug(`GET ${url.toString()}`)

    const plugin = await axiosInstance({
      method: req.method,
      url: url.toString(),
      data: req.body
    })
    res.status(200).json(plugin.data)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  pluginReader
}
