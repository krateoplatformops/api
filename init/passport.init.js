const mongoose = require('mongoose')
const Strategy = mongoose.model('Strategy')
const passport = require('passport')
const { logger } = require('../helpers/logger.helpers')
const GitHubStrategy = require('passport-github2').Strategy
const MicrosoftStrategy = require('passport-microsoft').Strategy

const initStrategies = async () => {
  Strategy.find({ enabled: true, provider: { $ne: 'guest' } }).exec(
    (error, doc) => {
      if (error) {
        logger.error(error)
      } else {
        doc.forEach((doc) => {
          const config = JSON.parse(
            Buffer.from(doc.config, 'base64').toString('ascii')
          )
          config.callbackURL = `/auth/${doc.provider}/callback`
          logger.debug(
            `${doc.provider} strategy config: ${JSON.stringify(
              config,
              null,
              2
            )}`
          )
          switch (doc.provider) {
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
        })
      }
    }
  )
}

module.exports = initStrategies
