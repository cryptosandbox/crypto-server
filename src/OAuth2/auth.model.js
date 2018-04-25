var mongoose = require('mongoose');
var userController = require('../api/user/user.controller')
const Token = require('./token.model')
const Client = require('./client.model')

module.exports = {
  getAccessToken: (accessToken, callback) => {
    Token.findOne({accessToken: accessToken})
      .then(token => { callback(false, token) })
  },

  getClient: (clientId, clientSecret, callback) => {
    let client = {
      clientId,
      clientSecret,
      grants: null,
      redirectUris: null
    }
    callback(false, client)
  },

  grantTypeAllowed: (clientId, grantType, callback) => {
    callback(false, true)
  },

  getUser: (username, password, callback) => {
    userController.findByLogin(username, password)
      .then(user => { callback(false, user) })
      .catch(reason => { callback(true, reason) })
  },

  saveAccessToken: (token, client, expires, user, callback) => {
    let newToken = {
      accessToken: token,
      expires: expires,
      scope: token.scope,
      client: {
        id: client
      },
      user: {
        id: user.id
      }
    }

    new Token(newToken).save()
      .then(token => {
        callback(false, token)
      })
  }
}