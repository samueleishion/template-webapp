const model = require('../model')
const Logr = require('logr-js')
const logr = new Logr()

const deleteById = (req, res) => {
  logr.info('tokens.delete()')
  logr.data(JSON.stringify(req.params))

  if (!req.params.id) {
    return res.status(400).json({ error: 'Token ID is required' })
  }

  return model.deleteTokenById(req.params.id).then(
    (data) => {
      res.status(200).json({ message: 'Token deleted successfully', data })
    },
    (err) => {
      logr.error(err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  )
}

module.exports = {
  deleteById
}
