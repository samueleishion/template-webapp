const model = require('../model')
const Logr = require('logr-js')
const logr = new Logr()

const getAll = (req, res) => {
  logr.info('users.getAll()')
  logr.data(req.query)
  return model.getUsers(req.query).then(
    (data) => {
      res.status(200).json(data)
    },
    (err) => {
      logr.error(err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  )
}

const getById = (req, res) => {
  logr.info('users.getById()')
  logr.data(req.param.ids)

  if (!req.params.id) {
    logr.error('User ID is required')
    return res.status(400).json({ error: 'User ID is required' })
  }

  return model.getUserById(req.params.id).then(
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
  getAll,
  getById
}
