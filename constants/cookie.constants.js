module.exports = {
  httpOnly: process.env.COOKIE_HTTPONLY === 'true', // The cookie only accessible by the web server
  signed: process.env.COOKIE_SIGNED === 'true', // Indicates if the cookie should be signed
  secure: process.env.COOKIE_SECURE === 'true', // Indicates if the cookie should only be sent over SSL.
  maxAge: 1000 * process.env.COOKIE_MAX_AGE, // would expire after X seconds
  domain: process.env.COOKIE_DOMAIN, // The domain of the cookie
  sameSite: process.env.COOKIE_SAMESITE ? process.env.COOKIE_SAMESITE : 'Strict' // The cookie should be sent only over HTTPS
}
