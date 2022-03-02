const express = require('express')
const router = express.Router()
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy

const GITHUB_CLIENT_ID = '56828c7c918bc354b214'
const GITHUB_CLIENT_SECRET = '9f047d11807becd41e8085ccafab2bbc907be5ce'

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/auth/github/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
        return done(null, profile)
      })
    }
  )
)

router.get('/', passport.authenticate('github', { scope: ['user:email'] }))

router.get(
  '/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // console.log(JSON.stringify(req.user))

    let options = {
      maxAge: 1000 * 60 * 15, // would expire after 15 minutes
      httpOnly: true, // The cookie only accessible by the web server
      signed: true, // Indicates if the cookie should be signed
      secure: true // Indicates if the cookie should only be sent over SSL.
    }

    res.cookie(process.env.COOKIE_NAME, req.user.id, options)
    res.redirect('http://localhost:3000')
  }
)

module.exports = router
