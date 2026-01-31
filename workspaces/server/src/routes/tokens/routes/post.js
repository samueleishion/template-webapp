const { createHmac } = require('node:crypto')
const model = require('../model')
const Logr = require('logr-js')
const logr = new Logr()

const post = (req, res) => {
  logr.info('tokens.post()')
  logr.data(JSON.stringify(req.body))

  if (!req.body || !req.body.name) {
    logr.error('Token name is required')
    return res.status(400).json({ error: 'Token name is required' })
  }

  if (!req.body.userId) {
    logr.error('User ID is required')
    return res.status(400).json({ error: 'User ID is required' })
  }

  // Generate a unique key and secret for the token
  const seed = Date.now().toString()
  req.body.key = createHmac('sha256', 'key')
    .update(seed)
    .digest('hex')
  req.body.secret = createHmac('sha256', 'secret')
    .update(seed)
    .digest('hex')

  try {
    return model.postToken(req.body).then(
      (data) => {
        res.status(201).json(data)
      },
      (err) => {
        logr.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
      }
    )
  } catch (err) {
    logr.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  post
}
