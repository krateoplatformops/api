const axios = require('axios')
const uriHelpers = require('./uri.helpers')
const stringHelpers = require('./string.helpers')
const { envConstants } = require('../constants')

const downloadFile = async (
  parsed,
  fileName = parsed.pathList[parsed.pathList.length - 1]
) => {
  // get host settings
  const url = uriHelpers.concatUrl([
    envConstants.DATASTORE_URI,
    '/host/domain/',
    parsed.domain
  ])
  const host = (await axios.get(url)).data

  if (!host) {
    throw new Error('Unsupported domain')
  }

  const api = uriHelpers.concatUrl([
    host.apiUrl,
    'repos/',
    parsed.pathList[0],
    parsed.pathList[1],
    'contents',
    fileName
  ])
  const response = await axios.get(api, {
    headers: {
      Authorization: `token ${stringHelpers.b64toAscii(host.apiToken)}`
    }
  })
  return stringHelpers.b64toAscii(response.data.content)
}

module.exports = {
  downloadFile
}
