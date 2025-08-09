const dotenv = require('dotenv').config() // eslint-disable-line no-unused-vars
const Logr = require('logr-js')
const Stripe = require('stripe')

const {
  STRIPE_KEY
} = process.env

const model = require('../model')
const schema = require('../schema/object')
const logr = new Logr()
const stripe = new Stripe(STRIPE_KEY)

const getPublicFields = (data) => {
  return data.map(entry => {
    const _entry = {}
    Object.keys(schema)
      .filter(key => schema[key].public)
      .forEach(field => {
        _entry[field] = entry[field]
      })
    _entry._id = entry._id // Ensure _id is included
    return _entry
  })
}

const getAll = (req, res) => {
  logr.info('users.getAll()')
  logr.data(JSON.stringify(req.query))
  return model.getUsers(req.query).then(
    (data) => {
      res.status(200).json(getPublicFields(data))
    },
    (err) => {
      logr.error(err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  )
}

const getById = (req, res) => {
  logr.info('users.getById()')
  logr.data(req.param.id)

  if (!req.params.id) {
    logr.error('User ID is required')
    return res.status(400).json({ error: 'User ID is required' })
  }

  return model.getUserById(req.params.id).then(
    (data) => {
      res.status(200).json(getPublicFields(data))
    },
    (err) => {
      logr.error(err)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  )
}

const getByIdPaymentMethods = (req, res) => {
  logr.info('users.getPaymentMethods()')
  logr.data(req.params)

  if (!req.params.id) {
    logr.error('User ID is required')
    return res.status(400).json({ error: 'User ID is required' })
  }

  model.getUserById(req.params.id).then((user) => {
    if (!user) {
      logr.error('User not found')
      return res.status(404).json({ error: 'User not found' })
    }

    // const paymentMethods = stripe.paymentMethods.list({
    //   customer: user.stripe.id,
    //   type: 'card'
    // })
    logr.data(user)
    return stripe.paymentMethods.list({
      customer: user.stripe.id,
      type: 'card'
    }).then((data) => {
      logr.data(data)
      if (!data || !data.data || data.data.length === 0) {
        logr.warning('No payment methods found for user')
        // return res.status(404).json({ error: 'No payment methods found for user' })
        return res.status(404).json(data)
      }
      logr.success('Payment methods retrieved successfully')
      res.status(200).json(data)
    }).catch((err) => {
      logr.error(err)
      res.status(500).json({ error: 'Internal Server Error' })
    })
  }).catch((err) => {
    logr.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  })
}

module.exports = {
  getAll,
  getById,
  getByIdPaymentMethods
}
