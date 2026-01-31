const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TokenSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  key: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'locked'],
    default: 'active'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Token', TokenSchema)
