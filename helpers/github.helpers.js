const axios = require('axios')
const uriHelpers = require('./uri.helpers')

const downloadFile = async (parsed) => {
  const api = uriHelpers.concatUrl([
    'https://api.github.com/repos/',
    parsed.pathList[0],
    parsed.pathList[1],
    'contents',
    parsed.pathList[parsed.pathList.length - 1]
  ])
  const response = await axios.get(api, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`
    }
  })
  return Buffer.from(response.data.content, 'base64').toString('ascii')
}

module.exports = {
  downloadFile
}
