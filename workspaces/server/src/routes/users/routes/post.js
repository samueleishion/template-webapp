const model = require('../model')
const Logr = require('logr-js')
const logr = new Logr()

const post = (req, res) => {
  logr.info('users.post()')
  logr.data(req.body)
  try {
    return model.postUser(req.body).then(
      (data) => {
        data.role = 'user'
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
