const User = require('../api/user/user.model')
const Token = require('./token.model')

module.exports = {
  signup: (user) => {
    return new User(user).save()
  },

  findByToken: (bearerToken) => {
    return Token.findOne( { accessToken: bearerToken } )
  }
}