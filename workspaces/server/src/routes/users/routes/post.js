const dotenv = require('dotenv').config() // eslint-disable-line no-unused-vars
const model = require('../model')
const Stripe = require('stripe')
const Logr = require('logr-js')

const {
  STRIPE_KEY
} = process.env

const logr = new Logr()
const stripe = new Stripe(STRIPE_KEY)

const post = async (req, res) => {
  logr.info('users.post()')
  logr.data(JSON.stringify(req.body))

  try {
    const stripeCustomer = await stripe.customers.create({
      email: req.body.email,
      name: req.body.name
    })

    req.body.stripe = stripeCustomer

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
