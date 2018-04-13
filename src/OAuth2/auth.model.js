var mongoose = require('mongoose');
var userController = require('../api/user/user.controller')
const Token = require('./token.model')
const Client = require('./client.model')

module.exports = {
  getAccessToken: (accessToken) => {
    console.log('getAccessToken')
    return Token.findOne({ accessToken: accessToken })
  },

  getClient: (clientId, clientSecret) => {
    console.log('getClient')
    let client = {
      id: clientId,
      grants: ['password']
    }
    // return Client.findOne({ id: clientId, secret: clientSecret })
    return client
  },

  getUser: (username, password) => {
    console.log('getUser')
    return User.findOne({ name: username, password: password })
  },

  saveToken: (token, client, user) => {
    console.log('saveToken')
    let newToken = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      scope: token.scope,
      client: {
        id: client.id
      },
      user: {
        id: user.id
      }
    }

    return new Token(newToken).save()
  }
}