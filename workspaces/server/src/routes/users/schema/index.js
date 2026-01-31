const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchemaObject = require('./object')

const UserSchema = new Schema(UserSchemaObject, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema)
