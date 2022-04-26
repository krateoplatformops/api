const axios = require('axios')
const passport = require('passport')
const { logger } = require('../helpers/logger.helpers')
const GitHubStrategy = require('passport-github2').Strategy
const MicrosoftStrategy = require('passport-microsoft').Strategy
const { envConstants } = require('../constants')
const uriHelpers = require('../helpers/uri.helpers')

module.exports = async (req, res, next) => {
  if (
    req.path.indexOf('/auth/') > -1 &&
    req.path.indexOf('/callback') === -1 &&
    req.path.indexOf('/logout') === -1
  ) {
    const { id } = req.query

    const url = uriHelpers.concatUrl([
      envConstants.DATASTORE_URI,
      'provider',
      id
    ])
    const doc = await axios.get(url)
    const provider = doc.data

    if (provider && provider.enabled) {
      res.locals.provider = provider
      if (provider.strategy === 'guest') {
        next()
      } else {
        const config = JSON.parse(
          Buffer.from(provider.config, 'base64').toString('ascii')
        )
        config.callbackURL = `/auth/${provider.strategy}/callback`
        logger.debug(
          `${provider.strategy} strategy config: ${JSON.stringify(
            config,
            null,
            2
          )}`
        )
        switch (provider.strategy) {
          case 'github':
            passport.use(
              new GitHubStrategy(
                config,
                (accessToken, refreshToken, profile, done) => {
                  process.nextTick(() => {
                    return done(null, profile)
                  })
                }
              )
            )
            break
          case 'microsoft':
            passport.use(
              new MicrosoftStrategy(
                config,
                (accessToken, refreshToken, profile, done) => {
                  User.findOrCreate(
                    { userId: profile.id },
                    function (err, user) {
                      return done(err, user)
                    }
                  )
                }
              )
            )
            break
          default:
            logger.error(`${doc.provider} strategy not supported`)
        }
        next()
      }
    } else {
      const err = new Error(`Unknown authentication strategy`)
      err.statusCode = 500
      next(err)
    }
  } else {
    next()
  }
}