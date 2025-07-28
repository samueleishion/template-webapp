const model = require('../model')
const Logr = require('logr-js')
const logr = new Logr()

const get = (req, res) => {
  logr.info('test.get()')
  logr.data(req.query)
  return model.getTest(req.query).then(
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
  get
}
