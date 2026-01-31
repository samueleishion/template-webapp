const Token = require('../schema')

const getTokens = (query) => {
  return Token.find(query)
}

const getTokenById = (tokenId) => {
  return Token.findById(tokenId)
}

const postToken = (data) => {
  return Token.create(data)
}

const putTokenById = (id, data) => {
  return Token.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  })
}

const deleteTokenById = (id) => {
  return Token.findByIdAndDelete(id)
}

module.exports = {
  getTokens,
  getTokenById,
  postToken,
  putTokenById,
  deleteTokenById
}
