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
const callLogger = require('./middlewares/call-logger.middleware')
const providerMiddleware = require('./middlewares/provider.middleware')
const authMiddleware = require('./middlewares/auth.middleware')
const cookieIdentityMiddleware = require('./middlewares/cookie-identity.middleware')
const identityCheckerMiddleware = require('./middlewares/identity-checker.middleware')
const axiosMiddleware = require('./middlewares/axios.middleware')
const errorLoggerMiddleware = require('./middlewares/error-logger.middleware')

app.use(callLogger)
app.use(providerMiddleware)
app.use(authMiddleware)
app.use(cookieIdentityMiddleware)
app.use(identityCheckerMiddleware)
app.use(axiosMiddleware)

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
const deploymentRoutes = require('./routes/deployment.routes')
const proxyRoutes = require('./routes/proxy.routes')
const endpointRoutes = require('./routes/endpoint.routes')
const logRoutes = require('./routes/log.routes')
const dashboardRoutes = require('./routes/dashboard.routes')
const packageRoutes = require('./routes/package.routes')

app.use('/', baseRoutes)
app.use('/auth', authRoutes)
app.use('/config', configRoutes)
app.use('/user', userRoutes)
app.use('/register', registerRoutes)
app.use('/template', templateRoutes)
app.use('/deployment', deploymentRoutes)
app.use('/proxy', proxyRoutes)
app.use('/endpoint', endpointRoutes)
app.use('/log', logRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/package', packageRoutes)

app.use(errorLoggerMiddleware)

module.exports = app
