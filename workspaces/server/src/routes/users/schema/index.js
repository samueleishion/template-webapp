const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin', 'developer'],
    default: 'user'
  },
  given_name: {
    type: String,
    required: false,
    default: ''
  },
  family_name: {
    type: String,
    required: false,
    default: ''
  },
  googleId: {
    type: String,
    required: false,
    default: ''
  },
  picture: {
    type: String,
    required: false,
    default: ''
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema)
