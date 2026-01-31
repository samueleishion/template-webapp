const User = require('../schema')

const getUsers = (data) => {
  return User.find(data)
}

const getUserById = (id) => {
  return User.findById(id)
}

const postUser = (data) => {
  return User.create(data)
}

const putUserById = (id, data) => {
  console.log('putUserById()', id, data)
  return User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  })
}

const deleteUserById = (id) => {
  return User.findByIdAndDelete(id)
}

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  deleteUserById
}
