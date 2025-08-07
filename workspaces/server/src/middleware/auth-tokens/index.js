const Logr = require('logr-js')
const Token = require('../../routes/tokens/schema')

const logr = new Logr()

/**
 * Express middleware to check for a valid access token in the Authorization header.
 * If valid, allows the request to proceed. Otherwise, returns 401 Unauthorized.
 */
async function authTokenMiddleware (req, res, next) {
  logr.info('authTokenMiddleware()', req.headers.authorization.split(' ')[1] || 'No token provided')
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      logr.error('Missing Authorization header')
      return res.status(401).json({ error: 'Missing Authorization header' })
    }

    // Expect header format: "Bearer <token>"
    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      logr.error('Invalid Authorization header format')
      return res.status(401).json({ error: 'Invalid Authorization header format' })
    }

    const token = parts[1]
    if (!token) {
      logr.error('Token not provided')
      return res.status(401).json({ error: 'Token not provided' })
    }

    // Check if token exists in the user-tokens collection
    const found = await Token.find({ key: token })
    if (!found || found.length === 0) {
      logr.error('Invalid or expired token')
      return res.status(401).json({ error: 'Invalid or expired token' })
    }

    // Token is valid
    next()
  } catch (err) {
    console.error('Error in authTokenMiddleware:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = authTokenMiddleware
