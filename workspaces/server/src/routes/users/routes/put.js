const model = require('../model')
const Logr = require('logr-js')
const logr = new Logr()

const putById = (req, res) => {
  logr.info('users.putById()')
  logr.data(JSON.stringify(req.body))

  if (!req.params.id) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body cannot be empty' })
  }

  return model.putUserById(req.params.id, req.body).then(
    (data) => {
      res.status(200).json(data)
    },
    (err) => {
      logr.error(err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  )
}

module.exports = {
  putById
}
