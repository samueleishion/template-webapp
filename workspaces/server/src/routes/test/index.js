const express = require('express')
const router = express.Router()

const { get } = require('./routes/get')

const route = (path = '/') => {
  router.get(path, get)

  return router
}

module.exports = route()
