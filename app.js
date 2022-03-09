const express = require('express')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const cors = require('cors')({ origin: true, credentials: true })
const responseTime = require('response-time')
const mongoose = require('mongoose')
const passport = require('passport')

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
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(responseTime({ suffix: false, digits: 0 }))

/* MongoDB */
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)
// require('./models/Config')
require('./models/Strategy')
require('./models/Logo')

/* Middleware */
const callLogger = require('./middleware/call-logger')
const authMiddleware = require('./middleware/auth')
const cookieIdentityMiddleware = require('./middleware/cookie-identity')
const identityCheckerMiddleware = require('./middleware/identity-checker')

const errorLogger = require('./middleware/error-logger')

app.use(callLogger)
app.use(authMiddleware)
app.use(cookieIdentityMiddleware)
app.use(identityCheckerMiddleware)

/* Strategies */
const initStrategies = require('./init/passport.init')
initStrategies()

/* Routes */
const baseRoute = require('./routes/base')
const authRoute = require('./routes/auth')
const configRoute = require('./routes/config')
const userRoute = require('./routes/user')

app.use('/', baseRoute)
app.use('/auth', authRoute)
app.use('/config', configRoute)
app.use('/user', userRoute)

app.use(errorLogger)

module.exports = app
