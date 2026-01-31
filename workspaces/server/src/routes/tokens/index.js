const express = require('express')
const router = express.Router()

const { getAll, getById } = require('./routes/get')
const { post } = require('./routes/post')
const { putById } = require('./routes/put')
const { deleteById } = require('./routes/delete')

const route = (path = '/tokens') => {
  router.get(`${path}`, getAll)
  router.get(`${path}/:tokenId`, getById)
  router.post(path, post)
  router.put(`${path}/:id`, putById)
  router.delete(`${path}/:id`, deleteById)
  return router
}

module.exports = route()
