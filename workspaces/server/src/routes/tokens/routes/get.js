const model = require('../model')
const Logr = require('logr-js')
const logr = new Logr()

const getAll = (req, res) => {
  logr.info('tokens.getAll()')
  logr.data(JSON.stringify(req.query))

  return model.getTokens(req.query).then(
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
  logr.info('tokens.getById()')
  logr.data(req.params.tokenId)

  if (!req.params.tokenId) {
    logr.error('Token ID is required')
    return res.status(400).json({ error: 'Token ID is required' })
  }

  return model.getTokenById(req.params.tokenId).then(
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
