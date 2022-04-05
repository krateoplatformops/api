const express = require('express')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const cors = require('cors')({ origin: true, credentials: true })
const responseTime = require('response-time')
const passport = require('passport')
const { envConstants } = require('./constants')

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((obj, done) => {
  done(null, obj)
})

const app = express()
app.use(helmet())
app.use(cors)
app.use(passport.initialize())
app.use(cookieParser(envConstants.COOKIE_SECRET))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(responseTime({ suffix: false, digits: 0 }))

/* Middleware */
const callLogger = require('./middleware/call-logger')
const providerMiddleware = require('./middleware/provider')
const authMiddleware = require('./middleware/auth')
const cookieIdentityMiddleware = require('./middleware/cookie-identity')
const identityCheckerMiddleware = require('./middleware/identity-checker')

const errorLogger = require('./middleware/error-logger')

app.use(callLogger)
app.use(providerMiddleware)
app.use(authMiddleware)
app.use(cookieIdentityMiddleware)
app.use(identityCheckerMiddleware)

/* Strategies */
// const initStrategies = require('./init/passport.init')
// initStrategies()

/* Routes */
const baseRoutes = require('./routes/base.routes')
const authRoutes = require('./routes/auth.routes')
const configRoutes = require('./routes/config.routes')
const userRoutes = require('./routes/user.routes')
const registerRoutes = require('./routes/register.routes')
const templateRoutes = require('./routes/template.routes')
const deployRoutes = require('./routes/deploy.routes')

app.use('/', baseRoutes)
app.use('/auth', authRoutes)
app.use('/config', configRoutes)
app.use('/user', userRoutes)
app.use('/register', registerRoutes)
app.use('/template', templateRoutes)
app.use('/deploy', deployRoutes)

app.use(errorLogger)

module.exports = app
