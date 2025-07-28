const model = require('../model')
const Logr = require('logr-js')
const logr = new Logr()

const deleteById = (req, res) => {
  logr.info('users.delete()')
  logr.data(req.params)

  if (!req.params._id) {
    return res.status(400).json({ error: 'User ID is required' })
  }

  return model.deleteUserById(req.params._id).then(
    (data) => {
      res.status(200).json({ message: 'User deleted successfully', data })
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
